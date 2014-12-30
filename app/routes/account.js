"use strict";

var Route    = express.Router()
var lodash   = require('lodash')
var Auth     = require(CONFIG.ROOT + '/app/helper/authorization')

var accountControllers  = require(CONFIG.ROOT + '/app/controllers/accounts')

Route
  .all('/*', Auth.requiresLogin)
  .get('/company', accountControllers.company)
  .get('/profile', accountControllers.profiles)
  .get('/integration', accountControllers.integration)
  .get('/subscription-plan', accountControllers.subscriptionPlan)

module.exports = Route
