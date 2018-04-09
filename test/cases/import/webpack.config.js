const Self = require('../../../');
const path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash:8].js',
  },
  module: {
    rules: [],
  },
  plugins: [
    new Self({}),
  ],
};
