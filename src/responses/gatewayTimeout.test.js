/* This is an auto-generated file. */

const gatewayTimeout = require('./gatewayTimeout');
const body = require('../body');
const headers = require('../headers');
const header = require('../header');
const statusCode = require('../statusCode');
const response = require('../response');

const MOCK_STATUS_CODE_RESPONSE = { statusCode: 504 };
const MOCK_HEADER_NAME = 'x-powered-by';
const MOCK_HEADER_VALUE = 'somedomain.com';
const MOCK_HEADERS = { [MOCK_HEADER_NAME]: MOCK_HEADER_VALUE };
const MOCK_BODY = { hello: 'world' };
const MOCK_RESPONSE = {
  ...MOCK_STATUS_CODE_RESPONSE,
  body: JSON.stringify(MOCK_BODY),
  headers: MOCK_HEADERS
};

describe('gatewayTimeout function', () => {
  it('composes with headers and body passed', () => {
    expect(
      gatewayTimeout(
        body(MOCK_BODY),
        headers(
          header(MOCK_HEADER_NAME, MOCK_HEADER_VALUE)
        )
    )).toEqual(MOCK_RESPONSE);
  });

  it('is equal to the functions that it composes', () => {
    expect(gatewayTimeout()).toEqual(response(gatewayTimeout()));
    expect(gatewayTimeout()).toEqual(response(statusCode(504)));
    expect(gatewayTimeout()).toEqual(response(MOCK_STATUS_CODE_RESPONSE));
    expect(gatewayTimeout()).toEqual(statusCode(504));
    expect(gatewayTimeout()).toEqual(MOCK_STATUS_CODE_RESPONSE);

    expect(gatewayTimeout(
      headers(header(MOCK_HEADER_NAME)(MOCK_HEADER_VALUE)),
      body(MOCK_BODY)
    )).toEqual({
      statusCode: 504,
      headers: MOCK_HEADERS,
      body: JSON.stringify(MOCK_BODY)
    });
  });
});