const options = {};

const database = require('../../providers/database').boot(options);

module.exports = { database };
