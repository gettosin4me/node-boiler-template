import RouteProvider from './route';
import DatabaseProvider from './database';
import LocaleProvider from './locale';

module.exports = {
    get routes() {
        return RouteProvider;
    },

    get database() {
        return DatabaseProvider;
    },

    get locale() {
        return LocaleProvider;
    }
};
