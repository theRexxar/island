var path = require('path')
var rootPath = path.normalize(__dirname + '/../..')

var config = {
  ROOT     : rootPath,
  APP      : {
    name : 'Hireable'
  },
  BASE_API_HOST : 'http://api.hireable.com:6789',
  CDN_HOST : 'http://cdn.hireable.com:8080',
  SERVER: {
    port: 9876,
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
    clientID: process.env.LINKEDIN_ID || '75g6xo0pwnsvyc',
    clientSecret: process.env.LINKEDIN_SECRET || 'ZHUMAhj2MThIqSEJ',
    callbackURL: '/auth/linkedin/callback',
    scope: ['r_fullprofile', 'r_emailaddress', 'r_network', 'r_contactinfo', 'w_messages'],
    oauthToken : 'e9e5b83b-f516-487e-846e-2e47b6dcdc70',
    oauthSecret : '77bc3329-7a90-45cd-b7a7-63f5155dc1ad',
    passReqToCallback: true,
  },
  LINKEDIN_APPLICANT: {
    clientID: process.env.LINKEDIN_ID || '75nwmkgxnzhoe8',
    clientSecret: process.env.LINKEDIN_SECRET || 'EoUkTWAVFcnT9uL9',
    callbackURL: '/auth/linkedin/callback',
    scope: ['r_fullprofile', 'r_emailaddress', 'r_network', 'r_contactinfo', 'w_messages'],
    oauthToken : '88484c6c-7fbc-4f7e-a380-69fd0d74b801',
    oauthSecret : 'a3d1d92a-0ee0-443d-8669-448cbd64dae7',
    passReqToCallback: true
  }
}

module.exports = config;
