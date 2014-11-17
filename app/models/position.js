"use strict";

var mongoose        = require('mongoose')
var CreateUpdatedAt = require('mongoose-timestamp')

var Position = new mongoose.Schema({
      creator: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
      },
      company: {
        type: mongoose.Schema.ObjectId,
        ref: "Company"
      },
      hiring_team: [{
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User"
        }
      }],
      title: String,
      department: String,
      code: String,
      country_code: String,
      state_code: String,
      city: String,
      job_zip_code: String,
      telecommuting: {
        type: Boolean,
        default: false
      },
      description: String,
      requirements: String,
      benefit: String,
      extra_info: {},
      application_form: {},
      is_active: {
        type: Boolean,
        default: true
      }
    });

Position.plugin(CreateUpdatedAt)

module.exports = mongoose.model('Position', Position)
