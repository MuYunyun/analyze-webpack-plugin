class AnalyzeWebpackPlugin {
  constructor(options) {}

  // 在插件函数的 prototype 上定义一个 `apply` 方法。
  apply(compiler) {
    compiler.plugin("compilation", function (compilation) {

      // 现在，设置回调来访问 compilation 中的步骤：
      compilation.plugin("optimize", function () {
        console.log("Assets are being optimized.");
      });
    });

    compiler.plugin("emit", function (compilation, callback) {
      let filelist = 'In this build:\n\n';

      // 遍历所有编译过的资源文件，
      // 对于每个文件名称，都添加一行内容。
      callback()
      for (const filename in compilation.assets) {
        filelist += ('- ' + filename + '\n');
      }

      // 将这个列表作为一个新的文件资源，插入到 webpack 构建中：
      compilation.assets['filelist.md'] = {
        source: function () {
          return filelist;
        },
        size: function () {
          return filelist.length;
        }
      };

      callback()
    });

    compiler.plugin('done', function () {
      console.log('Hello World!');
    });
  }
}

export default AnalyzeWebpackPlugin;
