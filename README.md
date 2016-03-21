# qiniu-webpack-plugin
[![](https://img.shields.io/npm/v/qiniu-webpack-plugin.svg)](https://www.npmjs.com/package/qiniu-webpack-plugin)
[![](https://img.shields.io/travis/wyvernnot/qiniu-webpack-plugin.svg)](https://travis-ci.org/wyvernnot/qiniu-webpack-plugin)
[![](https://img.shields.io/coveralls/wyvernnot/qiniu-webpack-plugin.svg)](https://coveralls.io/github/wyvernnot/qiniu-webpack-plugin)
[![](https://img.shields.io/npm/dm/qiniu-webpack-plugin.svg)](http://npm-stat.com/charts.html?package=qiniu-webpack-plugin)
[![](https://img.shields.io/npm/l/qiniu-webpack-plugin.svg)](https://github.com/wyvernnot/qiniu-webpack-plugin/blob/master/LICENSE)
> 把 `Webpack` 打包出来的 `assets` 上传到 `Qiniu` 云存储上。


## 安装

```sh
npm install qiniu-webpack-plugin --save-dev
```

## 引入
```
var QiniuPlugin = require('qiniu-webpack-plugin');
```

## 配置

主要有两项

- 基本的 `ACCESS_KEY`,`SECRET_KEY`, `bucket`
- Webpack 的 `output.publicPath` 需要指向七牛云或自定义的域名地址，最后要加上 `/[hash]/`


```js
var qiniuPlugin = new QiniuPlugin({
  ACCESS_KEY: '',
  SECRET_KEY: '',
  bucket: 'my-qiniu-webpack'
});

module.exports={
 output:{
    publicPath:"http://7xs30h.com1.z0.glb.clouddn.com/[hash]/"
 },
 plugins:[
   qiniuPlugin
   ...
 ]
 ...
}
```

## 示例代码

https://github.com/wyvernnot/qiniu-webpack-plugin/tree/master/example

该例子演示了

 - React + ES6 + Bootstrap 前端项目的编译执行
 - SoureceMap 存储
 - Webfont 存储
 - 图片 存储
 - 缓存处理
 - 开发和产品环境切换

## 版权声明

`Qiniu` 是上海七牛信息技术有限公司的注册商标， `QiniuPlugin` 是我自己写的模块，并不是官方的，采用 MIT 开源协议。