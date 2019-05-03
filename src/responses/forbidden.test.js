/* This is an auto-generated file. */

const forbidden = require('./forbidden');
const body = require('../body');
const headers = require('../headers');
const header = require('../header');
const statusCode = require('../statusCode');
const response = require('../response');

const MOCK_STATUS_CODE_RESPONSE = { statusCode: 403 };
const MOCK_HEADER_NAME = 'x-powered-by';
const MOCK_HEADER_VALUE = 'somedomain.com';
const MOCK_HEADERS = { [MOCK_HEADER_NAME]: MOCK_HEADER_VALUE };
const MOCK_BODY = { hello: 'world' };
const MOCK_RESPONSE = {
  ...MOCK_STATUS_CODE_RESPONSE,
  body: JSON.stringify(MOCK_BODY),
  headers: MOCK_HEADERS
};

describe('forbidden function', () => {
  it('composes with headers and body passed', () => {
    expect(
      forbidden(
        body(MOCK_BODY),
        headers(
          header(MOCK_HEADER_NAME, MOCK_HEADER_VALUE)
        )
    )).toEqual(MOCK_RESPONSE);
  });

  it('is equal to the functions that it composes', () => {
    expect(forbidden()).toEqual(response(forbidden()));
    expect(forbidden()).toEqual(response(statusCode(403)));
    expect(forbidden()).toEqual(response(MOCK_STATUS_CODE_RESPONSE));
    expect(forbidden()).toEqual(statusCode(403));
    expect(forbidden()).toEqual(MOCK_STATUS_CODE_RESPONSE);

    expect(forbidden(
      headers(header(MOCK_HEADER_NAME)(MOCK_HEADER_VALUE)),
      body(MOCK_BODY)
    )).toEqual({
      statusCode: 403,
      headers: MOCK_HEADERS,
      body: JSON.stringify(MOCK_BODY)
    });
  });
});