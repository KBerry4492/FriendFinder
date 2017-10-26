var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
// var mysql = require("mysql");

var app = express();
var port = process.env.PORT || 3000;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./app/routing/apiRoutes")(app);

require("./app/routing/htmlRoutes")(app);

app.listen(port, function() {
  console.log("App listening on port: " + port);
});