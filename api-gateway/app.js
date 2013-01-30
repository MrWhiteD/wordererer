
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
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/harvest', routes.harvest);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


var request = require('request');
var jsdom = require('jsdom');

var req_url = 'http://en.wikipedia.org/wiki/Search_engine';

request({uri: req_url}, function(error, response, body){
    if(!error && response.statusCode == 200){
        var window = jsdom.jsdom(body).createWindow();
        
        var temp = window.document.getElementById('See_also');
        console.log(temp);
    }
});