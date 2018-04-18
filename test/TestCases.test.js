// const fs = require('fs')
// const webpack = require('webpack')
// const path = require('path')

// describe('TestCases', () => {
//   const casesDirectory = path.resolve(__dirname, 'cases');
//   const outputDirectory = path.resolve(__dirname, 'js');
//   for (const directory of fs.readdirSync(casesDirectory)) {
//     if (!/^(\.|_)/.test(directory)) {
//       it(`${directory} should compile to the expected result`, (done) => {
//         const directoryForCase = path.resolve(casesDirectory, directory);
//         const outputDirectoryForCase = path.resolve(outputDirectory, directory);
//         const webpackConfig = require(path.resolve(directoryForCase, 'webpack.config.js'));
//         Object.assign(webpackConfig, {
//           mode: 'none',
//           context: directoryForCase,
//         });
//         webpack(webpackConfig, (err, stats) => {
//           if (err) {
//             done(err);
//             return;
//           }
//           done();
//         });
//       }, 10000);
//     }
//   }
// });

const fs = require('fs')
const webpack = require('webpack')
const path = require('path')

  const casesDirectory = path.resolve(__dirname, 'cases');
  const outputDirectory = path.resolve(__dirname, 'js');
  for (const directory of fs.readdirSync(casesDirectory)) {
    if (!/^(\.|_)/.test(directory)) {
      // eslint-disable-next-line no-loop-func
      // it(`${directory} should compile to the expected result`, (done) => {
        const directoryForCase = path.resolve(casesDirectory, directory);
        const outputDirectoryForCase = path.resolve(outputDirectory, directory);
        const webpackConfig = require(path.resolve(directoryForCase, 'webpack.config.js'));
        Object.assign(webpackConfig, {
          mode: 'none',
          context: directoryForCase,
        });
        webpack(webpackConfig, (err, stats) => {
          if (err) {
            return;
          }
          console.log('12345')
        });
    }
  }
