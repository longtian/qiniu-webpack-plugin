import qiniu from 'qiniu';
import Promise from 'promise';
import { join } from 'path';
import slash from 'slash';

class QiniuPlugin {

  constructor(options) {
    if (!options || !options.ACCESS_KEY || !options.SECRET_KEY) {
      throw new Error('ACCESS_KEY and SECRET_KEY must be provided');
    }
    this.options = Object.assign({}, options);

    const mac = new qiniu.auth.digest.Mac(this.options.ACCESS_KEY, this.options.SECRET_KEY);
    const putPolicy = new qiniu.rs.PutPolicy({ scope: this.options.bucket });
    this.token = putPolicy.uploadToken(mac);

    const config = new qiniu.conf.Config();
    // 空间对应的机房 https://developer.qiniu.com/kodo/sdk/1289/nodejs#5
    // config.zone = qiniu.zone.Zone_z0;
    // 是否使用https域名
    // config.useHttpsDomain = true;
    // 上传是否使用cdn加速
    // config.useCdnDomain = true;
    this.uploader = new qiniu.form_up.FormUploader(config);
  }

  apply(compiler) {
    compiler.plugin('after-emit', (compilation, callback) => {
      const assets = compilation.assets;
      const hash = compilation.hash;
      const {
        include,
      } = this.options;
      let {
        path = '[hash]',
      } = this.options;

      path = path.replace('[hash]', hash);

      const promises = Object.keys(assets).filter((fileName) => {
        let valid = assets[fileName].emitted;
        if (include) {
          valid = valid
            && include.some(
              (includeFileName) => {
                if (includeFileName instanceof RegExp) {
                  return includeFileName.test(fileName);
                }
                return includeFileName === fileName;
              },
            );
        }
        return valid;
      }).map((fileName) => {
        const key = slash(join(path, fileName));
        const extra = new qiniu.form_up.PutExtra();

        const promise = new Promise((resolve, reject) => {
          const begin = Date.now();
          // http://developer.qiniu.com/code/v6/sdk/nodejs.html#5
          this.uploader.putFile(this.token, key, assets[fileName].existsAt, extra, (err, ret) => {
            if (!err) {
              resolve({
                ...ret,
                duration: Date.now() - begin,
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
        .then((res) => {
          console.log(res); // eslint-disable-line no-console
          callback();
        })
        .catch((e) => {
          callback(e);
        });
    });
  }
}

export default QiniuPlugin;
