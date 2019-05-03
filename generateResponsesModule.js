const { promisify } = require('util');
const fs = require('fs');
const [ readFile, writeFile ] = [ promisify(fs.readFile), promisify(fs.writeFile) ];
const _ = require('lodash');
const rimraf = require('rimraf');


const outputDirectory = 'src/responses';

rimraf.sync(outputDirectory);
fs.mkdirSync(outputDirectory);

const catchError = error => {
  console.log(error.toString());
  throw error;
};

const pullOnlyStatusCodes = data => data.filter(str => !Number.isNaN(Number(str.slice(0, 3))));

const generateCodeTemplate = ({ statusCode }) => (
  `const statusCode = require('../statusCode');
const { hoistedMerge } = require('../utils');

module.exports = hoistedMerge(statusCode(${statusCode}));`);

const generateTestTemplate = ({ statusCode, functionName }) => (
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
});`);

readFile('./httpStatusCodes.md', 'utf-8')
  .catch(catchError)
  .then(data => data.split('\n').filter(Boolean))
  .then(pullOnlyStatusCodes)
  .then(codes => codes.map(code => ({ statusCode: Number(code.slice(0, 3)), functionName: _.camelCase(code.slice(4)) })))
  .then(codes => (
    Promise
      .all(
        codes.map(code => (
          writeFile(`${outputDirectory}/${code.functionName}.js`, generateCodeTemplate(code))
            .catch(catchError)
            .then(() => writeFile(`${outputDirectory}/${code.functionName}.test.js`, generateTestTemplate(code)))
            .catch(catchError)
        ))
      )
  ))
  .then(() => console.log('successfully wrote files'))
  .catch(catchError)
