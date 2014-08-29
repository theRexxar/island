"use strict";

module.exports = function (CONGFIG, mongoose) {

  var connect = function () {
    var options = {
      server: {
        socketOptions: { keepAlive: 1 }
      },
      auto_reconnect:true
    }
    mongoose.connect(CONGFIG.Db.url, options)
  }
  connect()

  // Error handler
  mongoose.connection.on('error', function (err) {
    console.error('✗ MongoDB Connection Error. Please make sure MongoDB is running. -> ' + err);
  })

  // Reconnect when closed
  mongoose.connection.on('disconnected', function () {
    connect()
  })

}
