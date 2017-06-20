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
    readFileFromMemory = function (filepath, req, res, next) {
        compiler.outputFileSystem.readFile(filepath, function (err, result) {
            if (err) {
                // something error
                return next();
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });
    };

    app.use('/static', express.static('./static'));
    Object.keys(webpackConfig.entry).forEach((entry) => {
        app.get('/' + entry, function (req, res, next) {
            var viewname = entry + '.html';
            var filepath = path.join(compiler.outputPath, viewname);
            console.log(compiler.outputPath, filepath);
            // 使用webpack提供的outputFileSystem
            readFileFromMemory(filepath, req, res, next);
        });
    });
} else {
    port = process.env.PORT;
    app.use('/static', express.static('./static', {
        maxAge: 31557600000
    }));
    app.use(express.static('./view'));
}

app.use('/', router);

console.log('port', port);
app.listen(port, function () {
    console.log('Listening on ' + port);
});