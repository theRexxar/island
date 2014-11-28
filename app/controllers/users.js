"use strict";

var CONFIG      = require('../config');
var mongoose    = require('mongoose');
var User        = require(CONFIG.ROOT + '/app/models/user')
var async       = require('async');
var utility     = require('utility');
var crypto      = require('crypto');
var errorHelper = require(CONFIG.ROOT + '/app/helper/errors');
var passport    = require('passport')
var _           = require('lodash')

var login = function (req, res) {
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/'
  delete req.session.returnTo
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
    res.redirect('/dashboards')
  }else{
    res.render('users/login', {
      titlePage: 'Sign in · '+ CONFIG.APP.name,
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
      var redirectTo = req.session.returnTo ? req.session.returnTo : '/dashboards'
      delete req.session.returnTo
      if(_.size(req.user.company) > 0) {
        res.redirect(redirectTo);
      } else {
        return res.redirect('/recruiter-registrations/welcome')
      }
    });

  })(req, res, next);
}

/**
 * Show sign up form
 */
exports.signup = function (req, res) {
  if(req.isAuthenticated()){
    res.redirect('/dashboards')
  } else {
    res.render('users/signup', {
      titlePage: 'Join Apfly · '+ CONFIG.APP.name,
      flash_error: req.flash('flash_error'),
      user: new User()
    })
  }
}
/**
 * Logout
 */
exports.logout = function (req, res) {
  req.logout();
  res.redirect(301, '/')
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
      // manually login the user once successfully signed up
      req.logIn(user, function(err) {

        if (err) { console.error(err); return next(err) }

        if(_.size(req.user.company) > 0) {
          return res.redirect('/dashboards')
        } else {
          return res.redirect('/recruiter-registrations/welcome')
        }

      })
    }
  })
}

exports.firstAddCompany = function (req, res, next) {

  res.render('users/first-setup-company', {
    titlePage: 'Create Company · '+ CONFIG.APP.name,
  })
}


exports.oauthCallback = function (req, res, next) {
  if (req.query.resource == 'user') {
    res.redirect(301, '/recruiter-registrations/welcome')
  } else {
    console.log(req.query)
    next()
  }
}
