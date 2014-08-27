"use strict";

var CONFIG   = require('./app/config');
var express  = require('express');
var Route    = express.Router();
var passport = require('passport');
var lodash   = require('lodash')
var Auth     = require(CONFIG.ROOT + '/app/helper/authorization');
var fs       = require('fs');

var userController     = require(CONFIG.ROOT + '/app/controllers/users');

Route
  .get('/login', userController.login)
  .get('/signup', userController.signup)
  .get('/logout', userController.logout)
  .post('/users/create', userController.create)
  .post('/users/session',
    passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }), userController.session)
  .get('/settings/profile', userController.settingProfile)
  .get('/', function (req, res) {
    res.render('index')
  })
module.exports = Route
