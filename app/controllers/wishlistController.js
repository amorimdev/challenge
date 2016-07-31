var Model = require('../model/models.js');

var wishlistController = {
    listAll: function (req, res) {
        Model.Wishlist.findAll({
            where: {userId: req.user.id},
            order: '"name" ASC'
        }).then(function (wishlists) {
            return res.send({success: {wishlists: wishlists}});
        });
    },
    list: function (req, res) {
        Model.Wishlist.find({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        }).then(function (wishlist) {
            return res.send({success: {wishlist: wishlist}});
        }).catch(function(e) {
            console.log("Got error: " + e.message);
            return res.status(404).send({error: {code: 404, message: 'Wishlist does not found.'}});
        });
    },
    create: function (req, res) {
        var name = req.body.name,
            description = req.body.description,
            averageValue = req.body.averageValue;

        if (!name || !averageValue) {
            return res.status(400).send({error: {code: 400, message: 'Please, fill in all the required fields.'}});
        }

        var wishlist = {
            name: name,
            description: description,
            averageValue: averageValue,
            userId: req.user.id
        };

        Model.Wishlist.create(wishlist).then(function() {
            return res.send({success: {message: 'Wishlist successfully created.'}});
        }).catch(function(e) {
            console.log("Got error: " + e.message);
            return res.status(409).send({error: {code: 409, message: 'Wishlist create failure.'}});
        });
    },
    edit: function (req, res) {
        Model.Wishlist.find({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        }).then(function (wishlist) {
            var newWishlist = {
                name: (req.body.name) ? req.body.name : wishlist.name,
                description: (req.body.description) ? req.body.description : wishlist.description,
                averageValue: (req.body.averageValue) ? req.body.averageValue : wishlist.averageValue
            };

            Model.Wishlist.update(newWishlist, {where: {id : wishlist.id}}).then(function() {
                return res.send({success: {message: 'Wishlist successfully updated.'}});
            }).catch(function(e) {
                console.log("Got error: " + e.message);
                return res.status(409).send({error: {code: 409, message: 'Wishlist update failure.'}});
            });
        }).catch(function(e) {
            console.log("Got error: " + e.message);
            return res.status(404).send({error: {code: 404, message: 'Wishlist does not found.'}});
        });
    },
    delete: function (req, res) {
        Model.Wishlist.destroy({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        }).then(function () {
            return res.send({success: {message: 'Wishlist successfully deleted.'}});
        }).catch(function(e) {
            console.log("Got error: " + e.message);
            return res.status(404).send({error: {code: 404, message: 'Wishlist does not found.'}});
        });
    }
};

module.exports = wishlistController;
