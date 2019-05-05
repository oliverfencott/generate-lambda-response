const { promisify } = require('util');
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const {
  camelCase,
  pipe,
  filter,
  split,
  map,
  slice,
  negate,
  join,
  constant,
  prop,
  concat
} = require('lodash/fp');

const rimraf = require('rimraf');
const statusCodes = require('./httpStatusCodes.json');

const { HTTPResponse, HTTPResponseTest, HTTPResponseIndex, README } = require('./templates');

const outputDirectory = 'src/responses';

rimraf.sync(outputDirectory);
console.log(`🗑  Deleted stale "${outputDirectory}" directory`);
fs.mkdirSync(outputDirectory);
console.log(`📦  Created fresh "${outputDirectory}" directory`);

const catchError = error => {
  console.log(error.toString());
  throw error;
};

const writeFileFactory = (nameGenerator, generator) => input => writeFile(
  `${outputDirectory}/${nameGenerator(input)}.js`,
  generator(input)
).then(constant(input));

const writeResponseFile = writeFileFactory(prop('functionName'), HTTPResponse);
const writeResponseTestFile = writeFileFactory(pipe(({ functionName }) => `${functionName}.test`), HTTPResponseTest);
const writeResponseIndexFile = writeFileFactory(constant('index'), HTTPResponseIndex);

const writeReadmeFile = () => writeFile('README.md', README());

const pullStatusCode = pipe(slice(0, 3), join(''));
const pullOnlyStatusCodes = filter(pipe(pullStatusCode, Number, negate(Number.isNaN)));


Promise
  .resolve(statusCodes)
  .then(writeResponseIndexFile)
  .then(codes => console.log(`✅  Successfully generated index file`) || codes)
  .then(map(writeResponseFile))
  .then(Promise.all.bind(Promise))
  .then(codes => console.log(`✅  Successfully generated code files`) || codes)
  .then(map(writeResponseTestFile))
  .then(Promise.all.bind(Promise))
  .then(codes => console.log(`✅  Successfully generated test files`) || codes)
  .then(writeReadmeFile)
  .then(() => console.log(`✅  Successfully generated README.md`))
  .catch(catchError)
