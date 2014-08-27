var path = require('path')
var rootPath = path.normalize(__dirname + '/../..')

var config = {
  ROOT     : rootPath,
  APP      : {
    name : 'Hireable'
  },
  BASE_API_HOST : 'http://api.hireable.com',
  CDN_HOST : 'http://cdn.hireable.com',
  SERVER: {
    port: 3001,
    hostname: process.env.HOSTNAME || '127.0.0.1',
  },
  Db: {
    url: 'mongodb://localhost/hireable_prod'
  },
  SESSION_SECRET: process.env.SESSION_SECRET || 'Your Session Secret goes here',
  Mailgun: {
    user: process.env.MAILGUN_USER || 'postmaster@tukangslicing.net',
    password: process.env.MAILGUN_PASSWORD || '7f4v46je15w1'
  },
  GOOGLE: {
    clientID: process.env.GOOGLE_ID || '359890563598-ncpb5les37h1q5hr8v6fdvtsumdiffdl.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'YWwGpWJGf3bs9DmtjKZvFBp6',
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
  },
  LINKEDIN: {
    clientID: process.env.LINKEDIN_ID || '77chexmowru601',
    clientSecret: process.env.LINKEDIN_SECRET || 'szdC8lN2s2SuMSy8',
    callbackURL: '/auth/linkedin/callback',
    scope: ['r_fullprofile', 'r_emailaddress', 'r_network'],
    passReqToCallback: true
  }
}

module.exports = config;
