const Sequelize = require("sequelize");
const sequelize = require('../utils/database');

const OrderItem = sequelize.define("orderItem", {
    id: {
        type: Sequelize.INTEGER,
        allowIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
});

module.exports = OrderItem;