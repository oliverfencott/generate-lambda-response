/* This is an auto-generated file. */

const notModified = require('./notModified');
const body = require('../body');
const headers = require('../headers');
const header = require('../header');
const statusCode = require('../statusCode');
const response = require('../response');

const MOCK_STATUS_CODE_RESPONSE = { statusCode: 304 };
const MOCK_HEADER_NAME = 'x-powered-by';
const MOCK_HEADER_VALUE = 'somedomain.com';
const MOCK_HEADERS = { [MOCK_HEADER_NAME]: MOCK_HEADER_VALUE };
const MOCK_BODY = { hello: 'world' };
const MOCK_RESPONSE = {
  ...MOCK_STATUS_CODE_RESPONSE,
  body: JSON.stringify(MOCK_BODY),
  headers: MOCK_HEADERS
};

describe('notModified function', () => {
  it('composes with headers and body passed', () => {
    expect(
      notModified(
        body(MOCK_BODY),
        headers(
          header(MOCK_HEADER_NAME, MOCK_HEADER_VALUE)
        )
    )).toEqual(MOCK_RESPONSE);
  });

  it('is equal to the functions that it composes', () => {
    expect(notModified()).toEqual(response(notModified()));
    expect(notModified()).toEqual(response(statusCode(304)));
    expect(notModified()).toEqual(response(MOCK_STATUS_CODE_RESPONSE));
    expect(notModified()).toEqual(statusCode(304));
    expect(notModified()).toEqual(MOCK_STATUS_CODE_RESPONSE);

    expect(notModified(
      headers(header(MOCK_HEADER_NAME)(MOCK_HEADER_VALUE)),
      body(MOCK_BODY)
    )).toEqual({
      statusCode: 304,
      headers: MOCK_HEADERS,
      body: JSON.stringify(MOCK_BODY)
    });
  });
});