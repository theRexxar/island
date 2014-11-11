"use strict";

var CONFIG   = require('../config')
var express  = require('express')
var Route    = express.Router()
var passport = require('passport')
var lodash   = require('lodash')
var Auth     = require(CONFIG.ROOT + '/app/helper/authorization')
var fs       = require('fs')

var UsersController     = require(CONFIG.ROOT + '/app/controllers/users')
var PagesController     = require(CONFIG.ROOT + '/app/controllers/pages')

Route
  .get('/login', Auth.hasLogin, UsersController.login)
  .get('/signup', Auth.hasLogin, UsersController.signup)
  .get('/logout', UsersController.logout)
  .get('/recruiter-registrations/welcome', UsersController.firstAddCompany)
  .post('/users/create', Auth.hasLogin, UsersController.create)
  .post('/users/session', Auth.hasLogin, UsersController.postLogin)
  .get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }))
  .get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), UsersController.linkedinCallback)
  .get('/', PagesController.home)

module.exports = Route
