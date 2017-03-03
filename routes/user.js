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

		res.redirect('/msgValid=login');
	});

	/* Inscription */
	app.post('/user/signin', function(req, res, next) {

	    console.log("Insertion d'un utilisateur");

		var newUser = { nom: req.body.nom, 
						prenom: req.body.prenom,
						ville: req.body.ville, 
						email: req.body.email, 
						mdp: req.body.password};  

		//Insertion en Base
		db.collection('users').insert(newUser, null, function (error, results) {
		    if (error) throw error;

		    console.log("L'utilisateur a bien été inséré");    
		});

		res.redirect('/?msgValid=newUser');
	});

	/* Modification */
	app.post('/user/edit', function(req, res, next) {

		//On verifie que l'utilisateur existe en base
		var user = {_id: req.session.user._id, mdp: req.body.oldPassword};

		db.collection('users').findOne(user, function(error, result) {
		    if (error)
		    	throw error;
		    else if(result != null){
	    		console.log("Modification de l'utilisateur");

	    		//On met à jour le user en Base
				db.collection("personnages").update(
				    {	_id: req.session.user.id, 
				    	mdp: req.body.oldPassword
				    }, 
				    {	nom: req.body.nom, 
						prenom: req.body.prenom,
						ville: req.body.ville, 
						email: req.body.email, 
						mdp: req.body.newPassword});

				//On actualise la session avec les nouvelles valeurs
				req.session.user = {nom: req.body.nom, 
									prenom: req.body.prenom,
									ville: req.body.ville, 
									email: req.body.email, 
									mdp: req.body.newPassword};

				req.session.save(function(err) {
				})
		    }

		});

		res.redirect('/msgValid=editUser');
	});

	/* Deconnexion */
	app.get('/user/logout', function(req, res, next) {
		delete req.session.authenticated;
		delete req.session.user;
		res.redirect('/msgValid=logout');
	});
};