const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../utils/config')
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

passport.use(new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/login/google/callback"
}, async function(accesToken, refreshToken, profile, done) {

    const savedUser = await User.findOneAndUpdate({ username: profile.name.givenName }, {
      username: profile.name.givenName,
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
    }, { upsert: true, new: true })

    done(null, savedUser)
  }
))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})