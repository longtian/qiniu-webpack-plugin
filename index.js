var qiniu = require("qiniu");
//要上传的空间
var bucket = 'my-qiniu-webpack';

//需要填写你的 Access Key 和 Secret Key


var QiniuPlugin = function(options){
    this.options= Object.assign({},options);
    qiniu.conf.ACCESS_KEY = this.options.ACCESS_KEY;
    qiniu.conf.SECRET_KEY = this.options.SECRET_KEY;
}

QiniuPlugin.prototype.apply=function(compiler){
    var options = this.options;
    
    compiler.plugin('after-emit',function(compilation){
        var assets = compilation.assets;
        var hash = compilation.hash;

        Object.keys(assets).forEach(function(fileName){

            var key = hash + '/'+ fileName;
            var putPolicy = new qiniu.rs.PutPolicy(options.bucket+":"+key);
            var token = putPolicy.token();
            var extra = new qiniu.io.PutExtra();

            qiniu.io.putFile(token, key, assets[fileName].existsAt, extra, function(err, ret) {
                if(!err) {
                    // 上传成功， 处理返回值
                    console.log(ret.hash, ret.key);
                } else {
                    // 上传失败， 处理返回代码
                    console.log(err);
                }
            });
            
        })
    });
}


module.exports=QiniuPlugin;

