var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require("hbs");
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var MongoClient = require("mongodb").MongoClient;
fs = require('fs');

var app = express();

MongoClient.connect("mongodb://localhost/db_IMIEVacances", function (err, db) {
	if(err){return console.dir(err);}
	console.log("Connecté à la base de données !");
	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(session({ secret: 'session', cookie: {httpOnly: false}, store: new MongoStore({ url: 'mongodb://localhost:27017/db_IMIEVacances' }) }));
	app.use(express.static(path.join(__dirname, 'public')));


	var index = require('./routes/index')(app, db);
	var user = require('./routes/user')(app, db);
	var reservation = require('./routes/reservation')(app, db);

	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'hbs');

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

	// error handler
	app.use(function(err, req, res, next) {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		// render the error page
		res.status(err.status || 500);
		res.render('error');
	});
});

module.exports = app;