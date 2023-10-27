var express = require('express');
var path = require('path');
var serveStatic = require('server-static');

var app = express();
app.use(serveStatic(path.join(_dirname, 'dist')));

var port = 5475;
app.listen(port);
console.log(`Server started ${port}`);