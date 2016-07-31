var Model = require('../app/model/models.js');

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
};
