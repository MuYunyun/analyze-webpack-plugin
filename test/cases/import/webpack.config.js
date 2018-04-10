import AnalyzeWebpackPlugin from '../../../src/cjs'

const path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash:8].js',
  },
  plugins: [
    new AnalyzeWebpackPlugin({ filename: 'analyze.html' }),
  ],
};
