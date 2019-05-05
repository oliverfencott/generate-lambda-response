const header = require('./header');

const HEADER_NAME = 'x-powered-by';
const HEADER_VALUE = 'a test domain';

const EXPECTED_RETURN_VALUE = {
  [HEADER_NAME]: HEADER_VALUE
};

describe('header function', () => {
  describe('called with one argument', () => {
    const XPoweredBy = header(HEADER_NAME);

    it('returns a function', () => {
      expect(XPoweredBy).toBeInstanceOf(Function);
    });

    it('returns an object when return value is executed', () => {
      expect(XPoweredBy(HEADER_VALUE)).toEqual(EXPECTED_RETURN_VALUE);
    });
  });

  describe('called with two arguments', () => {
    const XPoweredBy = header(HEADER_NAME, HEADER_VALUE);

    it('returns an object', () => {
      expect(XPoweredBy).toEqual(EXPECTED_RETURN_VALUE);
    });
  });
});
