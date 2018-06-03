var express = require("express");
var app = express();
var helmet = require("helmet");
var morgan = require("morgan");
var path = require("path");
var port = 3000;

app.use(helmet());
app.use(morgan("dev"));
//Shourd be replaced by nginx proxy server static assets serving, in production
app.use("/assets", express.static(__dirname + "/../public"));

app.set("views", path.join(__dirname, "/../views"));
app.set("view engine", "pug");

app.get("/", function(req, res) { res.render("index"); });

app.listen(port, function() { console.log("Example app listening on port: " + port + "!"); });