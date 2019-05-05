/* This is an auto-generated file. */

const locked = require('./locked');
const body = require('../body');
const headers = require('../headers');
const header = require('../header');
const statusCode = require('../statusCode');
const response = require('../response');

const MOCK_STATUS_CODE_RESPONSE = { statusCode: 423 };
const MOCK_HEADER_NAME = 'x-powered-by';
const MOCK_HEADER_VALUE = 'somedomain.com';
const MOCK_HEADERS = { [MOCK_HEADER_NAME]: MOCK_HEADER_VALUE };
const MOCK_BODY = { hello: 'world' };
const MOCK_RESPONSE = {
  ...MOCK_STATUS_CODE_RESPONSE,
  body: JSON.stringify(MOCK_BODY),
  headers: MOCK_HEADERS
};

describe('locked function', () => {
  it('composes with headers and body passed', () => {
    expect(
      locked(
        body(MOCK_BODY),
        headers(
          header(MOCK_HEADER_NAME, MOCK_HEADER_VALUE)
        )
    )).toEqual(MOCK_RESPONSE);
  });

  it('is equal to the functions that it composes', () => {
    expect(locked()).toEqual(response(locked()));
    expect(locked()).toEqual(response(statusCode(423)));
    expect(locked()).toEqual(response(MOCK_STATUS_CODE_RESPONSE));
    expect(locked()).toEqual(statusCode(423));
    expect(locked()).toEqual(MOCK_STATUS_CODE_RESPONSE);

    expect(locked(
      headers(header(MOCK_HEADER_NAME)(MOCK_HEADER_VALUE)),
      body(MOCK_BODY)
    )).toEqual({
      statusCode: 423,
      headers: MOCK_HEADERS,
      body: JSON.stringify(MOCK_BODY)
    });
  });
});