const Share = jest.fn();

Share.mockImplementation(() => {
  return {
    shareSingle: jest.fn(options => {}),
    open: jest.fn(options => {}),
  };
});

export default Share;
