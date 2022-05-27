const gamesRouter = require('express').Router()
const Game = require('../models/game')
const Publisher = require('../models/publisher')
const Platform = require('../models/platform')

gamesRouter.get('/', async (request, response) => {
  const games = await Game.find({}).populate('publisher', { name: 1 }).populate('platforms', { name: 1 })

  response.json(games)
})

gamesRouter.post('/', async (request, response) => {
  const body = request.body

  let publisher = await Publisher.findOne({ name: body.publisher })

  if ( !publisher ) {
    publisher = new Publisher({
      name: body.publisher
    })
  }

  let platforms = await Platform.find({ name: { $in : body.platforms } }, { id: 1 })

  const game = new Game({
    title: body.title,
    developer: body.developer,
    publisher: publisher._id,
    releaseDate: new Date(body.releaseDate),
    platforms: platforms.map((platform) => { return (platform.id) })
  })

  publisher.games = publisher.games.concat(game._id)

  game.save()
  publisher.save()
  await Platform.updateMany({ name: { $in: body.platforms }}, { $push: { games: game._id} }).catch((error) => console.log("No fue posible agregar"))

  response.send(game)
})

module.exports = gamesRouter