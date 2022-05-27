const platformsRouter = require('express').Router()
const Platform = require('../models/platform')

platformsRouter.get('/', async (request, response) => {
  const platforms = await Platform.find({}).populate('games', { title: 1, releaseDate: 1 })

  response.json(platforms)
})

platformsRouter.post('/', async (request, response, next) => {
  const body = request.body
  
  const platform = new Platform ({
    name: body.name,
  })

  try {
    const savedPlatform = await platform.save()
    response.json(savedPlatform)
  } catch(error) {
    next(error)
  }
})

module.exports = platformsRouter