const conn = require("./conn");
const { Sequelize } = conn;

const Order = conn.define("Order", {
  status: {
    type: Sequelize.STRING,
    defaultValue: "cart"
  }
});

module.exports = Order;
