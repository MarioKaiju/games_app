const loginRouter = require('express').Router()
const passport = require('passport/lib')

loginRouter.get('/failed', (request, response) => {
  const error = request.session.messages[0]
  if ( error === 'Incorrect password' ) {
    response.status(401).json({ success: false, error })
  }

  if ( error === 'Not found' ) {
    response.status(404).json({ success: false, error })
  }
})

loginRouter.get('/google/failed', (request, response) => {
  response.status(401).json({ success: false, error: "Could not access with google" })
})

loginRouter.get('/facebook/failed', (request, response) => {
  response.status(401).json({ success: false, error: "Could not access with google" })
})


loginRouter.get('/loged', (request, response) => {
  if ( request.user ) {
    return response.json(request.user)
  }

  return response.status(401).json({ message: "Not loged" })
})

loginRouter.post('/', passport.authenticate('local', { failureRedirect: '/api/login/failed', failureMessage: true }), async (request, response, next) => {
  const user = request.user
  try {
    if ( user ) {
      return response.json(user)
    }
  } catch (error) {
    next(error)
  }
})

loginRouter.get('/google', passport.authenticate('google', { scope: [ 'email', 'profile' ] }))

loginRouter.get('/google/callback', passport.authenticate("google", {
  successRedirect: "http://localhost:3000",
  failureRedirect: '/api/login/google/failed'
}))

loginRouter.get('/facebook', passport.authenticate("facebook", { scope: [ 'email', 'profile' ] }))

loginRouter.get('/facebook/callback', passport.authenticate("facebook", {
  successRedirect: "http://localhost:3000",
  failureRedirect: '/api/login/facebook/failed'
}))

module.exports = loginRouter