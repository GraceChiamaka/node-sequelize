const Sequelize = require("sequelize");
const sequelize = require('../utils/database');

const Order = sequelize.define("order", {
    id: {
        type: Sequelize.INTEGER,
        allowIncrement: true,
        allowNull: false,
        primaryKey: true
    },
});

module.exports = Order;