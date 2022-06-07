const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');
const passport = require('passport')

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, function(username, password, done) {
    User.findOne({ username }, async (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Not found' }); }
      const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
      if (!passwordCorrect) { return done(null, false, { message: 'Incorrect password' }); }
      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})