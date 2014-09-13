"use strict";

var CONFIG   = require('../config')
var express  = require('express')
var Route    = express.Router()
var passport = require('passport')
var lodash   = require('lodash')
var Auth     = require(CONFIG.ROOT + '/app/helper/authorization')
var fs       = require('fs')

var controllerApiDir = CONFIG.ROOT + '/app/controllers/api/'

var UsersController     = require(controllerApiDir + 'users')

Route
  .get('/users/show', UsersController.show)

module.exports = Route
