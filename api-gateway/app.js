
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use("/", express.static(__dirname + '/static'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/harvest', routes.harvest);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

process.on('uncaughtException', function (err) {
  console.log("Unhandled exception");
  console.error(err);
});


