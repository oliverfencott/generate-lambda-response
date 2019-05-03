const { map, join, pipe, prop } = require('lodash/fp');

const helperFile = ({ statusCode }) => (
`const statusCode = require('../statusCode');
const _hoistedMerge = require('../_hoistedMerge');

module.exports = _hoistedMerge(statusCode(${statusCode}));`
);

const testFile = ({ statusCode, functionName }) => (
`const ${functionName} = require('./${functionName}');
const body = require('../body');
const headers = require('../headers');
const header = require('../header');

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
  it('returns correct status code in object', () => {
    expect(${functionName}()).toEqual(MOCK_STATUS_CODE_RESPONSE);
  });

  it('composes with headers and body passed', () => {
    expect(
      ${functionName}(
        body(MOCK_BODY),
        headers(
          header(MOCK_HEADER_NAME, MOCK_HEADER_VALUE)
        )
    )).toEqual(MOCK_RESPONSE);
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
  join('\n')
);

module.exports = {
  helperFile,
  testFile,
  indexFile
};
