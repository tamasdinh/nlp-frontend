const path = require('path')
const express = require('express')
const cors = require('cors')
const mockAPIResponse = require('./mockAPI.js')
const port = process.env.PORT || 8081

const app = express()

app.use(express.static('dist'))
app.use(cors())

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

app.get('/test', function (req, res) {
    console.log('Test endpoint reached; sending back response')
    res.send(mockAPIResponse)
})
