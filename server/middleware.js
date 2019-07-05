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
    // app.use(function(req, res, next) {
    //     var err = new Error('App.js: Not Found');
    //     err.status = 404;
    //     next(err);
    // });
    // if (app.get('env') === 'development') {
    //     app.use(function(err, req, res, next) {
    //         res.status(err.status || 500);
    //         res.render('error', {
    //             message: err.message,
    //             error: err
    //         });
    //     });
    // }
    // app.use(function(err, req, res, next) {
    //     res.status(err.status || 500);
    //     res.render('error', {
    //         message: err.message,
    //         error: {}
    //     });
    // });
};