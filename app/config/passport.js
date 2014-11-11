"use strict";

var CONFIG           = require('./index')
var mongoose         = require('mongoose')
var LocalStrategy    = require('passport-local').Strategy
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var passport         = require('passport')
var User             = require(CONFIG.ROOT + '/app/models/user')

// serialize sessions
passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.findOne({ _id: id }, function (err, user) {
    done(err, user)
  })
})

// use local strategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done) {
    User.findOne( { email: email } , function (err, user) {

      if (err) { return done(err) }

      if (!user) {
        return done(null, false, { message: 'Your email not register' })
      }

      if (!user.authenticate(password)) {
        return done(null, false, { message: 'invalid login or password' })
      }

      // User.updateLastLogin(user._id)

      return done(null, user)
    })
  }
))


// Sign in with LinkedIn.

passport.use(new LinkedInStrategy(CONFIG.LINKEDIN, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({ 'linkedin.id': profile.id }, function(err, existingUser) {
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a LinkedIn account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, function(err, user) {

          user.linkedin = profile._json;
          user.tokens.push({ kind: 'linkedin', accessToken: accessToken });

          user.save(function(err) {
            req.flash('info', { msg: 'LinkedIn account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  } else {

    User.findOne({ 'linkedin.id': profile.id }, function(err, existingUser) {

      if (existingUser) return done(null, existingUser);

      User.findOne({ email: profile._json.emailAddress }, function(err, existingEmailUser) {

        if (existingEmailUser) {

          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with LinkedIn manually from Account Settings.' });
          done(err);

        } else {

          var user = new User();

          user.linkedin = profile._json
          user.provider = 'linkedin'

          user.tokens.push({ kind: 'linkedin', accessToken: accessToken })

          user.email         = profile._json.emailAddress
          user.firstname     = profile._json.firstName
          user.lastname      = profile._json.lastName
          user.headline      = profile._json.headline
          user.photo_profile = profile._json.pictureUrl
          user.bio           = profile._json.summary
          user.country       = profile._json.location.country.code.toUpperCase()

          user.save(function(err, newUser) {
            done(err, newUser)
          });
        }
      });
    });
  }
}));
