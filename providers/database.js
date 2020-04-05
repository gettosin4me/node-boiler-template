const config = require('../config');

module.exports = {
    boot({ options }) {
        const pg = require('pg-promise')(options);

        //  pass database connection string
        const db = pg(config.get('database.url'));

        return db;
    }
};
