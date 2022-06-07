const cors = require('cors')
const config = require('./utils/config')
const express = require('express')
const gamesRouter = require('./controlllers/games')
const helloworldRouter = require('./controlllers/helloworld')
require('./strategies/passport')
const session = require('express-session')
const mongoose = require('mongoose')
const publisherRouter = require('./controlllers/publishers')
const platformsRouter = require('./controlllers/platforms')
const middleware = require('./utils/middleware')
const usersRouter = require('./controlllers/users')
const loginRouter = require('./controlllers/login')
const passport = require('passport')
const app = express()

console.log('conectandose a', config.MONGODB_URI)

async function conectarBD() {
  try {
    await mongoose.connect(config.MONGODB_URI)
    console.log('se conecto a la base de datos')
  } catch (error) {
    console.log('error al conectarse a la base de datos:', error.message)
  }
}

conectarBD()

app.use(session({ secret: "this is secret", resave: true, maxAge: 24 * 60 * 60 * 100, saveUninitialized: false }))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/hello', helloworldRouter)
app.use('/api/games', gamesRouter)
app.use('/api/publishers', publisherRouter)
app.use('/api/users', usersRouter)
app.use('/api/platforms', platformsRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app