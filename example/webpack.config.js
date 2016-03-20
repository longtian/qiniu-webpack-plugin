var QiniuPlugin  = require('../');
var path  = require('path');

module.exports={
    entry:'./app/index.js',
    output:{
        filename:'[name].js',
        path:path.join(__dirname,'public'),
        publicPath:"http://7xs30h.com1.z0.glb.clouddn.com/[hash]/"
    },
    plugins:[
        new QiniuPlugin({
            ACCESS_KEY: '',
            SECRET_KEY: '',
            bucket:'my-qiniu-webpack'
        })
    ]
}