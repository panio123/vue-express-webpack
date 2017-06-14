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

function resolveStaticPath(dirname) {
    let pre = isDev ? './server' : './';
    return path.join(pre, dirname);
}

app.use('/example', express.static(resolveStaticPath('/example')));
app.use('/upload', express.static(resolveStaticPath('/upload')));
app.use('/static', express.static('./static'));


console.log('isDev', isDev);
if (isDev) {
    let webpack = require('webpack');
    let WebpackDevMiddleware = require('webpack-dev-middleware');
    let WebpackHotMiddleware = require('webpack-hot-middleware');
    let history = require('connect-history-api-fallback');
    let webpackConfig = require('../build/webpack.dev.conf');
    let config = require('../config');
    let compiler = webpack(webpackConfig);
    port = config.dev.port || process.env.NODE_ENV.PORT;
    app.use(history());
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
    port = process.env.PORT;
    app.use(express.static('./view'));
}

app.use('/', router);

console.log('port', port);
app.listen(port, function () {
    console.log('Listening on ' + port);
});