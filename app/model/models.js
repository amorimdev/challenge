var connection = require('../sequelize.js'),
    UserMeta = require('./User.js'),
    WishlistMeta = require('./Wishlist.js');

var User = connection.define('users', UserMeta.attributes, UserMeta.options);
var Wishlist = connection.define('wishlist', WishlistMeta.attributes, WishlistMeta.options);

User.hasMany(Wishlist, {as: 'Wishlists'});
Wishlist.belongsTo(User);

module.exports.User = User;
module.exports.Wishlist = Wishlist;
