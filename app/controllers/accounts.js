"use strict";

exports.index = function (req, res) {

  res.render('accounts/index', {
    bodyClass : 'dashboards'
  })
}
