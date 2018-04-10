'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cssString = _fs2.default.readFileSync(_path2.default.join(__dirname, './shared/style.css'), 'utf8');
var jsString = _fs2.default.readFileSync(_path2.default.join(__dirname, './main.js'), 'utf8');

var AnalyzeWebpackPlugin = function () {
  function AnalyzeWebpackPlugin() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { filename: 'analyze.html' };

    _classCallCheck(this, AnalyzeWebpackPlugin);

    this.opts = opts;
  }

  _createClass(AnalyzeWebpackPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var self = this;
      compiler.plugin("emit", function (compilation, callback) {
        var stats = compilation.getStats().toJson({ chunkModules: true });
        var stringifiedStats = JSON.stringify(stats);
        stringifiedStats = stringifiedStats.replace(/</g, '&lt;').replace(/</g, '&gt;');

        var html = '<!doctype html>\n          <meta charset="UTF-8">\n          <title>AnalyzeWebpackPlugin</title>\n          <style>' + cssString + '</style>\n          <div id="App"></div>\n          <script>window.stats = ' + stringifiedStats + ';</script>\n          <script>' + jsString + '</script>\n      ';

        var outputFile = _path2.default.join(compilation.outputOptions.path, self.opts.filename);

        (0, _mkdirp2.default)(_path2.default.dirname(outputFile), function (mkdirpErr) {
          if (mkdirpErr) {
            console.log('webpack-visualizer-plugin: error writing stats file');
          }

          _fs2.default.writeFile(outputFile, html, function (err) {
            if (err) {
              console.log('webpack-visualizer-plugin: error writing stats file');
            }

            callback();
          });
        });
      });
    }
  }]);

  return AnalyzeWebpackPlugin;
}();

exports.default = AnalyzeWebpackPlugin;
