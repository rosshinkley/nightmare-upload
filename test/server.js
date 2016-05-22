var express = require('express');
var multer = require('multer');
var path = require('path');
var serve = require('serve-static');
var debug= require('debug')('nightmare:server');

var app = module.exports = express();

app.use(multer({ inMemory: true }).any());

app.post('/upload', function (req, res) {
  debug('uploading', req.files);
  res.send(req.files);
});

app.use(serve(path.resolve(__dirname, 'fixtures')));

if (!module.parent) app.listen(7500);
