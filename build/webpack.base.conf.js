var path = require('path');
var config = require('../config');
var isProduction = process.env.NODE_ENV === 'production';
console.log('isProduction', isProduction);

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    entry: {
        index: resolve('client/index.js')
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: config.build.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            '@': resolve('/client/components'),
            'API': resolve('/client/service/index.js')
        }
    },
    module: {
        rules: [{
            test: /.vue$/,
            loader: 'vue-loader',
            options: {
                extractCSS: isProduction
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('client')]
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'img/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'fonts/[name].[hash:7].[ext]'
            }
        }]
    }
};