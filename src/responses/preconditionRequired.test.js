/* This is an auto-generated file. */

const preconditionRequired = require('./preconditionRequired');
const body = require('../body');
const headers = require('../headers');
const header = require('../header');
const statusCode = require('../statusCode');
const response = require('../response');

const MOCK_STATUS_CODE_RESPONSE = { statusCode: 428 };
const MOCK_HEADER_NAME = 'x-powered-by';
const MOCK_HEADER_VALUE = 'somedomain.com';
const MOCK_HEADERS = { [MOCK_HEADER_NAME]: MOCK_HEADER_VALUE };
const MOCK_BODY = { hello: 'world' };
const MOCK_RESPONSE = {
  ...MOCK_STATUS_CODE_RESPONSE,
  body: JSON.stringify(MOCK_BODY),
  headers: MOCK_HEADERS
};

describe('preconditionRequired function', () => {
  it('composes with headers and body passed', () => {
    expect(
      preconditionRequired(
        body(MOCK_BODY),
        headers(
          header(MOCK_HEADER_NAME, MOCK_HEADER_VALUE)
        )
    )).toEqual(MOCK_RESPONSE);
  });

  it('is equal to the functions that it composes', () => {
    expect(preconditionRequired()).toEqual(response(preconditionRequired()));
    expect(preconditionRequired()).toEqual(response(statusCode(428)));
    expect(preconditionRequired()).toEqual(response(MOCK_STATUS_CODE_RESPONSE));
    expect(preconditionRequired()).toEqual(statusCode(428));
    expect(preconditionRequired()).toEqual(MOCK_STATUS_CODE_RESPONSE);

    expect(preconditionRequired(
      headers(header(MOCK_HEADER_NAME)(MOCK_HEADER_VALUE)),
      body(MOCK_BODY)
    )).toEqual({
      statusCode: 428,
      headers: MOCK_HEADERS,
      body: JSON.stringify(MOCK_BODY)
    });
  });
});