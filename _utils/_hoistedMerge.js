const _recursiveMerge = require('./_recursiveMerge');

module.exports = object => (...args) => _recursiveMerge(object, ...args);
