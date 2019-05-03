/* This is an auto-generated file. */

const expectationFailed = require('./expectationFailed');
const body = require('../body');
const headers = require('../headers');
const header = require('../header');
const statusCode = require('../statusCode');
const response = require('../response');

const MOCK_STATUS_CODE_RESPONSE = { statusCode: 417 };
const MOCK_HEADER_NAME = 'x-powered-by';
const MOCK_HEADER_VALUE = 'somedomain.com';
const MOCK_HEADERS = { [MOCK_HEADER_NAME]: MOCK_HEADER_VALUE };
const MOCK_BODY = { hello: 'world' };
const MOCK_RESPONSE = {
  ...MOCK_STATUS_CODE_RESPONSE,
  body: JSON.stringify(MOCK_BODY),
  headers: MOCK_HEADERS
};

describe('expectationFailed function', () => {
  it('composes with headers and body passed', () => {
    expect(
      expectationFailed(
        body(MOCK_BODY),
        headers(
          header(MOCK_HEADER_NAME, MOCK_HEADER_VALUE)
        )
    )).toEqual(MOCK_RESPONSE);
  });

  it('is equal to the functions that it composes', () => {
    expect(expectationFailed()).toEqual(response(expectationFailed()));
    expect(expectationFailed()).toEqual(response(statusCode(417)));
    expect(expectationFailed()).toEqual(response(MOCK_STATUS_CODE_RESPONSE));
    expect(expectationFailed()).toEqual(statusCode(417));
    expect(expectationFailed()).toEqual(MOCK_STATUS_CODE_RESPONSE);

    expect(expectationFailed(
      headers(header(MOCK_HEADER_NAME)(MOCK_HEADER_VALUE)),
      body(MOCK_BODY)
    )).toEqual({
      statusCode: 417,
      headers: MOCK_HEADERS,
      body: JSON.stringify(MOCK_BODY)
    });
  });
});