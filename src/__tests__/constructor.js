import QiniuPlugin from '../QiniuPlugin';

describe('QiniuPlugin', () => {
  describe('constructor', () => {
    it('will throw if no parameter is provided', () => {
      expect(() => {
        new QiniuPlugin(); // eslint-disable-line no-new
      }).toThrow();
    });

    it('will set members', () => {
      const qiniu = require('qiniu'); // eslint-disable-line global-require
      qiniu.uploadToken.mockClear();
      const plugin = new QiniuPlugin({ ACCESS_KEY: 'a', SECRET_KEY: 's' }); // eslint-disable-line no-new
      expect(qiniu.uploadToken).toHaveBeenCalledTimes(1);
      expect(qiniu.uploadToken.mock.calls[0][0])
        .toBeInstanceOf(qiniu.auth.digest.Mac);
      expect(plugin.token).toEqual('mockToken');
    });
  });

  it('will call plugin method when applied', () => {
    const plugin = new QiniuPlugin({ ACCESS_KEY: 'a', SECRET_KEY: 's' });
    const compiler = {
      plugin: jest.fn()
    };
    plugin.apply(compiler); // webpack will do this
    expect(compiler.plugin).toBeCalled();
    expect(compiler.plugin.mock.calls[0][0]).toEqual('after-emit');
  });
});
