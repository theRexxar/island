"use strict";

var mongoose        = require('mongoose')
var CreateUpdatedAt = require('mongoose-timestamp')

var Company = new mongoose.Schema({
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
      },
      name: String,
      subdomain: {
        type    : String,
        require : true,
        trim: true
      },
      subdomain_url : String,
      company_profile: String,
      log: String,
      logo_url: String,
      website_url: String,
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

mongoose.model('Company', Company)
