var Sequelize = require('sequelize');

var attributes = {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING
    },
    averageValue: {
        type: Sequelize.NUMERIC
    }
};

var options = {
    freezeTableName: true
};

module.exports.attributes = attributes;
module.exports.options = options;
