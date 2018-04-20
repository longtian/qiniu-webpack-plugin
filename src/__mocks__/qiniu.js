const uploadToken = jest.fn(() => 'mockToken')
const putFile = jest.fn((token, key, existsAt, extra, cb) => {
  process.nextTick(cb());
})

module.exports = {
  auth: {
    digest: {
      Mac: jest.fn(() => 'mockMac')
    }
  },
  conf: {
    Config: jest.fn(() => 'mockConfig')
  },
  rs: {
    PutPolicy: jest.fn(() => (
      {
        uploadToken: uploadToken
      }
    ))
  },
  form_up: {
    FormUploader: () => (
      {
        putFile: putFile
      }
    ),
    PutExtra: jest.fn(() => 'mockExtra'),
  },
  uploadToken,
  putFile
};
