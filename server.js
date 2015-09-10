var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');

var PORT = process.env.PORT || 3000;
var HOT = process.env.HOT;

var app = express();

if (HOT) {
  var compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use('/static', express.static('static'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at', PORT);
});
