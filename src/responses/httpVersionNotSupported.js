const statusCode = require('../statusCode');
const { hoistedMerge } = require('../utils');

module.exports = hoistedMerge(statusCode(505));