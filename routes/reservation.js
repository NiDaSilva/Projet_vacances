module.exports = function (app, db) {

	var express = require('express');

	/* Creation d'une reservation */
	app.post('/reservation/new', function(req, res, next) {

	    console.log("Creation d'une reservation");

		var newRes = {	idLogement: req.body.idLogement, 
						idUser: req.session.user._id,
						duree: req.body.duree, 
						nbrPersonnes: req.body.nbrPersonnes};  

		//Insertion en Base
		db.collection('reservations').insert(newRes, null, function (error, results) {
		    if (error) throw error;

		    console.log("La reservation a bien été inséré");    
		});

		res.redirect('/?msgValid=newRes');
	});

	/* Visualisation des reservations */
	app.post('/reservation/find', function(req, res, next) {

	    console.log("Visualisation des reservations de "+ req.session.user.prenom +" "+ req.session.user.nom);

		db.collection('reservations').find({idPersonnes: req.session._id}, function(error, result) {
		    if (error) throw error;
			res.send(result);
		});
	});

	/* Modification */
	app.post('/reservation/edit', function(req, res, next) {

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
						mdp: req.body.newPassword
					}
				);

				//On actualise la session avec les nouvelles valeurs
				req.session.user = {nom: req.body.nom, 
									prenom: req.body.prenom,
									ville: req.body.ville, 
									email: req.body.email, 
									mdp: req.body.newPassword
								};

				req.session.save(function(err) {
				})
		    }

		});

		res.redirect('/?msgValid=editRes');
	});
};