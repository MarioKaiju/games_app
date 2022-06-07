const gamesRouter = require('express').Router()
const Game = require('../models/game')
const Publisher = require('../models/publisher')
const Platform = require('../models/platform')
const User = require('../models/user')

// Obtener todos
gamesRouter.get('/', async (request, response) => {
  const games = await Game.find({}).populate('publisher', { name: 1 }).populate('platforms', { name: 1 })

  response.json(games)
})

// Obtener el top 3
gamesRouter.get('/top', async (request, response) => {
  const games = await Game.aggregate([
    { $sort: { score: -1 } },
    { $limit: 5 },
    { $lookup: { from: "publishers", localField: "publisher", foreignField: "_id", as: "publisher" } },
    { $lookup: { from: "platforms", localField: "platforms", foreignField: "_id", as: "platforms" }},
    { $unwind: '$publisher' },
    { $set: { "id": "$_id" } },
    { $project: { "publisher._id": 0, "publisher.games" : 0, "platforms._id": 0, "platforms.games": 0, "_id": 0 } },
  ])

  response.json(games)
})

//Obtener uno solo en base al id
gamesRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const game = await Game.findById(id).populate('publisher', { name: 1 }).populate('platforms', { name: 1 })

  response.json(game)
})

// Agregar un juego a la lista
gamesRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'Log in to post a game' })
  }

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

  response.json(game)
})

// calificar un juego
gamesRouter.post('/comment/:id', async (request, response) => {
  body = request.body
  const { comment, score } = body
  const id = request.params.id
  const user = request.user;

  if(!user) {
    return response.status(401).json({ error: "Log in to post a comment" })
  }

  const gameToComment = await Game.findById(id);
  const reviews = gameToComment.reviews
  const scoresSum = reviews.reduce((sum, a)=> sum + a.score, 0)
  const newScore = (scoresSum + score)/(reviews.length + 1)

  const savedGame = await Game.findOneAndUpdate({
      _id: id,
      'reviews.user': { $ne: user.id }
    }, {
      $push: { reviews : { comment, score, user: user.id  } },
      $set: { score: newScore }
    }, { new: true })

  if ( savedGame ) {
    const savedUser = await User.findOneAndUpdate({
      _id: user.id,
      'revies.game': { $ne: savedGame._id }
    }, {
      $push: { reviews: { game: savedGame.id, comment, score } }
    }, { new: true })
    
    return response.json({ game: savedGame, savedUser })
  }
  
  return response.json({ error: "Already commented this game" })
})

module.exports = gamesRouter