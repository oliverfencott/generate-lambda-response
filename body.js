const {
  _pipe,
  _createKeyedObject
} = require('./_utils');

module.exports = _pipe(JSON.stringify, _createKeyedObject('body'));
