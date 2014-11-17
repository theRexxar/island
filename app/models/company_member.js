"use strict";

var mongoose        = require('mongoose')
var CreateUpdatedAt = require('mongoose-timestamp')

var CompanyMember = new mongoose.Schema({
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
      },
      company: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
      },
      is_active: {
        type: Boolean,
        default: true
      }
    });

CompanyMember.plugin(CreateUpdatedAt)

module.exports = mongoose.model('CompanyMember', CompanyMember)
