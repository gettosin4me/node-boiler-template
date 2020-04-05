require('@babel/register');
require('babel-polyfill');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const i18n = require('i18n');
const FileStreamRotator = require('file-stream-rotator');
const morgan = require('morgan');
const config = require('./../config');
const routes = require('./../app/routes');
const providers = require('./../providers');
const loggerInit = require('./logger');
const { i18nOptions } = require('./options');
const ResponseTransformer = require('../app/utils/ResponseTransformer');
const errors = require('../app/middlewares/errors');

const logDirectory = './log';
const checkLogDir = fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

module.exports = () => {
    const app = express();
    let accessLogStream,
        logger;

    // initialize logger
    if (app.get('env') === 'development') {
        logger = loggerInit('development');
    } else if (app.get('env') === 'production') {
        logger = loggerInit('production');
    } else if (app.get('env') === 'test') {
        logger = loggerInit('test');
    } else {
        logger = loggerInit();
    }

    global.logger = logger;
    // logger.info('Application starting...');
    // logger.debug("Overriding 'Express' logger");


    if (checkLogDir) {
        accessLogStream = FileStreamRotator.getStream({
            date_format: 'YYYYMMDD',
            filename: `${logDirectory}/access-%DATE%.log`,
            frequency: 'weekly',
            verbose: false
        });
    }

    app.use(morgan('combined', { stream: accessLogStream }));

    // protect app from well known vulnerability
    app.use(helmet());

    app.disable('x-powered-by');

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    // initialise bodyParser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: 100000 }));

    // initialise database
    // providers.database.boot(mongoose, { config, options: pgOptions });

    // init localization
    providers.locale.boot(app, { i18n, i18nOptions });

    // bootstrap routes
    providers.routes.boot(app, { config, routes });

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        return res.status(404).json(ResponseTransformer.error(
            req.originalUrl,
            'Invalid Endpoint',
            'not_found',
        ));

        next(err);
    });

    // bootstrap errors
    providers.errors.boot(app, errors);
    // development error handler
    // will print stacktrace
    // if (app.get('env') === 'development' || app.get('env') === 'test') {
    //     app.use((err, req, res, next) =>
    //         console.log({ err }));
    //     // res.status(err.status || 500).json(ResponseTransformer.error(
    //     //     req.originalUrl,
    //     //     err.message,
    //     //     err,
    //     // )));
    // }

    // production error handler
    // remove stacktrace
    // app.use((err, req, res, next) =>
    //     res.status(err.status || 500).json({ message: err.message }),);

    //  start server an d log the  port on console
    app.listen(config.get('server.app.port'), started);

    return app;
};

/**
 * Called when server is started...
 * Displays information on the console
 */
function started() {
    console.log([
        '---------------------------',
        'Server Running',
        '---------------------------',
        `Port: ${config.get('server.app.port')}`,
        '---------------------------'
    ].join('\r\n'));
}
