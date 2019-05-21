'use strict'

module.exports = {
    get routes() {
       return require('./routes')
    },

    get database () {
        return require('./database')
    }
}