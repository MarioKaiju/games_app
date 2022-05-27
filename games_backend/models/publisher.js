const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      unique: true
    }
  ]
})

publisherSchema.plugin(uniqueValidator)

publisherSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Publisher = mongoose.model('Publisher', publisherSchema)

module.exports = Publisher