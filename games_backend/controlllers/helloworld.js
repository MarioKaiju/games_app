const helloworldRouter = require('express').Router()

helloworldRouter.get('/', (req, res) => {
  res.send("Hello world")
})

module.exports = helloworldRouter