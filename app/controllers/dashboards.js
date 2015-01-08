"use strict";

var CONFIG      = require('../config');
var mongoose    = require('mongoose');
var User        = db.model('User');
var async       = require('async');
var utility     = require('utility');
var errorHelper = require(CONFIG.ROOT + '/app/helper/errors');

exports.index = function (req, res) {
  res.render('dashboards/index', {
    bodyClass : 'dashboards'
  })
}
