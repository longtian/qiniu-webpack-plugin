const uploadToken = jest.fn(() => 'mockToken')
const putFile = jest.fn((token, key, existsAt, extra, cb) => {
  process.nextTick(cb());
})

module.exports = {
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
  putFile
};
