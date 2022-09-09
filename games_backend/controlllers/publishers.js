const publisherRouter = require('express').Router()
const Publisher = require('../models/publisher')

publisherRouter.get('/', async (request, response) => {
  const publishers = await Publisher.find({}).sort({ name: 1 })

  response.json(publishers)
})

publisherRouter.get('/:name', async (request, response, next) => {
  const name = request.params.name
  try {
    const publisher = await Publisher.findOne({name}).populate('games', { title: 1, releaseDate: 1 })
    response.json(publisher)
  } catch (exception) {
    next(exception)
  }

})

publisherRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response({ error: 'Log in to post a publisher' })
  }
  
  const publisher = new Publisher ({
    name: body.name,
  })

  try {
    const savedPublisher = await publisher.save()
    response.json(savedPublisher)
  } catch(error) {
    next(error)
  }
})

module.exports = publisherRouter