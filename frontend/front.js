var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

var app = express();
app.use(serveStatic(path.join( './dist')));

var port = 5173;
app.listen(port);
console.log(`Server started ${port}`);