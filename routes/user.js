module.exports = function (app, db) {

	var express = require('express');

	/* Connexion de l'utilisateur */
	app.post('/user/login', function(req, res, next) {

	    console.log("Connexion d'un utilisateur");

	    //var collection = db.get('users');

		var user = {email: req.body.email, mdp: req.body.mdp}

		db.collection('users').findOne(user, function(error, result) {
		    if (error)
		    	throw error;
		    else if(result != null){
			    console.log(result.prenom +" "+ result.nom +" s'est connecté. User : "+ result._id.toString());

				req.session.authenticated = true;
				req.session.user = result;

				req.session.save(function(err) {
				})
		    }

		});

		res.redirect('/');
	});

	/* Inscription */
	app.post('/user/signin', function(req, res, next) {

	    console.log("Insertion d'un utilisateur");

		var newUser = { nom: req.body.nom, 
						prenom: req.body.prenom,
						ville: req.body.ville, 
						email: req.body.email, 
						mdp: req.body.password};  

		db.collection('users').insert(newUser, null, function (error, results) {
		    if (error) throw error;

		    console.log("L'utilisateur a bien été inséré");    
		});

		res.redirect('/');
	});

	/* Deconnexion */
	app.get('/user/logout', function(req, res, next) {
		delete req.session.authenticated;
		delete req.session.user;
		res.redirect('/');
	});
};