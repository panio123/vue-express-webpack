var path = require('path');
module.exports = {
    dev: {
        port: 8080,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
    },
    build: {
        html: path.resolve(__dirname, '../server/view/'),
        assetsRoot: path.resolve(__dirname, '../server/'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap:true
    }
};