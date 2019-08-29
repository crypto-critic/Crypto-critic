var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require("passport");
var express = require('express');

module.exports = (app) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use("/api", bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(passport.initialize());
    require("./passport")(passport);
};