var path = require('path');
var express = require('express');
var app = express();
var isDev = process.env.NODE_ENV !== 'production';
let router = require('./router');
var port;

app.use('/', router);
if (isDev) {
    let webpack = require('webpack');
    let WebpackDevMiddleware = require('webpack-dev-middleware');
    let WebpackHotMiddleware = require('webpack-hot-middleware');
    let webpackConfig = require('../build/webpack.dev.conf');
    let config = require('../config');
    let compiler = webpack(webpackConfig);
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
} else {
    app.use('/view', express.static('./view'));
    app.use('/static', express.static('./static'));
}

app.listen(port, function () {
    console.log('Listening on ' + port);
});