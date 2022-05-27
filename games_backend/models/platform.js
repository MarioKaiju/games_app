const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const platformSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
    }
  ]
})

platformSchema.plugin(uniqueValidator)

platformSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Platform = mongoose.model('Platform', platformSchema)

module.exports = Platform