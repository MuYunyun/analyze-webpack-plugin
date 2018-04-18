// import AnalyzeWebpackPlugin from '../../../lib/plugin'
const AnalyzeWebpackPlugin = require("../../../lib/plugin").default

const path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash:8].js',
  },
  plugins: [
    new AnalyzeWebpackPlugin({ filename: './analyze.html' }),
  ],
}
