'use strict'

const path = require('path')
const fs = require('fs')

const appDirecotory = fs.realpathSync(process.cwd())

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map', // https://webpack.js.org/configuration/devtool/
  entry: [
    path.resolve(appDirecotory, 'src/site/main')
  ],
  output: { // https://doc.webpack-china.org/configuration/output/
    pathinfo: true, // 告诉 webpack 在 bundle 中引入「所包含模块信息」的相关注释，开发环境用
    filename: 'build.js', // 这不是真实的文件，其仅仅是在开发环境下由 WebpackDevServer 提供的一个虚拟路径
  },
  module: { // https://doc.webpack-china.org/configuration/module/
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            include: path.resolve(appDirecotory, 'src'),
            loader: require.resolve('babel-loader'),
          }
        ],
      },
    ],
  },
  devServer: { // 开发模式使用
    inline: true, // https://doc.webpack-china.org/configuration/dev-server/#devserver-inline
    contentBase: 'dist-site',
    host: process.env.IP,
    port: process.env.PORT
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