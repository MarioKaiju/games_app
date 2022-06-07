const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const logger = require('../utils/logger')
const User = require('../models/user')
const validate = require('../utils/services')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body
  validate(body, response)
  if ( response.statusCode === 400) {
    return
  }

  const { email, username, password, firstName, lastName } = body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  try {
    const user = new User({
      username,
      email,
      firstName,
      lastName,
      passwordHash
    })

    const savedUser = await user.save()
    response.json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter