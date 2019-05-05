const _pipe = require('./_pipe');
const _recursiveMerge = require('./_recursiveMerge');
const _createKeyedObject = require('./_createKeyedObject');

module.exports = _pipe(_recursiveMerge, _createKeyedObject('headers'));
