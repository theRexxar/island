"use strict";

module.exports = function(CONGFIG, mongoose) {
  var options = {
    server: {
      socketOptions: {
        keepAlive: 1,
        // poolSize:5,
        connectTimeoutMS: 30000
      }
    },
    replset: {
      socketOptions: {
        keepAlive: 1,
        // poolSize:5,
        connectTimeoutMS: 30000
      }
    }
  }

  var db = mongoose.connect(CONGFIG.Db.url, options);

  var conn = mongoose.connection;

  conn.on('connected', function () {
    // console.info('Mongoose default connection open to ' + CONGFIG.Db.url);
  });

  // Error handler
  conn.on('error', function(err) {
    // console.error('✗ MongoDB Connection to ' + CONGFIG.Db.url + ' is Error. Please make sure MongoDB is running. -> ' + err);
  })

  var gracefulExit = function() {
    conn.close(function () {
      // console.info('Mongoose default connection with DB :' + CONGFIG.Db.url + ' is disconnected through app termination');
      process.exit(0);
    });
  }

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

  return db
}

