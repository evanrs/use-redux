const path = require('path');
const webpack = require('webpack');
const express = require('express');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.config');

const PORT = process.env.PORT || 3000;
const HOT = process.env.HOT;

const app = express();

if (HOT) {
  const compiler = webpack(config);
  app.use(devMiddleware(compiler, {
    // noInfo: true,
    publicPath: config.output.publicPath,
    historyApiFallback: true
  }));

  app.use(hotMiddleware(compiler));
}

app.use('/static', express.static('static'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at', PORT);
});
