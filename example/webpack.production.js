var QiniuPlugin = require('../');
var path = require('path');

var devConfig = require('./webpack.dev');

devConfig.plugins = devConfig.plugins || [];

devConfig.plugins.push(new QiniuPlugin({
  ACCESS_KEY: '',
  SECRET_KEY: '',
  bucket: 'my-qiniu-webpack'
}))

devConfig.output.publicPath = "http://7xs30h.com1.z0.glb.clouddn.com/[hash]/";

devConfig.devtool = "source-map";

module.exports = devConfig;