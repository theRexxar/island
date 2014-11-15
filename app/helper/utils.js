"use strict";

exports.responses = function(res, status, obj) {
  var resultPrint     = {}
  if (status == 200) {
    resultPrint.data = obj
  } else {
    resultPrint     = obj
  }
  resultPrint.id      = require('node-uuid').v4()
  resultPrint.status  = status

  return res.status(status).json(resultPrint )
}
