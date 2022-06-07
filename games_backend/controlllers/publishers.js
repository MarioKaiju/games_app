const publisherRouter = require('express').Router()
const Publisher = require('../models/publisher')

publisherRouter.get('/', async (request, response) => {
  const publishers = await Publisher.find({}).populate('games', { title: 1, releaseDate: 1 })

  response.json(publishers)
})

publisherRouter.get('/:name', async (request, response) => {
  const name = request.params.name
  const publisher = await Publisher.findOne({name}).populate('games', { title: 1, releaseDate: 1 })

  response.json(publisher)
})

module.exports = publisherRouter