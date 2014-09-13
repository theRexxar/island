var CONFIG   = require('../../config')
var mongoose = require('mongoose')
var User     = mongoose.model('User')
var utils    = require(CONFIG.ROOT + '/app/helper/utils')
var async    = require('async')

exports.show = function (req, res, next) {

  var user_id = req.user._id

  User
    .findOne({_id: user_id}, function (err, user) {
      if (err) return utils.responses(res, 500, err)

      return utils.responses(res, 200, user)
    })
}
