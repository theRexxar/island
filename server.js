"use strict";

// Module dependencies
global.CONFIG   = require(__dirname + '/app/config')
global.express  = require('express')

var path     = require('path')
var fs       = require('fs')
var mongoose = require('mongoose')
var passport = require('passport')

var app      = express()

app.config = CONFIG

// Database
require(__dirname + '/app/config/database')(CONFIG, mongoose)

var models_path = __dirname + '/app/models'

fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js') && file !== '.DS_Store') {
    require(models_path + '/' + file)
  }
})

require(__dirname + '/app/config/passport')

// express settings
require(__dirname + '/app/config/express')(app, passport)

// create a server instance
// passing in express app as a request event handler
app.listen(app.get('port'), function() {
  console.log("\n✔ Express server listening on port %d in %s mode", app.get('port'), app.get('env'))
})

module.exports = app
