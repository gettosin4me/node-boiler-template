const BaseController = require('./Base');

class AppController extends BaseController {
    static index(req, res) {
        try {
            return AppController.success({ message: res.__('welcome.text') }, req, res);
        } catch (e) {
            return AppController.handleError(e, req, res);
        }
    }
}

module.exports = AppController;
