var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var isDev = process.env.NODE_ENV !== 'production';
let router = require('./router');
var port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/', router);

function resolveStaticPath(dirname) {
    let pre = isDev ? './server' : '/';
    return path.join(pre, dirname);
}

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
} else {
    port = process.env.NODE_ENV.PORT;
}
app.use('/upload', express.static(resolveStaticPath('/upload')));

app.use('/static', express.static('./static'));

app.listen(port, function () {
    console.log('Listening on ' + port);
});