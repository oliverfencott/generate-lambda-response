const { map, join, pipe, prop, concat } = require('lodash/fp');

module.exports = pipe(
  map(prop('functionName')),
  map(functionName => `module.exports.${functionName} = require('./${functionName}');`),
  concat('/* This is an auto-generated file. */\n'),
  join('\n'),
);
