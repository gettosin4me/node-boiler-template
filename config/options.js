// mongoose options
const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true
};

const i18nOptions = {
    locales: [ 'en', 'fr' ],
    defaultLocale: 'fr',
    directory: `${__dirname}/../locales`,
    queryParameter: 'lang',
    autoReload: true
};

module.exports = { mongooseOptions, i18nOptions };
