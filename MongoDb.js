/**
 * Created by root on 28/02/17.
 */
var MongoClient = require("mongodb").MongoClient;
fs = require('fs');


MongoClient.connect("mongodb://10.2.8.24/db_IMIEVacances", function (err, db) {
    if(err){return console.dir(err);}


});

function populateDB() {
    var collection = db.collection("logements");
    console.log("Connecter à la base de données !");
    fs.readFile('./model/export_classement.json', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        collection.insertMany(JSON.parse(data),{w:1}, function (err,result) {
            if(err) throw err;
        });
    });
}