'use strict'

const path = require('path')
const webpack = require('webpack')

var config = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'wx-requestor.js',
    library: 'wx-requestor',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.js$/,
        loader: "eslint-loader",
        include: [path.resolve(__dirname, 'src')]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}

module.exports = config
