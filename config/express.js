require('@babel/register');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const config = require('./../config');
const routes = require('./../app/routes');
const providers = require('./../providers');

// mongoose options
const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true
};

// db.createUser(
//   {
//     user: "youverify",
//     pwd: "mpwfJMfb3heN",
//     roles: [ {role: 'dbOwner', db: 'youverify_background'} ]
//   }
// )

module.exports = () => {

    const app = express();

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
    providers.database.boot(mongoose, { config, options: mongooseOptions });

    // bootstrap routes
    providers.routes.boot(app, { config, routes });

    // start server and log the port on console
    app.listen(config.get('server.app.port'), started);

    return app;
};

/**
 * Called when server is started...
 * Displays information on the console
 */
function started() {
    console.log(
        [
            '---------------------------',
            'Server Running',
            '---------------------------',
            'Port: ' + config.get('server.app.port'),
            '---------------------------'
        ].join('\r\n')
    );
  }
