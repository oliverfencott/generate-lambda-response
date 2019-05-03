const { compose, createKeyedObject} = require('./utils');

module.exports = compose(JSON.stringify, createKeyedObject('body'));
