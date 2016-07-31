var Sequelize = require('sequelize'),
    sequelize = new Sequelize('postgres://challenge:challenge@challenge.cnrkxerex151.sa-east-1.rds.amazonaws.com:5432/challenge');

module.exports = sequelize;
