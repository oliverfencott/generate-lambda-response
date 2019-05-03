const imATeapot = require('./imATeapot');
const body = require('../body');
const headers = require('../headers');
const header = require('../header');

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
  it('returns correct status code in object', () => {
    expect(imATeapot()).toEqual(MOCK_STATUS_CODE_RESPONSE);
  });

  it('composes with headers and body passed', () => {
    expect(
      imATeapot(
        body(MOCK_BODY),
        headers(
          header(MOCK_HEADER_NAME, MOCK_HEADER_VALUE)
        )
    )).toEqual(MOCK_RESPONSE);
  });
});