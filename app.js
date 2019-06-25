require('module-alias/register');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require("passport");
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname));
app.use(passport.initialize());
require("./server/user/passport")(passport);
app.use("/api", bodyParser.json());
let router = express.Router();
app.use("/api", router);

//ROUTER---------------------------------------------
// require('./server/routes/coin_router')(router);
// require('./server/routes/chart_router')(router);
require('./server/routes/key')(router);
require('./server/routes/user')(router)
//HTML-----------------------------------------------
app.get("*",(req, res, next) => {
    res.sendFile(__dirname + "/index.html");
});
//DATABASE UPDATE------------------------------------
var dbString = 'mongodb://localhost:27017/myapp';
// mongoose.connect(dbString, { useNewUrlParser: true }, function(){
    // require('@scripts/insert').coin();
    // require('@scripts/insert').chart();
    // require('@scripts/coin/sync')();
    // require('@scripts/chart/chart_draw')()
// });
//SERVER-------------------------------------------
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:%s', port);
});
//CATCH ERROR
app.use(function(req, res, next) {
    var err = new Error('App.js: Not Found');
    err.status = 404;
    next(err);
});
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;