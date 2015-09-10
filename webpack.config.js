var path = require('path');
var webpack = require('webpack');

var HOT = process.env.HOT;

function identity (x) { return x; }

module.exports = {
  devtool: HOT ? 'eval-source-map' : 'source-map',
  entry: [
    HOT && 'webpack-hot-middleware/client',
    './client'
  ].filter(identity),
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    HOT && new webpack.HotModuleReplacementPlugin(),
    HOT && new webpack.NoErrorsPlugin(),
    ! HOT && new webpack.optimize.UglifyJsPlugin()
  ].filter(identity),
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      include: __dirname,
      query: {
        optional: ['runtime'],
        stage: 0
      }
    },
    {
      test: /\.less$/,
      loaders: ['style', 'css', 'autoprefixer', 'less'],
      exclude: /node_modules/,
      include: __dirname
    }]
  }
};
