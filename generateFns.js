const { promisify } = require('util');
const fs = require('fs');
const [ readFile, writeFile ] = [ promisify(fs.readFile), promisify(fs.writeFile) ];
const _ = require('lodash');

const SPLIT_AT = '<!--  -->';

const catchError = error => {
  console.log(error.toString());
  throw error;
};

const pullOnlyStatusCodes = data => data.filter(str => !Number.isNaN(Number(str.slice(0, 3))));

readFile('./README.md', 'utf-8')
  .catch(catchError)
  .then(data => data.split(SPLIT_AT)[1].split('\n').filter(Boolean))
  // .then(data => data.filter(str => !Number.isNaN(Number(str.slice(0, 3)))))
  .then(pullOnlyStatusCodes)
  .then(codes => codes.map(code => ([ code.slice(0, 3), _.camelCase(code.slice(4)) ]).reverse()))
  .then(codes => `const `)
  .then(console.log)
