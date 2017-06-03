var path = require('path');
var express = require('express');
var app = express();
var isDev = process.env.NODE_ENV !== 'production';
var port;

if (isDev) {
    var webpack = require('webpack');
    var WebpackDevMiddleware = require('webpack-dev-middleware');
    var WebpackHotMiddleware = require('webpack-hot-middleware');
    var webpackConfig = require('./build/webpack.dev.conf');
    var config = require('./config');
    var compiler = webpack(webpackConfig);
    port = config.dev.port;
    app.use(WebpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        }
    }));
    app.use(WebpackHotMiddleware(compiler, {
        log: console.log
    }));
    app.use('/static', express.static('./static'));
    app.use('/view', express.static('./server/view'));
    app.use('/static', express.static('./server/static'));
} else {}

app.listen(port, function () {
    console.log('Listening on ' + port);
});