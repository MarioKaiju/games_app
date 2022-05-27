const publisherRouter = require('express').Router()
const Publisher = require('../models/publisher')

publisherRouter.get('/', async (request, response) => {
  const publishers = await Publisher.find({}).populate('games', { title: 1, releaseDate: 1 })

  response.json(publishers)
})

module.exports = publisherRouter