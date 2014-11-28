"use strict";

var CONFIG   = require('../config')
var express  = require('express')
var Route    = express.Router()
var passport = require('passport')
var lodash   = require('lodash')
var Auth     = require(CONFIG.ROOT + '/app/helper/authorization')
var fs       = require('fs')

var userControllers  = require(CONFIG.ROOT + '/app/controllers/users')
var pageControllers = require(CONFIG.ROOT + '/app/controllers/pages')
var dashboadControllers = require(CONFIG.ROOT + '/app/controllers/dashboards')

Route
  .get('/dashboards', Auth.requiresLogin, dashboadControllers.index)
  .get('/login', Auth.hasLogin, userControllers.login)
  .get('/signup', Auth.hasLogin, userControllers.signup)
  .get('/logout', userControllers.logout)
  .get('/recruiter-registrations/welcome', Auth.hasCreateCompany, userControllers.firstAddCompany)
  .post('/users/create', Auth.hasLogin, userControllers.create)
  .post('/users/session', Auth.hasLogin, userControllers.postLogin)

  .get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }))
  .get('/auth/linkedin/callback',
    passport.authenticate('linkedin', {
      failureRedirect: '/signup'
    }), userControllers.oauthCallback)

  .get('/auth/google', passport.authenticate('google', { scope: 'profile email' }))
  .get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/signup'
    }), userControllers.oauthCallback)

  .get('/', pageControllers.home)

module.exports = Route
