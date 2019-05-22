import BaseController from './BaseController';

class AppController extends BaseController
{
    static index(req, res) {
        try {
            return AppController.success({ message: res.__('user.unavailable') }, req, res);
        } catch (e) {
            console.log(e);
            return AppController.handleError(e, req, res);
        }
    }

}

export default AppController;
