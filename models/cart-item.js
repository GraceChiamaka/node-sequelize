const Sequelize = require("sequelize");
const sequelize = require('../utils/database');

const CartItem = sequelize.define("cartItem", {
    id: {
        type: Sequelize.INTEGER,
        allowIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
});

module.exports = CartItem;