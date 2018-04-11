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
    compiler.plugin("emit", function (compilation, callback) {
      let stats = compilation.getStats().toJson({ chunkModules: true })
      let stringifiedStats = JSON.stringify(stats)
      stringifiedStats = stringifiedStats.replace(/</g, '&lt;').replace(/</g, '&gt;')

      let html = `<!doctype html>
          <meta charset="UTF-8">
          <title>AnalyzeWebpackPlugin</title>
          <style>${cssString}</style>
          <div id="App"></div>
          <script>window.stats = ${stringifiedStats};</script>
          <script>${jsString}</script>
      `

      // let outputFile = path.join(compilation.outputOptions.path, self.opts.filename)

      // mkdirp(path.dirname(outputFile), (mkdirpErr) => {
      //   fs.writeFile(outputFile, html, (err) => {
      //     if (err) {
      //       console.log('webpack-visualizer-plugin: error writing stats file')
      //     }
      //     callback()
      //   })
      // })

      compilation.assets[`${self.opts.filename}`] = {
        source: () => html,
        size: () => html.length
      }

      callback()
    })
  }
}

export default AnalyzeWebpackPlugin
