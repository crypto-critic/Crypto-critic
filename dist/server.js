const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const middleware = require('../server/middleware');
const app = express();
middleware(app);

app.use(express.static(__dirname) );

let router = express.Router();
app.use("/api", router);
// require('../server/routes/coinRouter')(router);
// require('../server/routes/chartRouter')(router);
require('../server/routes/userRouter')(router);

app.get("*",(req, res, next) => {
    res.sendFile(__dirname + "/index.html");
});

const dbString = 'mongodb://localhost:27017/myapp';
mongoose.connect(dbString, { useNewUrlParser: true });

const server = app.listen(process.env.PORT || 5000, function () {
    const port = server.address().port;
    console.log('Listening at http://localhost:%s', port);
});
