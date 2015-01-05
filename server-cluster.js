var cluster = require('express-cluster');
cluster(function(worker) {

    require('./server')

}, {
  count: require('os').cpus().length,
  respawn: false, // respawn process on exit: defaults to true
  verbose: true, // log what happens to console: defaults to false
  workerListener: function(msg) {
    console.log('master with pid', process.pid, 'received', msg, 'from worker');
  }
})
