const dotenv = require('dotenv')
dotenv.config('../../.env')
const webpack = require('webpack')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const PORT = process.env.PORT  // export for testing purposes

const app = express()

const endPoint = 'sentiment'

const baseURL = `https://api.aylien.com/api/v1/${endPoint}`

app.use(express.static('dist'))

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json())

app.post('/sentiment', (req, res) => {
  let urlToUse = new URL(baseURL)
  const params = {text: req.body.formText, mode: 'tweet'}
  Object.keys(params).forEach(key => urlToUse.searchParams.append(key, params[key]))
  fetch(urlToUse, {
    method: 'POST',
    headers: {
      'X-AYLIEN-TextAPI-Application-ID': process.env.AYLIEN_ID,
      'X-AYLIEN-TextAPI-Application-Key': process.env.AYLIEN_KEY
    }
  })
  .then(response => response.json())
  .then(feedback => {
    res.status(201).send(feedback)
  })
  .catch(error => {
    alert('An error has occurred while fetching sentiment results:', error)
  }) 
})

// designates what port the app will listen to for incoming requests
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, function () {
    console.log(`NLP interface app listening on port ${PORT}!`)
  })
}

module.exports = {
  port: PORT
}