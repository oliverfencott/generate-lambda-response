const headers = require('./headers');

const MOCK_LOCATION_HEADER = { Location: 'somedomain.com' };
const MOCK_CONTENT_TYPE_HEADER = { accepts: 'application/json' };

const MOCK_EXPECTED_OUTPUT = {
  headers: {
    ...MOCK_LOCATION_HEADER,
    ...MOCK_CONTENT_TYPE_HEADER
  }
};

describe('headers function', () => {
  describe('called with multiple headers', () => {
    it('returns an object with all headers merged', () => {
      expect(headers(
        MOCK_LOCATION_HEADER,
        MOCK_CONTENT_TYPE_HEADER
      )).toEqual(MOCK_EXPECTED_OUTPUT)
    });
  })
})
