/* This is an auto-generated file. */

const resetContent = require('./resetContent');
const body = require('../body');
const headers = require('../headers');
const header = require('../header');
const statusCode = require('../statusCode');
const response = require('../response');

const MOCK_STATUS_CODE_RESPONSE = { statusCode: 205 };
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

describe('resetContent function', () => {
  it('composes with headers and body passed', () => {
    expect(
      resetContent(
        body(MOCK_BODY),
        headers(
          header(MOCK_HEADER_NAME, MOCK_HEADER_VALUE)
        )
    )).toEqual(MOCK_RESPONSE);
  });

  it('is equal to the functions that it composes', () => {
    expect(resetContent()).toEqual(response(resetContent()));
    expect(resetContent()).toEqual(response(statusCode(205)));
    expect(resetContent()).toEqual(response(MOCK_STATUS_CODE_RESPONSE));
    expect(resetContent()).toEqual(statusCode(205));
    expect(resetContent()).toEqual(MOCK_STATUS_CODE_RESPONSE);
  });
});