var userController = require('../controllers/userController.js'),
    defaultController = require('../controllers/defaultController.js');

module.exports = function(express) {
    var router = express.Router();

    router.post('/signup', userController.signup);
    router.post('/login', userController.login);
    router.get('/logout', userController.logout);
    router.put('/edit', userController.isAuthenticated, userController.edit);

    /**
     * @api {get} / Home
     * @apiName Home
     * @apiGroup DefaultController
     *
     * @apiSuccess {Object} success
     * @apiSuccess {String} success.message Welcome!.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": {
     *         "message": "Welcome!"
     *       }
     *     }
     *
     * @apiError {Object} error
     * @apiError {Number} error.code 403
     * @apiError {String} error.message You not have permission to access the page.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 403 Forbidden
     *     {
     *       "error": {
     *         "code": 403,
     *         "message": "You not have permission to access the page."
     *       }
     *     }
     */
    router.get('/', userController.isAuthenticated, defaultController.home);

    return router
};
