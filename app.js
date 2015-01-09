// set up

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var database = require('./config/database');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// var favicon = require('serve-favicon');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

var routes = require('./app/routes')(app);

console.log(routes);

mongoose.connect(database.url);


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



app.listen(port);
console.log("App listening on port " + port);
console.log(routes);
