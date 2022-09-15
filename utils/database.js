const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'grace2011',
    { dialect: 'mysql', host: 'localhost' });
 
module.exports = sequelize;