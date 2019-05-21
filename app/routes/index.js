import AppController from '../controllers/AppController';
import AppRoute from './app';

const express = require('express');


module.exports = () => {
    const router = express.Router();

    // enable app routes
    AppRoute(router, AppController);

    return router;
};
