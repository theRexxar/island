"use strict";
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var CreateUpdatedAt = require('mongoose-timestamp')
var crypto = require('crypto')
/**
 * Applicant Schema
 */

var Applicant = new Schema({
  email: {
    type: String,
    unique: true,
    require: true,
    lowercase: true,
    trim: true
  },
  firstname: {
    type: String,
    trim: true
  },
  lastname: {
    type: String,
    trim: true
  },
  photo_profile: String,
  address: String,
  phone: String,
  headline : String,
  summary: String,
  educations: [
    {
      start: String,
      graduate: String,
      field_of_study: String,
      school: String,
      degree: String
    }
  ],
  experiences: [
    {
      title: String,
      company: String,
      industry: String,
      summary: String,
      start_date: String,
      end_date: String,
      current: {
        type: Boolean,
        default: false
      }
    }
  ],
  resume:String,
  skills: String,
  social_profiles: {},
  linkedin: {},
  tokens: [],
  is_active : {
    type: Boolean,
    default: true
  }
})

Applicant.plugin(CreateUpdatedAt)

module.exports = mongoose.model('Applicant', Applicant)
