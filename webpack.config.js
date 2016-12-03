'use strict';

const webpack = require('webpack');

const env = process.env.NODE_ENV;

const config = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    library: 'Terredux',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    })
  ]
};

module.exports = config;
