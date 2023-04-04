const Pdf = jest.fn();
let pdfUri = '';

Pdf.mockImplementation(props => {
  pdfUri = props.source.uri;
  return {
    source: {
      uri: pdfUri,
      cache: true,
    },
    style: props.style,
    onLoad: jest.fn(),
    onError: jest.fn(),
  };
});

export default Pdf;
