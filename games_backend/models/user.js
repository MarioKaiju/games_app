const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  firstName: { type: String, required: true },
  lastName : { type: String, required: true },
  passwordHash: String,
  reviews: [
    {
      game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
      comment: { type: String},
      score: { type: Number },
    },
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)


module.exports = User