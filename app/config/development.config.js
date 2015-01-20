"use strict";

var path = require('path')
var rootPath = path.normalize(__dirname + '/../..')

var config = {
  ROOT     : rootPath,
  APP      : {
    name : 'Bakat.co',
    title : 'A simple web app for hiring process.'
  },
  BASE_HOST : 'http://bakat.dev:9876',
  BASE_JOB_HOST : 'http://jobs.bakat.dev:9876',
  BASE_API_HOST : 'http://api.bakat.dev:6789',
  CDN_HOST : 'http://cdn.bakat.dev:8080',
  SERVER: {
    port: 9876,
    hostname: process.env.HOSTNAME || '127.0.0.1',
  },
  Db: {
    url: 'mongodb://localhost/scaleable_dev'
  },
  REDIS: {
    host: '127.0.0.1',
    port: 6379,
    options: {}
  },
  SESSION_SECRET: process.env.SESSION_SECRET || 'Your Session Secret goes here',
  Mailgun: {
    user: process.env.MAILGUN_USER || 'postmaster@tukangslicing.net',
    password: process.env.MAILGUN_PASSWORD || '7f4v46je15w1'
  },
  GOOGLE: {
    clientID: process.env.GOOGLE_ID || '933344845966-nd5r1dsa3b94kkrbibs30h77uat95gba.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'BJWomy9-LkF8GyT_VA0xbH6X',
    callbackURL: '/auth/google/callback?resource=user',
    passReqToCallback: true
  },
  LINKEDIN: {
    clientID: process.env.LINKEDIN_ID || '75g6xo0pwnsvyc',
    clientSecret: process.env.LINKEDIN_SECRET || 'ZHUMAhj2MThIqSEJ',
    callbackURL: '/auth/linkedin/callback?resource=user',
    scope: ['r_fullprofile', 'r_emailaddress', 'r_contactinfo'],
    oauthToken : process.env.LINKEDIN_OAUTH_TOKEN || 'e9e5b83b-f516-487e-846e-2e47b6dcdc70',
    oauthSecret : process.env.LINKEDIN_OAUTH_SECRET || '77bc3329-7a90-45cd-b7a7-63f5155dc1ad',
    passReqToCallback: true,
  },
  LINKEDIN_APPLICANT: {
    clientID: process.env.LINKEDIN_ID || '75nwmkgxnzhoe8',
    clientSecret: process.env.LINKEDIN_SECRET || 'EoUkTWAVFcnT9uL9',
    callbackURL: '/auth/linkedin/callback?resource=applicant',
    scope: ['r_fullprofile', 'r_emailaddress', 'r_network', 'r_contactinfo', 'w_messages'],
    oauthToken : process.env.LINKEDIN_APPLICANT_OAUTH || '88484c6c-7fbc-4f7e-a380-69fd0d74b801',
    oauthSecret : process.env.LINKEDIN_APPLICANT_OAUTH_SECRET || 'a3d1d92a-0ee0-443d-8669-448cbd64dae7',
    passReqToCallback: true
  }
}

module.exports = config;
