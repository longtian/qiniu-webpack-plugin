import QiniuPlugin from '../QiniuPlugin';

describe('handler', () => {
  let handler = null;

  describe('withOut filter', () => {
    /**
     * 在每个测试之前重置 handler
     */
    beforeEach(() => {
      const plugin = new QiniuPlugin({
        ACCESS_KEY: 'a',
        SECRET_KEY: 's',
        bucket: 'b'
      });
      const compiler = {
        plugin: (event, cb) => {
          handler = cb;
        }
      };
      plugin.apply(compiler);
    });

    it('without filter', (done) => {
      const qiniu = require('qiniu'); // eslint-disable-line global-require
      handler({
        assets: {
          a: {
            emitted: true,
            existsAt: 'mockExistsAt'
          },
          b: {
            emitted: true,
            existsAt: 'mockExistsAt'
          }
        },
        hash: 'mockHash'
      }, done);
      expect(qiniu.io.putFile).toHaveBeenCalledTimes(2);
      expect(qiniu.io.putFile.mock.calls[0].slice(0, 3))
        .toEqual(['mockToken', 'mockHash/a', 'mockExistsAt']);
      expect(qiniu.io.putFile.mock.calls[1].slice(0, 3))
        .toEqual(['mockToken', 'mockHash/b', 'mockExistsAt']);
    });
  });

  describe('with string and regex filter', () => {
    /**
     * 在每个测试之前重置 handler
     */
    beforeEach(() => {
      const plugin = new QiniuPlugin({
        ACCESS_KEY: 'a',
        SECRET_KEY: 's',
        bucket: 'mockBucket',
        path: '[hash]',
        log: jest.fn(),
        include: [
          'a',
          /^c$/
        ]
      });
      const compiler = {
        plugin: (event, cb) => {
          handler = cb;
        }
      };
      plugin.apply(compiler);
    });

    it('with filter', (done) => {
      const qiniu = require('qiniu'); // eslint-disable-line global-require
      qiniu.io.putFile.mockClear();
      qiniu.rs.PutPolicy.mockClear();
      handler({
        assets: {
          a: {
            emitted: true,
            existsAt: 'mockExistsAt'
          },
          b: {
            emitted: true,
            existsAt: 'mockExistsAt'
          },
          c: {
            emitted: true,
            existsAt: 'mockExistsAt'
          }
        },
        hash: 'mockHash'
      }, done);

      expect(qiniu.rs.PutPolicy).toHaveBeenCalledTimes(2);
      expect(qiniu.rs.PutPolicy.mock.calls)
        .toEqual([['mockBucket:mockHash/a'], ['mockBucket:mockHash/c']]);

      expect(qiniu.io.putFile).toHaveBeenCalledTimes(2);
      expect(qiniu.io.putFile.mock.calls[0].slice(0, 3))
        .toEqual(['mockToken', 'mockHash/a', 'mockExistsAt']);
      expect(qiniu.io.putFile.mock.calls[1].slice(0, 3))
        .toEqual(['mockToken', 'mockHash/c', 'mockExistsAt']);
    });
  });

  describe('error', () => {
    /**
     * 在每个测试之前重置 handler
     */
    beforeEach(() => {
      const plugin = new QiniuPlugin({
        ACCESS_KEY: 'a',
        SECRET_KEY: 's',
        bucket: 'mockBucket'
      });
      const compiler = {
        plugin: (event, cb) => {
          handler = cb;
        }
      };
      plugin.apply(compiler);
    });

    it('when put file', (done) => {
      const qiniu = require('qiniu'); // eslint-disable-line global-require
      qiniu.io.putFile.mockClear();
      qiniu.io.putFile = jest.fn((...args) => {
        args[args.length - 1](new Error('error'));
      });
      qiniu.rs.PutPolicy.mockClear();
      handler({
        assets: {
          a: {
            emitted: true,
            existsAt: 'mockExistsAt'
          }
        },
        hash: 'mockHash'
      }, (error) => {
        expect(error);
        done();
      });
    });
  });

  describe('#3 empty path', () => {
    /**
     * 在每个测试之前重置 handler
     */
    beforeEach(() => {
      const plugin = new QiniuPlugin({
        ACCESS_KEY: 'a',
        SECRET_KEY: 's',
        bucket: 'b',
        path: ''
      });
      const compiler = {
        plugin: (event, cb) => {
          handler = cb;
        }
      };
      plugin.apply(compiler);
    });

    it('without filter', (done) => {
      const qiniu = require('qiniu'); // eslint-disable-line global-require
      qiniu.io.putFile.mockClear();
      handler({
        assets: {
          a: {
            emitted: true,
            existsAt: 'mockExistsAt'
          },
          'index.html': {
            emitted: true,
            existsAt: 'mockExistsAt'
          }
        },
        hash: 'mockHash'
      }, done);
      expect(qiniu.io.putFile).toHaveBeenCalledTimes(2);
      expect(qiniu.io.putFile.mock.calls[0].slice(0, 3))
        .toEqual(['mockToken', 'a', 'mockExistsAt']);
      expect(qiniu.io.putFile.mock.calls[1].slice(0, 3))
        .toEqual(['mockToken', 'index.html', 'mockExistsAt']);
    });
  });
});
