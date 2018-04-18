import path from 'path'
import fs from 'fs'
import mkdirp from 'mkdirp'
let cssString = fs.readFileSync(path.join(__dirname, './style.css'), 'utf8')
let jsString = fs.readFileSync(path.join(__dirname, './pluginmain.js'), 'utf8')

class AnalyzeWebpackPlugin {
  constructor(opts = { filename: 'analyze.html' }) {
    this.opts = opts
  }

  apply(compiler) {
    const self = this
    // compiler.plugin("after-resolvers", function() {
    //   console.log('1234567890')
    // })
    // compiler.plugin("after-environment", function() {
    //   console.log('12345678')
    // })
    // compiler.plugin("before-run", function() {
    //   console.log('123456')
    // })

    compiler.plugin("emit", function (compilation, callback) {
      let stats = compilation.getStats().toJson({ chunkModules: true })
      let stringifiedStats = JSON.stringify(stats)
      stringifiedStats = stringifiedStats.replace(/</g, '&lt;').replace(/>/g, '&gt;')

      let html = `<!doctype html>
          <meta charset="UTF-8">
          <title>AnalyzeWebpackPlugin</title>
          <style>${cssString}</style>
          <div id="App"></div>
          <script>window.stats = ${stringifiedStats};</script>
          <script>${jsString}</script>
      `

      compilation.assets[`${self.opts.filename}`] = {
        source: () => html,
        size: () => html.length
      }

      callback()
    })
  }
}

export default AnalyzeWebpackPlugin
