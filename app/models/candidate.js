
"use strict";

var mongoose        = require('mongoose')
var CreateUpdatedAt = require('mongoose-timestamp')

var Canditate = new mongoose.Schema({
      position: {
        type: mongoose.Schema.ObjectId,
        ref: "Position"
      },
      applicant: {
        type: mongoose.Schema.ObjectId,
        ref: "Applicant"
      },
      cover_letter: String,
      answers: [
        {
          question: String,
          answer: {
            type: Boolean,
            default: false
          }
        }
      ],
      is_active: {
        type: Boolean,
        default: true
      }
    });

Canditate.plugin(CreateUpdatedAt)

module.exports = mongoose.model('Canditate', Canditate)
