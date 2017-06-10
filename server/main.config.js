//更多pm2配置项请参考：http://pm2.keymetrics.io/docs/usage/application-declaration/#process-file
module.exports = {
    "name": "my-vue-express-app",
    "script": __dirname + "/app.js",
    "autorestart": false,
    "watch": ["server"],
    "ignore_watch": ["node_modules", "client", "static"],
    "env": { //生产环境配置
        "NODE_ENV": "production",
        "PORT": 80
    },
    "env_dev": { //开发环境配置
        "NODE_ENV": "development",
        "REMOTE_ADDR": "http://localhost:8080",
        "PORT": 8080
    }
};