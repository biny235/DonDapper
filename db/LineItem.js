const conn = require('./conn');
const { Sequelize } = conn;

const LineItem = conn.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: {
      args: false,
      msg: 'quantity muse be at least 1'
    },
    validate: {
      min: {
        args: 1,
        msg: 'quantity muse be at least 1'
      }
    }
  }
});

module.exports = LineItem;
