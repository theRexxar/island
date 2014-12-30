"use strict";

module.exports = function (app) {

  app.use('/jobs/', require(CONFIG.ROOT + '/app/routes/jobs'))

  app.use('/account/', require(CONFIG.ROOT + '/app/routes/account'))

  app.use('/', require(CONFIG.ROOT + '/app/routes/web'))
}
