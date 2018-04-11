import React from 'react';


export default props => (
  <footer>
    {props.children}

    <h2>Disclaimer</h2>
    <p>Due to limitations in Webpack's stats, the "actual" (minified) numbers reported here are approximate, but they should be pretty close.</p>

    <h2>Contribute!</h2>
    <p>Check it out on <a href="https://github.com/MuYunyun/analyze-webpack-plugin">GitHub</a>, and please <a href="https://github.com/MuYunyun/analyze-webpack-plugin/issues">report issues or request features</a>!</p>

    <h2>Acknowledgements</h2>
    <p><a href="https://github.com/chrisbateman/webpack-visualizer">Disc</a> for Browserify did this first. Thanks also to <a href="https://gist.github.com/kerryrodden/7090426">this example</a> from the D3 gallery for demonstating how to create sunburst charts.</p>
  </footer>
);