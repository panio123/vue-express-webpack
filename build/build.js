process.env.NODE_ENV = 'production';
var rm = require('rimraf');
var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('./webpack.prod.conf');
var config = require('../config/index');
console.log('Build start...');
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), (err) => {
  if (err) throw err;
  rm(config.build.html, err => {
    if (err) throw err;
    webpack(webpackConfig, function (err, stats) {
      if (err) throw err;
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n');

      console.log('  Build complete.\n');
      console.log(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      );
    });
  });
});