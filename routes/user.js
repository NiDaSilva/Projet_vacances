var express = require('express');
var router = express.Router();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

/* Connexion de l'utilisateur */
router.post('/login', function(req, res, next) {

	var user = {login: req.body.user.login, mdp: req.body.user.mdp}

	db.collection("users").findOne(objToFind, function(error, result) {
	    if (error) throw error;
	    console.log(result.prenom +" "+ result.nom +" s'est connecté. User : "+ result._id.toString());
	});

	res.send('respond with a resource');
});

/* Inscription */
router.post('/signin', function(req, res, next) {

	var newUser = { login: req.body.user.login, 
					mdp: req.body.user.mdp, 
					nom: req.body.user.nom, 
					prenom: req.body.user.prenom, 
					email: req.body.user.mail, 
					ville: req.body.user.ville};  

	db.collection("users").insert(newUser, null, function (error, results) {
	    if (error) throw error;

	    console.log("L'utilisateur a bien été inséré");    
	});

	res.send('respond with a resource');
});

/* Deconnexion */
router.get('/signout', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
