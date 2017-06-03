var webpack = require('webpack');
var config = require('../config');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var htmlplugins = [];
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(baseWebpackConfig.entry[name]);
    var htmlplugin = new HtmlWebpackPlugin({
        filename: name + '.html',
        template: './client/index.html',
        chunks: [name],
        inject: true
    });
    htmlplugins.push(htmlplugin);
});

module.exports = merge(baseWebpackConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
        rules: [{
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ].concat(htmlplugins)
});