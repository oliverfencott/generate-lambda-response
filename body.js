const _pipe = require('./_pipe');
const _createKeyedObject = require('./_createKeyedObject');

module.exports = _pipe(JSON.stringify, _createKeyedObject('body'));
