"use strict";

exports.company = function (req, res) {
  res.render('accounts/company', {
    bodyClass : 'dashboards'
  })
}

exports.profiles = function (req, res) {
  res.render('accounts/profile', {
    bodyClass : 'dashboards'
  })
}
