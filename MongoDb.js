/**
 * Created by root on 28/02/17.
 */


function populateDB() {
    var collection = db.collection("logements");
    console.log("Insertion des logements");
    fs.readFile('./model/export_classement.json', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        collection.insertMany(JSON.parse(data),{w:1}, function (err,result) {
            if(err) throw err;
        });
    });
}