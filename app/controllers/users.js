"use strict";

var CONFIG      = require('../config');
var mongoose    = require('mongoose');
var User        = require(CONFIG.ROOT + '/app/models/user')
var async       = require('async');
var utility     = require('utility');
var crypto      = require('crypto');
var errorHelper = require(CONFIG.ROOT + '/app/helper/errors');
var passport    = require('passport')

var login = function (req, res) {
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/'
  delete req.session.returnTo
  req.flash('success', { msg: 'Success! You are logged in.' });
  res.redirect(redirectTo)
}

exports.signin = function (req, res) {}

/**
 * Auth callback
 */

exports.authCallback = login

/**
 * Show login form
 */
exports.login = function (req, res) {
  if(req.isAuthenticated()){
    res.redirect('/dashboard')
  }else{
    res.render('users/login', {
      title: 'Login',
      message: req.flash('error')
    })
  }
}

exports.postLogin = function (req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/login');
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    if (!user) {
      req.flash('errors', { msg: info.message });
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next);
}

/**
 * Show sign up form
 */
exports.signup = function (req, res) {
  if(req.isAuthenticated()){
    res.redirect('/dashboard')
  } else {
    res.render('users/signup', {
      title: 'Sign up',
      user: new User()
    })
  }
}
/**
 * Logout
 */
exports.logout = function (req, res) {
  req.logout();
  req.flash('success', { msg: 'Success! You are logout' });
  res.redirect('/')
}

/**
 * Session
 */

exports.session = login

/**
 * Create user
 */

exports.create = function (req, res, next) {
  var user = new User(req.body)
  user.provider = 'local'
  user.save(function (err, new_user) {
    if (err) {
      return res.render('users/signup', {
        errors: errorHelper.proper(err.errors),
        user: user,
        title: 'Sign up'
      })
    } else {
      console.log(user)
      // manually login the user once successfully signed up
      req.logIn(user, function(err) {
        if (err) {
          console.log(err)
          return next(err)
        }
        return res.redirect('/dashboard')
      })
    }
  })
}

exports.firstAddCompany = function (req, res, next) {

  res.render('users/first-setup-company', {
    title: 'Sign up',
  })
}


exports.linkedinCallback = function (req, res, next) {

  if (req.query.resource == 'user') {

    res.redirect(301, '/recruiter-registrations/welcome')

  } else {
  }
}
