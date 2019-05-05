const _curry = require('./_curry');

module.exports = _curry((key, value) => ({ [key]: value }));
