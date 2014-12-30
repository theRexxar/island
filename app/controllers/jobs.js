"use strict";

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

exports.applicationForm = function (req, res) {
  res.render('jobs/application-form', {
    bodyClass : 'jobs'
  })
}
