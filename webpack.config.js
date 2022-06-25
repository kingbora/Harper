const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: ''
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'babel-loader'
    }, {
      test: /\.less$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'less-loader'
      }]
    }]
  }
};