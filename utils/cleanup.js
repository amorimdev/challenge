var sequelize = require('../app/sequelize.js'),
    Model = require('../app/model/models.js'),
    session = require('express-session'),
    SequelizeStore = require('connect-session-sequelize')(session.Store);

var sessionStore = new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 7 * 24 * 60 * 60 * 1000
});

module.exports = function(callback) {
    Model.User.sync({ force: true }).then(function() {
        Model.User.create({
            name: 'user',
            email: 'user@user.com',
            password: '$2a$10$QaT1MdQ2DRWuvIxtNQ1i5O9D93HKwPKFNWBqiiuc/IoMtIurRCT36',
            salt: '$2a$10$QaT1MdQ2DRWuvIxtNQ1i5O',
            address: {}
        }).then(callback);

        Model.Wishlist.sync({ force: true })
    });

    sessionStore.sync();
};
