const { response, statusCode, body, header, headers } = require('./index');

const MOCK_STATUS_CODE = 200;
const MOCK_BODY = { hello: 'world' };
const MOCK_HEADER_NAME_A = 'x-powered-by';
const MOCK_HEADER_VALUE_A = 'somedomain.com';
const MOCK_HEADER_NAME_B = 'some-foobar-header';
const MOCK_HEADER_VALUE_B = 'check it out';
const MOCK_HEADERS = {
  [ MOCK_HEADER_NAME_A ]: MOCK_HEADER_VALUE_A,
  [ MOCK_HEADER_NAME_B ]: MOCK_HEADER_VALUE_B,
};

const MOCK_EXPECTED_OUTPUT = {
  statusCode: MOCK_STATUS_CODE,
  body: JSON.stringify(MOCK_BODY),
  headers: MOCK_HEADERS
};

describe('entire library', () => {
  it('composes when combined', () => {
    expect(
      response(
        statusCode(MOCK_STATUS_CODE),
        body(MOCK_BODY),
        headers(
          header(MOCK_HEADER_NAME_A, MOCK_HEADER_VALUE_A),
          header(MOCK_HEADER_NAME_B, MOCK_HEADER_VALUE_B),
        )
      )
    ).toEqual(MOCK_EXPECTED_OUTPUT)
  });
})
