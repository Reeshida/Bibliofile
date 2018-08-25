var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var db = require("./models");
var isbn = require('node-isbn');
var cors = require('cors');

var models = require("./models");

var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(cors());

app.use(express.static("public"));

//Sync Database
models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine');
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
});

require("./routing/htmlRoutes.js")(app);
require("./routing/apiRoutes.js")(app);

// -----------------------------------------------------------------------
// DO NOT DO THIS UNLESS YOU REALLY MEAN IT, YOU CAN'T GET THIS DATA BACK!
//------------------------------------------------------------------------
// if you need to delete everything in the db and start again, here you can use:
//db.sequelize.sync({ force: true }).then(function() {
// -----------------------------------------------------------------------
// DO NOT DO THIS UNLESS YOU REALLY MEAN IT, YOU CAN'T GET THIS DATA BACK!
//------------------------------------------------------------------------

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      
      console.log(db);
      console.log("App listening on PORT " + PORT);
    });
});
