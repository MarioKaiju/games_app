require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const GOOGLE__CLIENT_ID = process.env.GOOGLE__CLIENT_ID
const GOOGLE__CLIENT_SECRET = process.env.GOOGLE__CLIENT_SECRET

module.exports = {
  PORT,
  MONGODB_URI,
  GOOGLE__CLIENT_ID,
  GOOGLE__CLIENT_SECRET
}