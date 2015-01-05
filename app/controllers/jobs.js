"use strict";
var request = require('request')
var validator = require('validator')

exports.index = function (req, res) {
  res.render('jobs/index', {
    bodyClass : 'dashboards'
  })
}

exports.create = function (req, res) {
  res.render('jobs/create', {
    bodyClass : 'jobs'
  })
}

exports.edit = function (req, res) {
  res.render('jobs/edit', {
    bodyClass : 'jobs'
  })
}

exports.applicationForm = function (req, res) {
  res.render('jobs/application-form', {
    bodyClass : 'jobs'
  })
}

exports.load = function(req, res, next, proposalId){

  var options = {
    url     : CONFIG.BASE_API_HOST + "/v1/positions/" + proposalId,
    headers : {'authorization': 'SCA-'+ (req.user.user_token || req.user._id) }
  };

  request(options, function callback(err, response, body) {

    var output = JSON.parse(body);

    if (err) return next(err);

    if (validator.isNull(output.data)) return next(new Error('not found'));

    req.jobs = output.data

    next()

  });
}
