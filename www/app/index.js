var express = require('express');
var session = require('express-session');
var validator = require('express-validator');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('lodash');

var globals = require('./globals');
var CONFIGS = require('../config')
  .getConfig(process.env.APPLICATION_ENV || 'development');

var app = express();

app.set('config', CONFIGS);
app.set('env', process.env.APPLICATION_ENV);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(validator());
app.use(cookieParser());

//setup session handling
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: '1'
}));

//setup routes
app.use('/api', require('./api'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//catch API exceptions and output them as JSON
app.use(function(err, req, res, next) {
  if(_.contains(req.url, '/api')){
    return res.status(err.status || 500).json({
      error: true,
      status: err.status || 500,
      message: err.message,
      stack: err.stack
    });
  }
  next.apply(this, arguments);
});

module.exports = app;
