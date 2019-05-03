const { map, join, pipe, prop, concat } = require('lodash/fp');

const helperFile = ({ statusCode }) => (
`/* This is an auto-generated file. */

const statusCode = require('../statusCode');
const _hoistedMerge = require('../_hoistedMerge');

module.exports = _hoistedMerge(statusCode(${statusCode}));`
);

const testFile = ({ statusCode, functionName }) => (
`/* This is an auto-generated file. */

const ${functionName} = require('./${functionName}');
const body = require('../body');
const headers = require('../headers');
const header = require('../header');
const statusCode = require('../statusCode');
const response = require('../response');

const MOCK_STATUS_CODE_RESPONSE = { statusCode: ${statusCode} };
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

describe('${functionName} function', () => {
  it('composes with headers and body passed', () => {
    expect(
      ${functionName}(
        body(MOCK_BODY),
        headers(
          header(MOCK_HEADER_NAME, MOCK_HEADER_VALUE)
        )
    )).toEqual(MOCK_RESPONSE);
  });

  it('is equal to the functions that it composes', () => {
    expect(${functionName}()).toEqual(response(${functionName}()));
    expect(${functionName}()).toEqual(response(statusCode(${statusCode})));
    expect(${functionName}()).toEqual(response(MOCK_STATUS_CODE_RESPONSE));
    expect(${functionName}()).toEqual(statusCode(${statusCode}));
    expect(${functionName}()).toEqual(MOCK_STATUS_CODE_RESPONSE);
  });
});`
);

const log = fn => {
  return (...args) => {
    const out = fn(...args);
    console.log(out);
    return out;
  }
}

const indexFile = pipe(
  map(('functionName')),
  map(functionName => `module.exports.${functionName} = require('./${functionName}');`),
  concat('/* This is an auto-generated file. */\n'),
  join('\n'),
);

module.exports = {
  helperFile,
  testFile,
  indexFile
};
