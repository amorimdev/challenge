var userController = require('../controllers/userController.js'),
    defaultController = require('../controllers/defaultController.js');

module.exports = function(express) {
    var router = express.Router();

    router.post('/v1/signup', userController.signup);
    router.post('/v1/login', userController.login);
    router.get('/v1/logout', userController.logout);
    router.put('/v1/edit', userController.isAuthenticated, userController.edit);

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
    router.get('/v1/', userController.isAuthenticated, defaultController.home);

    return router
};
