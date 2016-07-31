var defaultController = require('../controllers/defaultController.js'),
    userController = require('../controllers/userController.js'),
    wishlistController = require('../controllers/wishlistController.js');

module.exports = function(express) {
    var router = express.Router();

    /**
     * @api {post} /signup                      Signup
     * @apiName SignupUser
     * @apiGroup User
     * @apiVersion 1.0.0
     *
     * @apiParam {String} name                  User Name.
     * @apiParam {String} email                 User Email.
     * @apiParam {String} password              User Password.
     * @apiParam {String} [zipcode]             USer Zip Code.
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
     * @apiSuccess {String} success.message     Account successfully created.
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
     * @apiError (400) {Number} error.code      400
     * @apiError (400) {String} error.message   Please, fill in all the required fields. OR Invalid Zip Code.
     *
     * @apiError (409) {Object} error
     * @apiError (409) {Number} error.code      409
     * @apiError (409) {String} error.message   Email already in use.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "error": {
     *         "code": 400,
     *         "message": "Please, fill in all the required fields."
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
     * @api {post} /login                       Login
     * @apiName LoginUser
     * @apiGroup User
     * @apiVersion 1.0.0
     *
     * @apiParam {String} email                 User Email.
     * @apiParam {String} password              User Password.
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "email": "amorim.dev@gmail.com",
     *       "password": "123",
     *     }
     *
     * @apiSuccess {Object} success
     * @apiSuccess {String} success.message     Successfully login.
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
     * @apiError (401) {Number} error.code      401
     * @apiError (401) {String} error.message   Authentication failed.
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
     * @api {get} /logout                       Logout
     * @apiName LogoutUser
     * @apiGroup User
     * @apiVersion 1.0.0
     *
     * @apiSuccess {Object} success
     * @apiSuccess {String} success.message     Successfully logout.
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
     * @apiError (403) {Number} error.code      403
     * @apiError (403) {String} error.message   You not have permission to access the page.
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
     * @api {put} /user                         Edit
     * @apiName EditUser
     * @apiGroup User
     * @apiVersion 1.0.0
     *
     * @apiParam {String} [name]                User Name.
     * @apiParam {String} [email]               User Email.
     * @apiParam {String} [password]            User Password.
     * @apiParam {String} [zipcode]             User Zip Code.
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
     * @apiSuccess {String} success.message     Account successfully updated.
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
     * @apiError (400) {Number} error.code      400
     * @apiError (400) {String} error.message   Invalid Zip Code.
     *
     * @apiError (409) {Object} error
     * @apiError (409) {Number} error.code      409
     * @apiError (409) {String} error.message   Email already in use.
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
     * @api {post} /wishlist                    Create
     * @apiName Create
     * @apiGroup Wishlist
     * @apiVersion 1.0.0
     *
     * @apiParam {String} name                  Wishlist Name.
     * @apiParam {String} [description]         Wishlist Description.
     * @apiParam {Number} averageValue          Wishlist Average Value.
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "name": "My Wish",
     *       "description": "Work on F(X)",
     *       "averageValue": "123.45"
     *     }
     *
     * @apiSuccess {Object} success
     * @apiSuccess {String} success.message     Wishlist successfully created.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": {
     *         "message": "Wishlist successfully created."
     *       }
     *     }
     *
     * @apiError (400) {Object} error
     * @apiError (400) {Number} error.code      400
     * @apiError (400) {String} error.message   Please, fill in all the required fields
     *
     * @apiError (409) {Object} error
     * @apiError (409) {Number} error.code      409
     * @apiError (409) {String} error.message   Wishlist create failure.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "error": {
     *         "code": 400,
     *         "message": "Please, fill in all the required fields."
     *       }
     *     }
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 409 Forbidden
     *     {
     *       "error": {
     *         "code": 409,
     *         "message": "Wishlist create failure."
     *       }
     *     }
     */
    router.post('/wishlist', userController.isAuthenticated, wishlistController.create);

    /**
     * @api {get} /wishlist                     ListAll
     * @apiName ListAll
     * @apiGroup Wishlist
     * @apiVersion 1.0.0
     *
     * @apiSuccess {Object} success
     * @apiSuccess {Object[]} success.wishlists List of user wish.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": {
     *         "wishlist": []
     *       }
     *     }
     *
     * @apiError (403) {Object} error
     * @apiError (403) {Number} error.code      403
     * @apiError (403) {String} error.message   You not have permission to access the page.
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
    router.get('/wishlist', userController.isAuthenticated, wishlistController.listAll);

    /**
     * @api {get} /wishlist/:id                 List
     * @apiName List
     * @apiGroup Wishlist
     * @apiVersion 1.0.0
     *
     * @apiSuccess {Object} success
     * @apiSuccess {Object} success.wishlist    Wishlist.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": {
     *         "wishlist": {}
     *       }
     *     }
     *
     * @apiError (404) {Object} error
     * @apiError (404) {Number} error.code      404
     * @apiError (404) {String} error.message   Wishlist does not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Forbidden
     *     {
     *       "error": {
     *         "code": 404,
     *         "message": "Wishlist does not found."
     *       }
     *     }
     */
    router.get('/wishlist/:id', userController.isAuthenticated, wishlistController.list);

    /**
     * @api {put} /wishlist/:id                 Edit
     * @apiName Edit
     * @apiGroup Wishlist
     * @apiVersion 1.0.0
     *
     * @apiParam {String} [name]                Wishlist Name.
     * @apiParam {String} [description]         Wishlist Description.
     * @apiParam {Number} [averageValue]        Wishlist Average Value.
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "name": "My Wish",
     *       "description": "Work on F(X)",
     *       "averageValue": "123.45"
     *     }
     *
     * @apiSuccess {Object} success
     * @apiSuccess {String} success.message     Wishlist successfully updated.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": {
     *         "message": "Wishlist successfully updated."
     *       }
     *     }
     *
     * @apiError (404) {Object} error
     * @apiError (404) {Number} error.code      404
     * @apiError (404) {String} error.message   Wishlist does not found.
     *
     * @apiError (409) {Object} error
     * @apiError (409) {Number} error.code      409
     * @apiError (409) {String} error.message   Wishlist update failure.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Forbidden
     *     {
     *       "error": {
     *         "code": 404,
     *         "message": "Wishlist does not found."
     *       }
     *     }
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 409 Forbidden
     *     {
     *       "error": {
     *         "code": 409,
     *         "message": "Wishlist update failure."
     *       }
     *     }
     */
    router.put('/wishlist/:id', userController.isAuthenticated, wishlistController.edit);

    /**
     * @api {delete} /wishlist/:id              Delete
     * @apiName Delete
     * @apiGroup Wishlist
     * @apiVersion 1.0.0
     *
     * @apiSuccess {Object} success
     * @apiSuccess {String} success.message     Wishlist successfully deleted.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": {
     *         "message": "Wishlist successfully deleted."
     *       }
     *     }
     *
     * @apiError (404) {Object} error
     * @apiError (404) {Number} error.code      404
     * @apiError (404) {String} error.message   Wishlist does not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Forbidden
     *     {
     *       "error": {
     *         "code": 404,
     *         "message": "Wishlist does not found."
     *       }
     *     }
     */
    router.delete('/wishlist/:id', userController.isAuthenticated, wishlistController.delete);

    /**
     * @api {get} / Home
     * @apiName Home
     * @apiGroup Default
     * @apiVersion 1.0.0
     *
     * @apiSuccess {Object} success
     * @apiSuccess {String} success.message     Welcome!
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
     * @apiError (403) {Number} error.code      403
     * @apiError (403) {String} error.message   You not have permission to access the page.
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
