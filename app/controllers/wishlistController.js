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
            if (!wishlist || wishlist.id != req.params.id) {
                throw new Error('Wishlist does not found.')
            }

            return res.send({success: {wishlist: wishlist}});
        }).catch(function(e) {
            console.log("Got error: " + e.message);
            return res.status(404).send({error: {code: 404, message: e.message}});
        });
    },
    create: function (req, res) {
        var name = req.body.name,
            description = req.body.description,
            averageValue = req.body.averageValue;

        if (!name || !averageValue) {
            return res.status(422).send({error: {code: 422, message: 'Please, fill in all the required fields.'}});
        }

        var wishlist = {
            name: name,
            description: description,
            averageValue: averageValue,
            userId: req.user.id
        };

        Model.Wishlist.create(wishlist).then(function(entity) {
            return res.send({success: {message: 'Wishlist successfully save.', wishlist: entity}});
        }).catch(function(e) {
            console.log("Got error: " + e.message);
            return res.status(409).send({error: {code: 409, message: 'Wishlist save failure.'}});
        });
    },
    edit: function (req, res) {
        Model.Wishlist.find({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        }).then(function (wishlist) {
            if (!wishlist || wishlist.id != req.params.id) {
                throw new Error('Wishlist does not found.')
            }
            
            var newWishlist = {
                name: (req.body.name) ? req.body.name : wishlist.name,
                description: (req.body.description) ? req.body.description : wishlist.description,
                averageValue: (req.body.averageValue) ? req.body.averageValue : wishlist.averageValue
            };

            Model.Wishlist.update(newWishlist, {where: {id : wishlist.id}}).then(function(entity) {
                return res.send({success: {message: 'Wishlist successfully save.', wishlist: entity}});
            }).catch(function(e) {
                console.log("Got error: " + e.message);
                return res.status(409).send({error: {code: 409, message: 'Wishlist save failure.'}});
            });
        }).catch(function(e) {
            console.log("Got error: " + e.message);
            return res.status(404).send({error: {code: 404, message: e.message}});
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
