/* This is an auto-generated file. */

const notAcceptable = require('./notAcceptable');
const body = require('../body');
const headers = require('../headers');
const header = require('../header');
const statusCode = require('../statusCode');
const response = require('../response');

const MOCK_STATUS_CODE_RESPONSE = { statusCode: 406 };
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

describe('notAcceptable function', () => {
  it('composes with headers and body passed', () => {
    expect(
      notAcceptable(
        body(MOCK_BODY),
        headers(
          header(MOCK_HEADER_NAME, MOCK_HEADER_VALUE)
        )
    )).toEqual(MOCK_RESPONSE);
  });

  it('is equal to the functions that it composes', () => {
    expect(notAcceptable()).toEqual(response(notAcceptable()));
    expect(notAcceptable()).toEqual(response(statusCode(406)));
    expect(notAcceptable()).toEqual(response(MOCK_STATUS_CODE_RESPONSE));
    expect(notAcceptable()).toEqual(statusCode(406));
    expect(notAcceptable()).toEqual(MOCK_STATUS_CODE_RESPONSE);
  });
});