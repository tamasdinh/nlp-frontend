const dotenv = require('dotenv')
dotenv.config()
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

const app = express()
const config = require('../../webpack.dev')
const compiler = webpack(config)

const globalVars = Object.values(config.plugins)[2].definitions

const endPoint = 'sentiment'

const baseURL = `https://api.aylien.com/api/v1/${endPoint}`

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}))

app.use(bodyParser.json())

app.post('/sentiment', (req, res) => {
  let fullURL = new URL(baseURL)
  const params = {text: req.body.formText, mode: 'tweet'}
  Object.keys(params).forEach(key => fullURL.searchParams.append(key, params[key]))
  fetch(fullURL, {
    method: 'POST',
    headers: {
      'X-AYLIEN-TextAPI-Application-ID': globalVars.AYLIEN_ID.replace(/["]/g, ''),
      'X-AYLIEN-TextAPI-Application-Key': globalVars.AYLIEN_KEY.replace(/["]/g, '')
    }
  }).then(response => response.json())
  .then(feedback => {
    res.status(201).send(feedback)
  })
  .catch(error => {
    alert('An error has occurred:', error)
  }) 
})

// designates what port the app will listen to for incoming requests
app.listen(globalVars.HOME_PORT, function () {
    console.log(`NLP interface app -- dev version -- listening on port ${globalVars.HOME_PORT}!`)
})