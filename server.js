'use strict';

var express = require('express');
var compression = require('compression');
var fallback = require('express-history-api-fallback');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;
var ROOT = path.join(__dirname, 'build');
app.use(compression());
app.use(express.static(ROOT));
// send all requests to index.html so browserHistory in React Router works
app.use(fallback('index.html', { root: ROOT }));
app.listen(PORT, function() {
	console.log('Production Express server running at localhost:' + PORT);
});
