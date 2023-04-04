const RNFetchBlob = {
  fs: {
    dirs: {
      DownloadDir: '/mock/download/dir',
    },
    writeFile: jest.fn(),
  },
};

RNFetchBlob.fs.writeFile.mockImplementation((filePath, file, encoding) => {
  console.log(
    'Mocked RNFetchBlob.fs.writeFile called with filePath',
    filePath,
    'file',
    file,
    'encoding',
    encoding,
  );
  return new Promise((resolve, reject) => {
    if (filePath && file) {
      resolve('success');
    } else {
      reject('error');
    }
  });
});

export default RNFetchBlob;
