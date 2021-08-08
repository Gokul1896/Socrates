const express = require("express"),
  jwt = require("jsonwebtoken"),
  methodOverride = require("method-override"),
  bodyParser = require("body-parser"),
  config = require("./env"),
  routes = require("../app/routes"),
  app = express(),
  cors = require("cors");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(routes);
app.use((req, res, next) => {
  return res.status(404).send({
    message: "API Not Found",
    statusCode: "404",
    data: null,
  });
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  // db logger comes here
  next();
  //res.status(500).send('Something broke!')
});
app.set("x-powered-by", false);

module.exports = app;
