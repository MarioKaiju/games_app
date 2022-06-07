const platformsRouter = require('express').Router()
const Platform = require('../models/platform')

platformsRouter.get('/', async (request, response) => {
  const platforms = await Platform.find({}, { id: 0, games: 0 }).sort({ name: 1 })

  response.json(platforms)
})

platformsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response({ error: 'Log in to post a platform' })
  }
  
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