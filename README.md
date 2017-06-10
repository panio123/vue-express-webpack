# vue+express webpack项目模版

## 简介
正如项目名称，这是一个vue+express的全栈开发项目，作者目前正在使用它开发自己的博客中，作者博客：[http://liu-pan-cc](http://liu-pan-cc)。

### 开使用之前，强烈建议您全局安装pm2
pm2简单好用node程序托管插件，在此不多作介绍，附上官网地址：[http://pm2.keymetrics.io/](http://pm2.keymetrics.io/)。

## 项目目录
`client`前端代码
`server`服务端代码
`static`前端静态资源

## 开始
- 克隆项目到本地
- 初始化项目
``` bash
#安装依赖
npm install
```
- 使用pm2启动-需要全局安装pm2
``` bash
#启动本地服务器，对前端代码可热更新，对服务端代码变更，会重启服务器。
npm run start

#重启服务器
npm run restart

#查看服务器运行日志和前端热更新进度
npm run logs
```
- 打包代码
``` bash
#打包后的文件直接输出到 server 中
npm run build
```

- 上线
上线项目，只需要将server内的东西上传至服务器，然后使用pm2启动即可。

- 不用pm2启动-服务端代码修改后，无法自动重启使代码立即生效。
``` bash
#不建议使用这种方式
npm run dev
```


## 最后
此模版为作者参考vue-cli手工搭建，鉴于作者水平有限，且webpack和实际需求十分复杂多变，难免会有这样那样的bug，十分欢迎大家提出指正。