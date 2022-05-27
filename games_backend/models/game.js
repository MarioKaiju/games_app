const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  developer: {
    type: String,
    required: true
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publisher',
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  platforms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Platform'
    }
  ]
})

gameSchema.plugin(uniqueValidator)

gameSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game