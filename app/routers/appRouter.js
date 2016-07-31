var userController = require('../controllers/userController.js'),
    defaultController = require('../controllers/defaultController.js');

module.exports = function(express) {
    var router = express.Router();

    /**
     * @api {post} /signup Signup
     * @apiName SignupUser
     * @apiGroup User
     * @apiVersion 1.0.0
     *
     * @apiParam {String} name Name of the User.
     * @apiParam {String} email  Email of the User.
     * @apiParam {String} password  Password of the User.
     * @apiParam {String} [zipcode]  Zipcode of the User.
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "name": "Jhonatan Amorim",
     *       "email": "amorim.dev@gmail.com",
     *       "password": "123",
     *       "zipcode": "05735030"
     *     }
     *
     * @apiSuccess {Object} success
     * @apiSuccess {String} success.message Account successfully created.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": {
     *         "message": "Account successfully created."
     *       }
     *     }
     *
     * @apiError (400) {Object} error
     * @apiError (400) {Number} error.code 400
     * @apiError (400) {String} error.message Please, fill in all the fields. OR Invalid Zip Code.
     *
     * @apiError (409) {Object} error
     * @apiError (409) {Number} error.code 409
     * @apiError (409) {String} error.message Email already in use.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "error": {
     *         "code": 400,
     *         "message": "Please, fill in all the fields."
     *       }
     *     }
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "error": {
     *         "code": 400,
     *         "message": "Invalid Zip Code."
     *       }
     *     }
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "error": {
     *         "code": 409,
     *         "message": "Email already in use."
     *       }
     *     }
     */
    router.post('/signup', userController.signup);

    /**
     * @api {post} /login Login
     * @apiName LoginUser
     * @apiGroup User
     * @apiVersion 1.0.0
     *
     * @apiParam {String} email  Email of the User.
     * @apiParam {String} password  Password of the User.
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "email": "amorim.dev@gmail.com",
     *       "password": "123",
     *     }
     *
     * @apiSuccess {Object} success
     * @apiSuccess {String} success.message Successfully login.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": {
     *         "message": "Successfully login."
     *       }
     *     }
     *
     * @apiError (401) {Object} error
     * @apiError (401) {Number} error.code 401
     * @apiError (401) {String} error.message Authentication failed.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Bad Request
     *     {
     *       "error": {
     *         "code": 401,
     *         "message": "Authentication failed."
     *       }
     *     }
     */
    router.post('/login', userController.login);

    /**
     * @api {get} /logout Logout
     * @apiName LogoutUser
     * @apiGroup User
     * @apiVersion 1.0.0
     *
     * @apiSuccess {Object} success
     * @apiSuccess {String} success.message Successfully logout.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": {
     *         "message": "Successfully logout."
     *       }
     *     }
     *
     * @apiError (403) {Object} error
     * @apiError (403) {Number} error.code 403
     * @apiError (403) {String} error.message You not have permission to access the page.
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
    router.get('/logout', userController.isAuthenticated, userController.logout);

    /**
     * @api {put} /user Edit
     * @apiName EditUser
     * @apiGroup User
     * @apiVersion 1.0.0
     *
     * @apiParam {String} [name] Name of the User.
     * @apiParam {String} [email]  Email of the User.
     * @apiParam {String} [password]  Password of the User.
     * @apiParam {String} [zipcode]  Zipcode of the User.
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "name": "Jhonatan Amorim",
     *       "email": "amorim.dev@gmail.com",
     *       "password": "123",
     *       "zipcode": "05735030"
     *     }
     *
     * @apiSuccess {Object} success
     * @apiSuccess {String} success.message Account successfully updated.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": {
     *         "message": "Account successfully updated."
     *       }
     *     }
     *
     * @apiError (400) {Object} error
     * @apiError (400) {Number} error.code 400
     * @apiError (400) {String} error.message Invalid Zip Code.
     *
     * @apiError (409) {Object} error
     * @apiError (409) {Number} error.code 409
     * @apiError (409) {String} error.message Email already in use.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "error": {
     *         "code": 400,
     *         "message": "Invalid Zip Code."
     *       }
     *     }
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "error": {
     *         "code": 409,
     *         "message": "Email already in use."
     *       }
     *     }
     */
    router.put('/user', userController.isAuthenticated, userController.edit);

    /**
     * @api {get} / Home
     * @apiName Home
     * @apiGroup Default
     * @apiVersion 1.0.0
     *
     * @apiSuccess {Object} success
     * @apiSuccess {String} success.message Welcome!
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": {
     *         "message": "Welcome!"
     *       }
     *     }
     *
     * @apiError (403) {Object} error
     * @apiError (403) {Number} error.code 403
     * @apiError (403) {String} error.message You not have permission to access the page.
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
