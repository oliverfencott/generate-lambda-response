const {
  _pipe,
  _recursiveMerge,
  _createKeyedObject
} = require('./_utils');

module.exports = _pipe(_recursiveMerge, _createKeyedObject('headers'));
