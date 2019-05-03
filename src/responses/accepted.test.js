/* This is an auto-generated file. */

const accepted = require('./accepted');
const body = require('../body');
const headers = require('../headers');
const header = require('../header');
const statusCode = require('../statusCode');
const response = require('../response');

const MOCK_STATUS_CODE_RESPONSE = { statusCode: 202 };
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

describe('accepted function', () => {
  it('composes with headers and body passed', () => {
    expect(
      accepted(
        body(MOCK_BODY),
        headers(
          header(MOCK_HEADER_NAME, MOCK_HEADER_VALUE)
        )
    )).toEqual(MOCK_RESPONSE);
  });

  it('is equal to the functions that it composes', () => {
    expect(accepted()).toEqual(response(accepted()));
    expect(accepted()).toEqual(response(statusCode(202)));
    expect(accepted()).toEqual(response(MOCK_STATUS_CODE_RESPONSE));
    expect(accepted()).toEqual(statusCode(202));
    expect(accepted()).toEqual(MOCK_STATUS_CODE_RESPONSE);
  });
});