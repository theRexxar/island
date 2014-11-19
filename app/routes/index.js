"use strict";

var CONFIG = require('../config')

module.exports = function (app) {

  app.use('/account/', require(CONFIG.ROOT + '/app/routes/account'))

  app.use('/', require(CONFIG.ROOT + '/app/routes/web'))
}
