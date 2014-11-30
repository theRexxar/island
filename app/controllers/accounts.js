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

exports.subscriptionPlan = function (req, res) {
  res.render('accounts/subscription-plan', {
    bodyClass : 'dashboards'
  })
}

exports.integration = function (req, res) {
  res.render('accounts/integration', {
    bodyClass : 'dashboards'
  })
}
