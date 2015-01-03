"use strict";

var Route    = express.Router()
var lodash   = require('lodash')

var jobsControllers = require(CONFIG.ROOT + '/app/controllers/jobs')
var Auth            = require(CONFIG.ROOT + '/app/helper/authorization')

Route
  .all('/*', Auth.requiresLogin)
  .get('/create', jobsControllers.create)
  .get('/:positionId/edit', jobsControllers.edit)
  .get('/:positionId/application-form', jobsControllers.applicationForm)

module.exports = Route
