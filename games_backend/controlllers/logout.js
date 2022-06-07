const logoutRouter = require('express').Router()

logoutRouter.get('', (request, response) => {
    request.logout()
    response.redirect('http://localhost:300')
})