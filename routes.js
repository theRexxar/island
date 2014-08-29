"use strict";

var CONFIG   = require('./app/config')
var express  = require('express')
var Route    = express.Router()
var passport = require('passport')
var lodash   = require('lodash')
var Auth     = require(CONFIG.ROOT + '/app/helper/authorization')
var fs       = require('fs')

var UsersController     = require(CONFIG.ROOT + '/app/controllers/users')
var PagesController     = require(CONFIG.ROOT + '/app/controllers/pages')

Route
  .get('/login', UsersController.login)
  .get('/signup', UsersController.signup)
  .get('/logout', UsersController.logout)
  .post('/users/create', UsersController.create)
  .post('/users/session',
    passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }), UsersController.session)
  .get('/', PagesController.home)
module.exports = Route
