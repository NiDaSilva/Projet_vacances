module.exports = function (app, db) {

	var express = require('express');
	var hbs = require("hbs");

	/* GET home page. */
	app.get('/', function(req, res, next) {
        db.collection("logements").find({ville:"ANGERS"}).toArray(function(err, docs) {
            hbs.registerPartial("popup_login", fs.readFileSync(__dirname+"/../views/login.hbs", 'utf-8'));
            hbs.registerPartial("popup_signin", fs.readFileSync(__dirname+"/../views/signin.hbs", 'utf-8'));
			hbs.registerPartial("popup_editProfile", fs.readFileSync(__dirname+"/../views/editProfile.hbs", 'utf-8'));

            res.render('index', { title: 'Express', authenticated: req.session.authenticated,user: req.session.user, listeHotel:docs });
        });
	});

    /* GET detail page. */
    app.post('/detail', function(req, res, next) {

        db.collection("logements").find({_id:req.body.id}).toArray(function(err, docs) {
            hbs.registerPartial("popup_login", fs.readFileSync(__dirname+"/../views/login.hbs", 'utf-8'));
            hbs.registerPartial("popup_signin", fs.readFileSync(__dirname+"/../views/signin.hbs", 'utf-8'));
            res.send(docs);
        });
    });
};