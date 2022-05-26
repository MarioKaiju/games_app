const cors = require('cors')
const express = require('express')
const helloworldRouter = require('./controlllers/helloworld')
const app = express()

app.use(cors())
app.use(express.static('build'))
app.use('/hello', helloworldRouter)
app.use(express.json())

module.exports = app