const express = require('express')
const cookieParser = require('cookie-parser')
const fetch = require('node-fetch')
const { getImage } = require('./get-image')
const app = express()
const { TINK_CLIENT_ID, TINK_SECRET } = require('../src/secret')
const { groupBy, sumBy } = require('./util')

function tinkFetch (method, url, body, token) {
  return fetch(
    `https://api.tink.com/api/v1${url}`,
    {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    }
  )
}

app.use(cookieParser())

app.get('/access-token', async (req, res) => {
  const response = await fetch(
    'https://api.tink.com/api/v1/oauth/token',
    {
      method: 'POST',
      body: new URLSearchParams({
        code: req.query.code,
        client_id: TINK_CLIENT_ID,
        client_secret: TINK_SECRET,
        grant_type: 'authorization_code'
      })
    }
  )
  res.cookie('tink-access-token', (await response.json()).access_token, { httpOnly: true })
  res.redirect('/')
})

app.get('/logo', async (req, res) => {
  res.json(
    { image: await getImage(req.query.search) }
  )
})

app.get('/data', async (req, res) => {
  const response = await tinkFetch(
    'POST',
    '/search',
    {
      "includeUpcoming": false,
      "sort": "DATE",
      "limit": 10000, // TODO: anyway to not limit?
      "startDate": new Date('2020-01-01')
    },
    req.cookies['tink-access-token']
  )

  if (response.status !== 200) {
    res.status(response.status).send({ success: false })
    return
  }

  res.json(
    await response.json()
      .then(j => j.results.filter(t => t.transaction.categoryType === 'EXPENSES'))
      .then(j => groupBy(j, (t) => t.transaction.formattedDescription))
      .then(groups => {
        for (const group of Object.keys(groups)) {
          groups[group] = sumBy(groups[group], t => t.transaction.amount)
        }
        return groups
      })
  )
})

module.exports.api = app