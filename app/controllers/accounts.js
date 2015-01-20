"use strict";

var User = db.model('User')

exports.company = function (req, res) {
  res.render('accounts/company', {
    bodyClass : 'dashboards'
  })
}

exports.profiles = function (req, res) {
  var user;

  if (req.user) {
    user = req.user;
  } else {
    user = new User();
  }


  res.render('accounts/profile', {
    bodyClass : 'accounts',
    user : user
  })
}

exports.subscriptionPlan = function (req, res) {
  res.render('accounts/subscription-plan', {
    bodyClass : 'accounts'
  })
}

exports.integration = function (req, res) {
  res.render('accounts/integration', {
    bodyClass : 'accounts'
  })
}
