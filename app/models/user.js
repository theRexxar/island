"use strict";
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var CreateUpdatedAt = require('mongoose-timestamp')
var crypto = require('crypto')
var oAuthTypes = ['linkedin', 'google']
/**
 * User Schema
 */

var UserSchema = new Schema({
  username: {
    type: String,
    trim: true
  },
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
  headline : String,
  time_zone: String,
  report_frequency: {
    type: String,
    enum: [ 'daily', 'weekly', 'never']
  },
  receives_new_candidate_notification: {
    type: Boolean,
    default: false
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  bio: {
    type: String
  },
  interest: [
    {
      type: String
    }
  ],
  linkedin: {},
  google: {},
  tokens: [],
  provider: {
    type: String,
    enum: [ 'local', 'google', 'linkedin'],
    default: 'local'
  },
  hashed_password: {
    type: String,
    require: true
  },
  salt: {
    type: String
  },
  reset_password_token: {
    type: String
  },
  reset_password_expires: {
    type: Date,
  },
  last_login: {
    type: Date
  },
  is_active : {
    type: Boolean,
    default: true
  },
  is_confirm : {
    type: Boolean,
    default: false
  }
})

UserSchema.plugin(CreateUpdatedAt)

/**
 * Virtuals
 */

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() { return this._password })

/**
 * Validations
 */

var validatePresenceOf = function (value) {
  return value && value.length
}

// the below 5 validations only apply if you are signing up traditionally

UserSchema.path('username').validate(function (username) {
  if (this.doesNotRequireValidation()) return true
  return username.length
}, 'Username cannot be blank')

UserSchema.path('username').validate(function (username, fn) {
  var User = mongoose.model('User')
  if (this.doesNotRequireValidation()) fn(true)

  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('username')) {
    User.find({ username: username }).exec(function (err, users) {
      fn(!err && users.length === 0)
    })
  } else fn(true)
}, 'Username already exists')


UserSchema.path('email').validate(function (email) {
  if (this.doesNotRequireValidation()) return true
  return email.length
}, 'Email cannot be blank')

UserSchema.path('firstname').validate(function (email) {
  if (this.doesNotRequireValidation()) return true
  return email.length
}, 'Firstname cannot be blank')

UserSchema.path('lastname').validate(function (email) {
  if (this.doesNotRequireValidation()) return true
  return email.length
}, 'Lastname cannot be blank')

UserSchema.path('email').validate(function (email, fn) {
  var User = mongoose.model('User')
  if (this.doesNotRequireValidation()) fn(true)

  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('email')) {
    User.find({ email: email }).exec(function (err, users) {
      fn(!err && users.length === 0)
    })
  } else fn(true)
}, 'Email already exists')

UserSchema.path('hashed_password').validate(function (hashed_password) {
  if (this.doesNotRequireValidation()) return true
  return hashed_password.length
}, 'Password cannot be blank')


/**
 * Pre-save hook
 */

UserSchema.pre('save', function(next) {
  if (!this.isNew) return next()

  if (!validatePresenceOf(this.password)
    && oAuthTypes.indexOf(this.provider) === -1)
    next(new Error('Invalid password'))
  else
    next()
})

/**
 * Methods
 */

UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function (password) {
    if (!password) return ''
    var encrypred
    try {
      encrypred = crypto.createHmac('sha1', this.salt).update(password).digest('hex')
      return encrypred
    } catch (err) {
      return ''
    }
  },

  generateConfirmationToken: function(password) {
    if (!password) return '';
    var encrypred_confirm_code
    try {
      encrypred_confirm_code = crypto.createHmac('sha1',  this.salt).update(password).digest('hex')
      return encrypred_confirm_code
    } catch (err) {
      return ''
    }
  },

  roleAdmin: function() {
    var admin_level = 1

    return admin_level
  },

  gravatar: function(size) {
    if (!size) size = 200;

    if (!this.email) {
      return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
    }

    var md5 = require('crypto').createHash('md5').update(this.email).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
  },


  /**
   * Validation is not required if using OAuth
   */

  doesNotRequireValidation: function() {
    return ~oAuthTypes.indexOf(this.provider);
  }
}

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Find campaign by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */
  load: function (id, cb) {
    this.findOne({ _id : id }).exec(cb)
  },
}

var UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
