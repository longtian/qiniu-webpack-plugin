import QiniuPlugin from '../QiniuPlugin';

describe('QiniuPlugin', () => {
  describe('constructor', () => {
    it('will throw if no parameter is provided', () => {
      expect(() => {
        new QiniuPlugin(); // eslint-disable-line no-new
      }).toThrow();
    });

    it('will set qiniu global options', () => {
      const qiniu = require('qiniu'); // eslint-disable-line global-require
      new QiniuPlugin({ ACCESS_KEY: 'a', SECRET_KEY: 's' }); // eslint-disable-line no-new
      expect(qiniu.conf).toEqual({ ACCESS_KEY: 'a', SECRET_KEY: 's' });
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
