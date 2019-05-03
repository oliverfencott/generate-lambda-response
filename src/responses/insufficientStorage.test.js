/* This is an auto-generated file. */

const insufficientStorage = require('./insufficientStorage');
const body = require('../body');
const headers = require('../headers');
const header = require('../header');
const statusCode = require('../statusCode');
const response = require('../response');

const MOCK_STATUS_CODE_RESPONSE = { statusCode: 507 };
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

describe('insufficientStorage function', () => {
  it('composes with headers and body passed', () => {
    expect(
      insufficientStorage(
        body(MOCK_BODY),
        headers(
          header(MOCK_HEADER_NAME, MOCK_HEADER_VALUE)
        )
    )).toEqual(MOCK_RESPONSE);
  });

  it('is equal to the functions that it composes', () => {
    expect(insufficientStorage()).toEqual(response(insufficientStorage()));
    expect(insufficientStorage()).toEqual(response(statusCode(507)));
    expect(insufficientStorage()).toEqual(response(MOCK_STATUS_CODE_RESPONSE));
    expect(insufficientStorage()).toEqual(statusCode(507));
    expect(insufficientStorage()).toEqual(MOCK_STATUS_CODE_RESPONSE);
  });
});