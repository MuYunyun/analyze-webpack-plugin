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
npm install --save-dev analyze-webpack-plugin
```

<h2 align="center">Usage</h2>

### Site Usage

Upload your stats JSON file to [this site](http://muyunyun.cn/analyze-webpack-plugin/)

### Plugin Usage

```js
const AnalyzeWebpackPlugin = require('analyze-webpack-plugin').default

module.exports = {
  plugins: [
    new AnalyzeWebpackPlugin(), // 默认生成 analyze.html
    // 也可以 new AnalyzeWebpackPlugin({ name: 'analyze.html' }) 也可以指定自定义文件
  ],
}
```

### Tech Stack

该插件 fork 自 [webpack-visualizer](https://github.com/chrisbateman/webpack-visualizer/blob/master/package.json)，目前扩展出的功能如下：

- [x] webpack 3.x/4.x 的插件

- [x] 升级插件的技术栈，比如升级 d3 到 v4 版本

- [ ] 实现点击依赖能进入更深一级的效果

- [ ] 考虑向后兼容