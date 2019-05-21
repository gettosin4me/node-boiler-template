import BaseController from './BaseController';

class AppController extends BaseController
{

    static index(req, res) {
        try {
            return BaseController.success({ message: 'welcome' });
        } catch (e) {
            return BaseController.handleError(e);
        }
    }

}

export default AppController;
