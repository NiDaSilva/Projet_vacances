module.exports = function (app, db) {

	var express = require('express');
	var hbs = require("hbs");

	/* GET home page. */
	app.get('/', function(req, res, next) {
        var filter;
        //On vérifie si un ville à été fournis pour filtrer sinon on appliaque un choix par defaut
        if(req.body.filter)
        {
           filter= {ville:req.body.filter};
        }
        else{
            filter={ville:"ANGERS"};
        }
        db.collection("logements").find(filter).toArray(function(error, results) {
            hbs.registerPartial("popup_login", fs.readFileSync(__dirname+"/../views/login.hbs", 'utf-8'));
            hbs.registerPartial("popup_signin", fs.readFileSync(__dirname+"/../views/signin.hbs", 'utf-8'));
			hbs.registerPartial("popup_editProfile", fs.readFileSync(__dirname+"/../views/editProfile.hbs", 'utf-8'));

            res.render('index', { title: 'TP IMIE', authenticated: req.session.authenticated,user: req.session.user, listeHotel:results });
        });
	});

    /* GET detail page. */
    app.post('/detail', function(req, res, next) {
        var MongoObjectID = require("mongodb").ObjectID;
        var idHotel = req.body.id;
        //On récupère en base l'établissement avec l'id passé en param
        db.collection("logements").findOne({_id: new MongoObjectID(idHotel)},function(error, results) {
            res.send(results);
        });
    });

    /* POST reservation. */
    app.post('/reservation', function(req, res, next) {
        var newResa = {
            idUser: req.session.user._id,
            nbReservation:req.body.nbResa,
            idHotel: req.body.idH,
            dateD: req.body.dateD,
            dateF: req.body.dateF
        };
        //On insère la nouvelle réservation
        db.collection("reservations").insert(newResa, null, function(error, results) {
            if (error) {
                throw error;
            }else {
                console.log("La réservations a bien été inséré");
                res.send({ok:"success", message:"La réservation à bien été prise en compte"});
            }
        });
    });
};