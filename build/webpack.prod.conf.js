var path = require('path');
var webpack = require('webpack');
var config = require('../config');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var htmlplugins = [];
let entryKeys = Object.keys(baseWebpackConfig.entry)
entryKeys.forEach(function (name) {
    // https://github.com/ampedandwired/html-webpack-plugin
    var htmlplugin = new HtmlWebpackPlugin({
        filename: config.build.html + '/' + name + '.html',
        template: './client/index.html',
        chunks: ['common', name],
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
    });
    htmlplugins.push(htmlplugin);
});
let commeChunk;
if (entryKeys.length > 1) {
    commeChunk = new webpack.optimize.CommonsChunkPlugin('common');
} else {
    // split vendor js into its own file
    commeChunk = new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: function (module, count) {
            // console.log(module.resource);
            // any required modules inside node_modules are extracted to vendor
            return (
                module.resource &&
                /\.js$/.test(module.resource) &&
                module.resource.indexOf(
                    path.join(__dirname, '../node_modules')
                ) === 0
            );
        }
    });
}

let prodWebpackConfig = merge(baseWebpackConfig, {
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: config.build.assetsSubDirectory + '/js/[name].[chunkhash].js',
        chunkFilename: config.build.assetsSubDirectory + '/js/[id].[chunkhash].js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        commeChunk,
        new ExtractTextPlugin({
            filename: config.build.assetsSubDirectory + '/css/[name].[contenthash].css'
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: config.build.assetsRoot + '/' + config.build.assetsSubDirectory,
            ignore: ['.*']
        }])
    ].concat(htmlplugins)
});

module.exports = prodWebpackConfig;