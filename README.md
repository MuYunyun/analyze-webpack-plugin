<div align="center">
  <a href="https://webpack.js.org/">
    <img width="200" height="200" vspace="" hspace="25" src="https://cdn.rawgit.com/webpack/media/e7485eb2/logo/icon-square-big.svg">
  </a>
  <h1>analyze-webpack-plugin</h1>
  <p>desc</p>
</div>

analyze-webpack-plugin is to help analyze some useful dates so that we can optimize our programme.

<h2 align="center">Install</h2>

```bash
npm install --save-dev analyze-webpack-plugin || yarn add --dev analyze-webpack-plugin
```

<h2 align="center">Usage</h2>

### Configuration

**webpack.config.js**

```js
const AnalyzeWebpackPlugin = require('analyze-webpack-plugin')

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash:8].js',
  },
  module: {},
  plugins: [
    new AnalyzeWebpackPlugin({}),
  ],
}
```