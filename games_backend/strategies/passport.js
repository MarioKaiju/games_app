const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../utils/config');
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
      username: `google_user${profile.id}`,
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      provider: "google"
    }, { upsert: true, new: true })

    done(null, savedUser)
  }
))

passport.use(new FacebookStrategy({
  clientID: config.FACEBOOK_CLIENT_ID,
  clientSecret: config.FACEBOOK_CLIENT_SECRET,
  callbackURL: "/api/login/facebook/callback",
  profileFields: ['id', 'displayName', 'email', 'name']
}, async function(accesToken, refreshToken, profile, done) {

  console.log(profile)

  const existingUser = await User.findOneAndUpdate({
    email: profile.emails[0].value,
  }, {
    $addToSet: { provider: "facebook" }
  })

  if ( existingUser ) {
    done(null, existingUser)
  }

  if (!existingUser ) {
    const savedUser = await User.create({
      username: `facebook_user${profile.id}`,
      email: profile.emails[0].value,
      firstName: profile.name.givenName + profile.name.middleName,
      lastName: profile.name.familyName,
      provider: "facebook"
    })
  
    done(null, savedUser)
  }  
}))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})