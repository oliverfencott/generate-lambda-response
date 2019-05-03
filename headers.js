const { compose, recursiveMerge, createKeyedObject } = require('./utils');

module.exports = compose(recursiveMerge, createKeyedObject('headers'));
