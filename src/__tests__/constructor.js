import QiniuPlugin from '../QiniuPlugin';

describe('QiniuPlugin', () => {
  describe('constructor', () => {
    it('will throw if no parameter is provided', () => {
      expect(() => {
        new QiniuPlugin(); // eslint-disable-line no-new
      }).toThrow();
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
