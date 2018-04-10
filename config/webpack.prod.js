'use strict'

const path = require('path')
const fs = require('fs')

const appDirecotory = fs.realpathSync(process.cwd())

module.exports = {
  mode: 'production',
  devtool: 'cheap-module-source-map', // https://webpack.js.org/configuration/devtool/
  entry: [
    path.resolve(appDirecotory, 'src/main.js')
  ],
  output: { // https://doc.webpack-china.org/configuration/output/
    path: path.resolve(appDirecotory, 'lib'),
    filename: 'pluginmain.js',
  },
  module: { // https://doc.webpack-china.org/configuration/module/
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(appDirecotory, 'src'),
        loader: require.resolve('babel-loader'),
      },
    ],
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  performance: {
    hints: false,
  },
};
