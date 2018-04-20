const uploadToken = jest.fn(() => 'mockToken')
const putFile = jest.fn((token, key, existsAt, extra, cb) => {
  process.nextTick(function() {
    // eslint-disable-next-line no-use-before-define
    if (mock.preventUpload) {
      cb(new Error('error'))
    } else {
      cb()
    }
  });
})

const mock = {
  auth: {
    digest: {
      Mac: class {}
    }
  },
  conf: {
    Config: class {}
  },
  rs: {
    PutPolicy: class {
      constructor() {
        this.uploadToken = uploadToken
      }
    }
  },
  form_up: {
    FormUploader: class {
      constructor() {
        this.putFile = putFile
      }
    },
    PutExtra: class {}
  },
  uploadToken,
  putFile,
  preventUpload: false
};

module.exports = mock;
