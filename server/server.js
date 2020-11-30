const express = require('express')
const path = require('path')
const app = express();
app.use(express.static('public'))

const { api } = require('./api.js')

app.use('/api', api)
app.get('/callback', (req, res) => {  
  res.redirect('/api/access-token?' + new URLSearchParams(req.query).toString())
})
app.get('*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../public', 'index.html')
  )
})
app.listen(3000)