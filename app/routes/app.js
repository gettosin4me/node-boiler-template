const AppController = require('../controllers/App');

module.exports = (router, Validator, check_errors, MethodNotAllowed) => {
    router.route('/').get(check_errors(AppController.index)).all(MethodNotAllowed);


    return router;
};
