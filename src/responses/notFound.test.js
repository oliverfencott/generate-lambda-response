/* This is an auto-generated file. */

const notFound = require('./notFound');
const body = require('../body');
const headers = require('../headers');
const header = require('../header');
const statusCode = require('../statusCode');
const response = require('../response');

const MOCK_STATUS_CODE_RESPONSE = { statusCode: 404 };
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

describe('notFound function', () => {
  it('composes with headers and body passed', () => {
    expect(
      notFound(
        body(MOCK_BODY),
        headers(
          header(MOCK_HEADER_NAME, MOCK_HEADER_VALUE)
        )
    )).toEqual(MOCK_RESPONSE);
  });

  it('is equal to the functions that it composes', () => {
    expect(notFound()).toEqual(response(notFound()));
    expect(notFound()).toEqual(response(statusCode(404)));
    expect(notFound()).toEqual(response(MOCK_STATUS_CODE_RESPONSE));
    expect(notFound()).toEqual(statusCode(404));
    expect(notFound()).toEqual(MOCK_STATUS_CODE_RESPONSE);
  });
});