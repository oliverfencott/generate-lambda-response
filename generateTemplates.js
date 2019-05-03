const { map, join, pipe, prop, concat } = require('lodash/fp');
const package = require('./package.json');

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
const MOCK_HEADERS = { [MOCK_HEADER_NAME]: MOCK_HEADER_VALUE };
const MOCK_BODY = { hello: 'world' };
const MOCK_RESPONSE = {
  ...MOCK_STATUS_CODE_RESPONSE,
  body: JSON.stringify(MOCK_BODY),
  headers: MOCK_HEADERS
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

    expect(${functionName}(
      headers(header(MOCK_HEADER_NAME)(MOCK_HEADER_VALUE)),
      body(MOCK_BODY)
    )).toEqual({
      statusCode: ${statusCode},
      headers: MOCK_HEADERS,
      body: JSON.stringify(MOCK_BODY)
    });
  });
});`
);

const indexFile = pipe(
  map(('functionName')),
  map(functionName => `module.exports.${functionName} = require('./${functionName}');`),
  concat('/* This is an auto-generated file. */\n'),
  join('\n'),
);

const READMEFile = () => (
`# ${package.name}
Utilities to generate AWS lambda responses

## Usage

${'```'}js
// These imports are equivalent:

const {
  response,
  statusCode,
  body,
  header,
  headers
} = require('${package.name}');

const response = require('${package.name}/response');
const statusCode = require('${package.name}/statusCode');
const body = require('${package.name}/body');
const header = require('${package.name}/header');
const headers = require('${package.name}/headers');

// And:

const { ok } = require('${package.name}/responses');
const ok = require('${package.name}/responses/ok');

// The following are equivalent:

const desiredResponse = { statusCode: 200 };
const desiredResponse = response(statusCode(200));
const desiredResponse = statusCode(200);
const desiredResponse = response(ok());
const desiredResponse = ok();

// As are the following:

const desiredResponse = {
  statusCode: 200,
  headers: {
    foo: 'bar'
  }
};

const desiredResponse = response(
  statusCode(200), {
    headers: {
      foo: 'bar'
    }
  }
);

const desiredResponse = response(
  statusCode(200),
  headers({
    foo: 'bar'
  })
);

const desiredResponse = response(
  ok(),
  headers(header('foo', 'bar'))
);

const desiredResponse = ok(
  headers(header('foo')('bar'))
);

// As are the following:

const desiredResponse = {
  statusCode: 200,
  headers: {
    foo: 'bar'
  },
  body: JSON.stringify({
    foo: 'bar'
  })
};

const desiredResponse = response(
  statusCode(200), {
    headers: {
      foo: 'bar'
    }
  }, {
    body: JSON.stringify({
      foo: 'bar'
    })
  }
);

const desiredResponse = response(
  statusCode(200),
  headers({
    foo: 'bar'
  }),
  body({ foo: 'bar' })
);

const desiredResponse = response(
  ok(),
  headers(header('foo', 'bar')),
  body({ foo: 'bar' })
);

const desiredResponse = ok(
  headers(header('foo')('bar')),
  body({ foo: 'bar' })
);

${'```'}

`
);

module.exports = {
  helperFile,
  testFile,
  indexFile,
  READMEFile
};
