"use strict";

var mongoose        = require('mongoose')
var CreateUpdatedAt = require('mongoose-timestamp')
var validate        = require('mongoose-validator')

var usernameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Username should be between 3 and 50 characters'
  }),
  validate({
    message: 'Username should contain alpha-numeric characters only',
    validator: 'matches',
    arguments: /^[a-zA-Z0-9-_]+$/
  })
];

var Company = new mongoose.Schema({
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
      },
      name: {
        type: String,
        require : true
      },
      subdomain: {
        type    : String,
        require : true,
        validate: usernameValidator,
        trim: true
      },
      subdomain_url : String,
      company_overview: String,
      logo_url: String,
      logo_path: String,
      website_url: {
        type: String,
        require : true
      },
      is_active: {
        type: Boolean,
        default: true
      },
      plan: {
        type: String,
        enum: ['trial','starter', 'standard', 'profesional']
      },
      plan_start_date: {
        type: Date,
      }
    });

Company.plugin(CreateUpdatedAt)

module.exports = mongoose.model('Company', Company)
