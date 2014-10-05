var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var requirejs = require('requirejs');
var fs = require('fs');

var mongo = require('mongodb');
var monk = require('monk');

var connection_string = '127.0.0.1:27017/fritter';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/fritter';
}

var db =  monk(connection_string);

var expressSession = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var dnd = require('./routes/dnd');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    baseUrl: 'parser',
    nodeRequire: require
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({secret: 'cookiesforeveryone'}));
// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});


app.use('/dnd', dnd);
app.use('/users', users);
app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {  
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



var path = process.env.HOME+"/Documents/Michael/2014 MIT Fall/HackMIT2014/Application_Test";
console.log(path);
requirejs(["fileWalker"], function(FileWalker){
  var FileWalker = FileWalker();
  FileWalker.walk(path, function(err, results) {
    if (err) throw err;
    console.log(results);
  });
});




module.exports = app;