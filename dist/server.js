var express = require("express");
var path = require('path');
var mongoose = require('mongoose');
var middleware = require('../server/middleware');

var app = express();
middleware(app);


app.use(express.static(__dirname) );
let router = express.Router();
app.use("/api", router);
require('../server/routes/coinRouter')(router);
require('../server/routes/chartRouter')(router);
// require('./server/routes/key')(router);
require('../server/routes/userRouter')(router);


app.get("*",(req, res, next) => {
    res.sendFile(__dirname + "/index.html");
});

var dbString = 'mongodb://localhost:27017/myapp';
mongoose.connect(dbString, { useNewUrlParser: true });


var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;

    console.log('Listening at http://localhost:%s', port);
});
