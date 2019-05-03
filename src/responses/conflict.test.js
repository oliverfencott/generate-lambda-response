/* This is an auto-generated file. */

const conflict = require('./conflict');
const body = require('../body');
const headers = require('../headers');
const header = require('../header');
const statusCode = require('../statusCode');
const response = require('../response');

const MOCK_STATUS_CODE_RESPONSE = { statusCode: 409 };
const MOCK_HEADER_NAME = 'x-powered-by';
const MOCK_HEADER_VALUE = 'somedomain.com';
const MOCK_BODY = { hello: 'world' };
const MOCK_RESPONSE = {
  ...MOCK_STATUS_CODE_RESPONSE,
  body: JSON.stringify(MOCK_BODY),
  headers: {
    [MOCK_HEADER_NAME]: MOCK_HEADER_VALUE
  }
};

describe('conflict function', () => {
  it('composes with headers and body passed', () => {
    expect(
      conflict(
        body(MOCK_BODY),
        headers(
          header(MOCK_HEADER_NAME, MOCK_HEADER_VALUE)
        )
    )).toEqual(MOCK_RESPONSE);
  });

  it('is equal to the functions that it composes', () => {
    expect(conflict()).toEqual(response(conflict()));
    expect(conflict()).toEqual(response(statusCode(409)));
    expect(conflict()).toEqual(response(MOCK_STATUS_CODE_RESPONSE));
    expect(conflict()).toEqual(statusCode(409));
    expect(conflict()).toEqual(MOCK_STATUS_CODE_RESPONSE);
  });
});