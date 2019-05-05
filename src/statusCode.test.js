const statusCode = require('./statusCode');

describe('statusCode function', () => {
  it('returns an object with the status code applied to the "statusCode" property', () => {
    expect(statusCode(200)).toEqual({ statusCode: 200 });
  });
})
