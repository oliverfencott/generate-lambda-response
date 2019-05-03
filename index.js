// const {
//   // curry,
//   compose,
//   recursiveMerge,
//   hoistedMerge,
//   createKeyedObject,
//   hoistAndRecursivelyMerge
// } = require('./utils');
//
// const response = recursiveMerge;
// const statusCode = createKeyedObject('statusCode');
// const body = compose(JSON.stringify, createKeyedObject('body'));
// const header = createKeyedObject;
// const headers = compose(recursiveMerge, createKeyedObject('headers'));
//
// const utils = {
//   response,
//   statusCode,
//   headers,
//   header,
//   body
// };
//
// const ok = hoistedMerge(recursiveMerge(statusCode(200)))
//
// const FNS = [
//   headers(
//     header('x-powered-by', 'k'),
//     header('x-foo', 'bar'),
//   )
// ];
//
// FNS.forEach(arg => console.log(JSON.stringify(arg, null, 2)))

const response = require('./response');
const statusCode = require('./statusCode');
const body = require('./body');
const header = require('./header');
const headers = require('./headers');

module.exports = { response, statusCode, body, header, headers };

// const ok = hoistedMerge(recursiveMerge(statusCode(200)))

const FNS = [
  headers(
    header('x-powered-by', 'k'),
    header('x-foo', 'bar'),
  )
];

FNS.forEach(arg => console.log(JSON.stringify(arg, null, 2)))
