const logoutRouter = require('express').Router()

logoutRouter.get('', (request, response, next) => {
    request.logout(function(err) {
        if (err) { return next(err); }
        response.redirect('http://localhost:3000');
    });
})

module.exports = logoutRouter