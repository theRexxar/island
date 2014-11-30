"use strict";

var CONFIG   = require('../config')
var express  = require('express')
var Route    = express.Router()
var passport = require('passport')
var lodash   = require('lodash')
var Auth     = require(CONFIG.ROOT + '/app/helper/authorization')
var fs       = require('fs')

var accountControllers  = require(CONFIG.ROOT + '/app/controllers/accounts')

Route
  .get('/company', Auth.requiresLogin, accountControllers.company)
  .get('/profile', Auth.requiresLogin, accountControllers.profiles)
  .get('/integration', Auth.requiresLogin, accountControllers.integration)
  .get('/subscription-plan', Auth.requiresLogin, accountControllers.subscriptionPlan)

module.exports = Route
