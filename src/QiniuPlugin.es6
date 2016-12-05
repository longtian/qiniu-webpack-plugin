import qiniu from 'qiniu';
import Promise from 'promise';
import {join} from 'path';

class QiniuPlugin {
  constructor(options) {
    this.options = Object.assign({}, options);
    qiniu.conf.ACCESS_KEY = this.options.ACCESS_KEY;
    qiniu.conf.SECRET_KEY = this.options.SECRET_KEY;
  }
  
  apply(compiler) {
    
    compiler.plugin('after-emit', (compilation, callback)=> {
      
      let assets = compilation.assets;
      let hash = compilation.hash;
      let {
        bucket,
        path = "[hash]",
        include,
      } = this.options;
      
      path = path.replace("[hash]", hash);
      
      let promises = Object.keys(assets).filter(fileName=> {
        let valid = assets[fileName].emitted;
        if (include) {
          valid = valid && include.some(includeFileName => {
              if (includeFileName instanceof RegExp) {
                return includeFileName.test(fileName);
              } else {
                return includeFileName == fileName
              }
            });
        }
        return valid;
      }).map(fileName=> {
        let key = join(path, fileName);
        let putPolicy = new qiniu.rs.PutPolicy(`${bucket}:${key}`);
        let token = putPolicy.token();
        let extra = new qiniu.io.PutExtra();
        
        let promise = new Promise((resolve, reject)=> {
          let begin = Date.now();
          qiniu.io.putFile(token, key, assets[fileName].existsAt, extra, function (err, ret) {
            if (!err) {
              resolve({
                ...ret,
                duration: Date.now() - begin
              });
            } else {
              reject(err);
            }
          });
        });
        
        return promise;
      });
      
      Promise
        .all(promises)
        .then(res=> {
          console.log(res);
          callback();
        })
        .catch(e=> {
          callback(e);
        });
      
    });
  }
}

export default QiniuPlugin;
