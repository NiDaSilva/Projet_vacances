var express = require('express');
var router = express.Router();
var hbs = require("hbs");

/* GET home page. */
router.get('/', function(req, res, next) {
  hbs.registerPartial("popup_login", fs.readFileSync(__dirname+"/../views/login.hbs", 'utf-8'));
  res.render('index', { title: 'Express' });
});

module.exports = router;
