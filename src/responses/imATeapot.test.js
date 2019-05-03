/* This is an auto-generated file. */

const imATeapot = require('./imATeapot');
const body = require('../body');
const headers = require('../headers');
const header = require('../header');
const statusCode = require('../statusCode');
const response = require('../response');

const MOCK_STATUS_CODE_RESPONSE = { statusCode: 418 };
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

describe('imATeapot function', () => {
  it('composes with headers and body passed', () => {
    expect(
      imATeapot(
        body(MOCK_BODY),
        headers(
          header(MOCK_HEADER_NAME, MOCK_HEADER_VALUE)
        )
    )).toEqual(MOCK_RESPONSE);
  });

  it('is equal to the functions that it composes', () => {
    expect(imATeapot()).toEqual(response(imATeapot()));
    expect(imATeapot()).toEqual(response(statusCode(418)));
    expect(imATeapot()).toEqual(response(MOCK_STATUS_CODE_RESPONSE));
    expect(imATeapot()).toEqual(statusCode(418));
    expect(imATeapot()).toEqual(MOCK_STATUS_CODE_RESPONSE);
  });
});