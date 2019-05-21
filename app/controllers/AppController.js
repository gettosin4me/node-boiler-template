import BaseController from './BaseController';

class AppController extends BaseController
{

    static index(req, res) {
        try {
            return BaseController.success({ message: 'welcome' }, req, res);
        } catch (e) {
            return BaseController.handleError(e, req, res);
        }
    }

}

export default AppController;
