const fetch =  require("node-fetch")
const { JSDOM } = require("jsdom")

async function getImage (searchText) {
  const result = await fetch(`https://www.google.se/search?q=${encodeURIComponent(searchText)}&tbm=isch`)
  const dom = new JSDOM(await result.text())
  const img = dom.window.document.querySelector("a > div > img").src
  return img
}

module.exports.getImage = getImage
