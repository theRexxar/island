"use strict";

var CONFIG           = require('./index')
var express          = require('express')
var morgan           = require('morgan')
var path             = require('path')
var responseTime     = require('response-time')
var methodOverride   = require('method-override')
var multer           = require('multer')
var compression      = require('compression')
var bodyParser       = require('body-parser')
var cookieParser     = require('cookie-parser')
var session          = require('express-session')
var MongoStore       = require('connect-mongo')({ session: session })
var errorHandler     = require('errorhandler')
var expressValidator = require('express-validator')
var helmet           = require('helmet')
var lusca            = require('lusca')
var env              = process.env.NODE_ENV || 'development'
var flash            = require('express-flash')
var _                = require('lodash')

JSON.mask            = require('json-mask')

module.exports = function (app, passport) {

  var pkg = require(CONFIG.ROOT + '/package.json')

  // settings
  app.set('env', env)
  app.set('port', CONFIG.SERVER.port || 3000)
  app.set('views', path.join(__dirname, '../../app/views'))
  app.set('view engine', 'jade')

  if (app.get('env') == 'production') {

    app.use(morgan('combined', {
      skip: function (req, res) { return res.statusCode < 400 },
      stream: require('fs').createWriteStream( app.config.root + '/access.log', {flags: 'a'})
    }))

    app.use(compression({
      filter: function (req, res) { return /json|text|javascript|css/.test(res.getHeader('Content-Type')) },
      level: 9
    }))

    app.enable('view cache')

  } else if ( app.get('env') == 'development' ) {
    app.use(morgan('dev'))
  }

  app.use(helmet.crossdomain({ caseSensitive: true }));
  app.use(helmet.xssFilter());
  app.use(helmet.xframe('sameorigin'));
  app.use(helmet.nosniff());
  app.use(helmet.nocache({ noEtag: true }));
  app.disable('x-powered-by');
  // app.enable('trust proxy')

  app.use(multer())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(expressValidator())
  app.use(methodOverride())

  app.use(cookieParser('KPjcJ6DIy6972ZRPSrNXiNdB0WxgP4oJKAI3cagWlEAVk'))

  app.use(session({
    name: 'gushcentral.sid',
    genid: function(req) {
      return require('node-uuid').v4() // use UUIDs for session IDs
    },
    resave: true,
    saveUninitialized: true,
    secret: CONFIG.SESSION_SECRET,
    store: new MongoStore({
      url: CONFIG.Db.url,
      auto_reconnect: true
    })
  }));

  // use passport session
  app.use(passport.initialize())
  app.use(passport.session({
    maxAge: new Date(Date.now() + 3600000)
  }))

  app.use(lusca.csrf());
  app.use(flash())

  app.use(require(CONFIG.ROOT + '/app/helper/views-helper')(pkg.name));
  app.use(function (req, res, next) {
    res.locals.pkg       = pkg
    res.locals.NODE_ENV  = env
    res.locals.CONFIG    = CONFIG
    res.locals.moment    = require('moment')
    res.locals._         = _
    res.locals.validator = require('validator');

    if(_.isObject(req.user)) {
      res.locals.user_session = JSON.mask(req.user, '_id,email,firstname,lastname,photo_profile,country');
    }
    next()
  })

  app.use(express.static(app.config.root + '/tmp'))
  if ( app.get('env') == 'development' ) {
    app.use(express.static(app.config.root + '/public'))
  } else {
    var cacheTime = 86400000*7;     // 7 days
    app.use(express.static(app.config.root + '/public',{ maxAge: cacheTime }));

  }

  /** ROUTES Apps */
  app.use('/', require(CONFIG.ROOT + '/app/routes/web'))

  // assume "not found" in the error msgs
  // is a 404. this is somewhat silly, but
  // valid, you can do whatever you like, set
  // properties, use instanceof etc.
  app.use(function(err, req, res, next){
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next()
    }
    // log it
    // send emails if you want

    if(req.url) {
      var path = req.url.split('/')[1];
      if (/api/i.test(path)) {

        var error_results     = {}

        error_results.message = err.stack;

        error_results.status  = 500;

        error_results.id      = require('node-uuid').v4()

        return res.status(500).send(error_results)
      }
    }
    // console.error(err.stack)

    console.log(err)

    // error page
    res.status(500).render('500', { error: err })
  })

  // assume 404 since no middleware responded
  app.use(function(req, res, next){

    if(req.route) {
      if (req.route.path === '/api/v1/*') {
        var error_results     = {}
        error_results.id      = require('node-uuid').v4()
        error_results.message = 'Sorry, that page does not exist'
        error_results.code    = 34 // Corresponds with an HTTP 404 - the specified resource was not found.
        return res.status(404).json(error_results)
      }
    }

    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    })
  })

  if (app.get('env') === 'development') {
    app.locals.pretty = true
    app.use(responseTime())
    app.use(errorHandler())
  }
}
