# qiniu-webpack-plugin
[![](https://img.shields.io/npm/v/qiniu-webpack-plugin.svg)](https://www.npmjs.com/package/qiniu-webpack-plugin)
[![](https://img.shields.io/travis/wyvernnot/qiniu-webpack-plugin.svg)](https://travis-ci.org/wyvernnot/qiniu-webpack-plugin)
[![](https://img.shields.io/coveralls/wyvernnot/qiniu-webpack-plugin.svg)](https://coveralls.io/github/wyvernnot/qiniu-webpack-plugin)
[![](https://img.shields.io/npm/dm/qiniu-webpack-plugin.svg)](http://npm-stat.com/charts.html?package=qiniu-webpack-plugin)
[![](https://img.shields.io/npm/l/qiniu-webpack-plugin.svg)](https://github.com/wyvernnot/qiniu-webpack-plugin/blob/master/LICENSE)
> 把 Webpack 打包出来的 assets 传到 七牛云存储上。


## 安装

```sh
npm install qiniu-webpack-plugin --save-dev
```

## 引入
```
var QiniuPlugin = require('qiniu-webpack-plugin');
```

## 配置

- `ACCESS_KEY`,`SECRET_KEY`, `bucket` 与七牛云设置一致
- `path` 存储的路径，默认为 `[hash]`

另外

- Webpack 的 `output.publicPath` 要指向七牛云（或自定义的）域名地址


```js

// 这里配置 Plugin
var qiniuPlugin = new QiniuPlugin({
  ACCESS_KEY: '',
  SECRET_KEY: '',
  bucket: 'my-qiniu-webpack',
  path: '[hash]'
});

// 这里是 Webpack 的配置
module.exports={
 output:{
    // 这里是七牛的域名加上 Webpack 的 hash
    publicPath:"http://7xs30h.com1.z0.glb.clouddn.com/[hash]/"
    // ..
 },
 plugins:[
   qiniuPlugin
   // ...
 ]
 // ...
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

`Qiniu` 是上海七牛信息技术有限公司的注册商标， `qiniu-webpack-plugin` 是本人自己写的模块，非官方，采用 MIT 开源协议发布。