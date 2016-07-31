var Sequelize = require('sequelize');

var attributes = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    },
    averageValue: {
        type: Sequelize.NUMERIC,
        allowNull: false
    }
};

var options = {
    freezeTableName: true
};

module.exports.attributes = attributes;
module.exports.options = options;
