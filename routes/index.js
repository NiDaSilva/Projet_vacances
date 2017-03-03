module.exports = function (app, db) {

	var express = require('express');
	var hbs = require("hbs");

	/* GET home page. */
	app.get('/', function(req, res, next) {
		hbs.registerPartial("popup_login", fs.readFileSync(__dirname+"/../views/login.hbs", 'utf-8'));
		hbs.registerPartial("popup_signin", fs.readFileSync(__dirname+"/../views/signin.hbs", 'utf-8'));

		if(req.session.authenticated)
			res.render('index', { title: 'Express', authenticated: true });
		else
			res.render('index', { title: 'Express', authenticated: false });
	});
};