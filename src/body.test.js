const body = require('./body');

const MOCK_OBJECT = { hello: 'world' };
const MOCK_ARRAY = [ 1, 2, 3 ];
const MOCK_NUMBER = 1;

test('body function', () => {
  expect(body(MOCK_OBJECT)).toEqual({ body: JSON.stringify(MOCK_OBJECT) });
  expect(body(MOCK_ARRAY)).toEqual({ body: JSON.stringify(MOCK_ARRAY) });
  expect(body(MOCK_NUMBER)).toEqual({ body: JSON.stringify(MOCK_NUMBER) });
});
