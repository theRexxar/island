"use strict";

var CONFIG = require('./index')

var logger           = require('morgan')
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
var env              = process.env.NODE_ENV || 'development'
var flash            = require('express-flash')
var _                = require('lodash')

module.exports = function (app, passport) {

  var pkg = require(CONFIG.ROOT + '/package.json')

  // settings
  app.set('env', env)
  app.set('port', CONFIG.SERVER.port || 3000)
  app.set('views', path.join(__dirname, '../../app/views'))
  app.set('view engine', 'jade')

  // app.enable('trust proxy')
  app.disable('x-powered-by')

  app.use(multer())

  if (env === 'development') {
    app.use(logger('dev'))
  } else {
    app.use(logger())
  }

  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(expressValidator())
  app.use(methodOverride())

  app.use(cookieParser('KPjcJ6DIy6972ZRPSrNXiNdB0WxgP4oJKAI3cagWlEAVk'))

  app.use(session({
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
  app.use(flash())

  app.use(require(CONFIG.ROOT + '/app/helper/views-helper')(pkg.name));
  app.use(function (req, res, next) {
    // console.log(req.isAuthenticated());
    res.locals.pkg      = pkg
    res.locals.NODE_ENV = env
    res.locals.moment   = require('moment')
    res.locals.config   = CONFIG

    if(_.isObject(req.user)) {
      res.locals.user_session = req.user
    }
    next()
  })

  /** ROUTES Apps */
  app.use(require(CONFIG.ROOT + '/routes'))

  app.use(function handleNotFound(req, res, next){
    res.status(404)

    if (req.accepts('html')) {
      res.render('404', { url: req.url, error: '404 Not found' })
      return
    }

    if (req.accepts('json')) {
      res.send({ error: 'Not found' })
      return
    }

    res.type('txt').send('Not found')
  })

  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(responseTime())
    app.use(errorHandler())
  } else {
    app.use(compression({
      filter: function (req, res) {
        return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
      },
      level: 9
    }))

    app.use(function logErrors(err, req, res, next){
      if (err.status === 404) {
        return next(err)
      }

      console.error(err.stack)
      next(err)
    })

    app.use(function respondError(err, req, res, next){
      var status, message

      status = err.status || 500
      res.status(status)

      message = ((err.productionMessage && err.message) ||
        err.customProductionMessage)

      if (!message) {
        if (status === 403) {
          message = 'Not allowed'
        } else {
          message = 'Oops, there was a problem!'
        }
      }

      if (req.accepts('json')) {
        res.send({error: message})
        return

      } else {
        res.type('txt').send(message + '\n')
        return
      }

    })
  }
}
