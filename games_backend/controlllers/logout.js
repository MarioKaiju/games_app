const logoutRouter = require('express').Router()

logoutRouter.get('', (request, response, next) => {
    request.logout(function(err) {
        if (err) { return next(err); }
        response.redirect(config.BASE_URL);
    });
})

module.exports = logoutRouter