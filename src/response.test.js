const response = require('./response');

const MOCK_HEADERS = {
  headers: {
    foo: 'bar'
  }
};

const MOCK_STATUS = {
  statusCode: 200
};

const MOCK_BODY = {
  body: JSON.stringify({
    hello: 'world'
  })
};

describe('response function', () => {
  it('recursively merges all objects passed as arguments', () => {
    expect(response(MOCK_HEADERS, MOCK_STATUS, MOCK_BODY)).toEqual({
      ...MOCK_HEADERS,
      ...MOCK_STATUS,
      ...MOCK_BODY
    });

    expect(response(MOCK_HEADERS)).toEqual(MOCK_HEADERS);
  })
})
