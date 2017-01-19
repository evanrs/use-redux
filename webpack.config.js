const path = require('path');
const webpack = require('webpack');
const filter = require('lodash/filter');

const HOT = process.env.HOT;

module.exports = {
  devtool: HOT ? 'eval-source-map' : 'source-map',
  entry: filter([
    HOT && 'react-hot-loader/patch',
    HOT && 'webpack-hot-middleware/client',
    './client'
  ]),
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: filter([
    HOT && new webpack.HotModuleReplacementPlugin(),
    HOT && new webpack.NamedModulesPlugin(),
    ! HOT && new webpack.optimize.UglifyJsPlugin()
  ]),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => filter([
                ! HOT && require('autoprefixer')
              ])
            }
          },
          'less-loader'
        ]
      }
    ]
  }
};
