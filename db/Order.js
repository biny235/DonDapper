const conn = require("./conn");
const { Sequelize } = conn;

const Order = conn.define("order", {
  status: {
    type: Sequelize.STRING,
    defaultValue: "cart"
  }
});

module.exports = Order;
