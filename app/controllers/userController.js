var passport = require('passport'),
    http = require('http'),
    bcrypt = require('bcrypt'),
    Model = require('../model/models.js');

var userController = {
    isAuthenticated: function (req, res, next) {
        if (req.isAuthenticated())
            return next();
        return res.status(403).send({error: {code: 403, message: 'You not have permission to access the page.'}});
    },
    login: function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.status(401).send(info);
            }

            req.login(user, function (err) {
                if (err) {
                    return next(err);
                }

                return res.send({success: {message: 'Successfully login.'}});
            });
        })(req, res, next);
    },
    logout: function (req, res) {
        req.logout();
        return res.send({success: {message: 'Successfully logout.'}});
    },
    signup: function (req, res) {
        var name = req.body.name,
            email = req.body.email,
            password = req.body.password,
            zipcode = req.body.zipcode;

        if (!name || !email || !password) {
            return res.status(400).send({error: {code: 400, message: 'Please, fill in all the fields.'}});
        }

        var salt = bcrypt.genSaltSync(10),
            hashedPassword = bcrypt.hashSync(password, salt),
            newUser = {
                name: name,
                email: email,
                salt: salt,
                password: hashedPassword,
                address: {}
            };

        if (typeof zipcode === 'undefined' || zipcode.replace(/[^\d]/g,'').length < 8) {
            return userController.create(newUser, res);
        }

        var options = {
            host: 'correiosapi.apphb.com',
            port: 80,
            path: '/cep/' + zipcode
        };

        http.get(options, function(resp){
            var body = '';

            resp.on('data', function(chunk){
                body += chunk;
            });

            resp.on('end', function(){
                try {
                    newUser.address = JSON.parse(body);
                    userController.create(newUser, res);
                } catch (e) {
                    console.log("Got error: " + e.message);
                    return res.status(400).send({error: {code: 400, message: 'Invalid Zip Code.'}});
                }
            });
        }).on("error", function(e){
            console.log("Got error: " + e.message);
        });
    },
    edit: function (req, res) {
        var salt = bcrypt.genSaltSync(10), user = {
            name: (req.body.name) ? req.body.name : req.user.name,
            email: (req.body.email && req.body.email != req.user.email) ? req.body.email : req.user.email,
            salt: (req.body.password) ? salt : req.user.salt,
            password: (req.body.password) ? bcrypt.hashSync(req.body.password, salt) : req.user.password
        }, zipcode = req.body.zipcode;

        if (typeof zipcode === 'undefined' || zipcode.replace(/[^\d]/g,'').length < 8) {
            return userController.update(req.user.id, user, res);
        }

        var options = {
            host: 'correiosapi.apphb.com',
            port: 80,
            path: '/cep/' + zipcode
        };

        http.get(options, function(resp){
            var body = '';

            resp.on('data', function(chunk){
                body += chunk;
            });

            resp.on('end', function(){
                try {
                    user.address = JSON.parse(body);
                    return userController.update(req.user.id, user, res);
                } catch (e) {
                    console.log("Got error: " + e.message);
                    return res.status(400).send({error: {code: 400, message: 'Invalid Zip Code.'}});
                }
            });
        }).on("error", function(e){
            console.log("Got error: " + e.message);
        });
    },
    create: function (user, res) {
        Model.User.create(user).then(function() {
            return res.send({success: {message: 'Account successfully created.'}});
        }).catch(function(e) {
            console.log("Got error: " + e.message);
            return res.status(409).send({error: {code: 409, message: 'Email already in use.'}});
        });
    },
    update: function (id, data, res) {
        Model.User.update(data, {where: {id : id}}).then(function() {
            return res.send({success: {message: 'Account successfully updated.'}});
        }).catch(function(e) {
            console.log("Got error: " + e.message);
            return res.status(409).send({error: {code: 409, message: 'Email already in use.'}});
        });
    }
};

module.exports = userController;
