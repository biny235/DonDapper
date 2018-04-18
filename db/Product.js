const conn = require('./conn');
const { Sequelize } = conn;

const Product = conn.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: '/images/default-photo.jpg'
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  price: {
    type: Sequelize.FLOAT
  },
  quantity: {
    type: Sequelize.INTEGER
  }
});

module.exports = Product;
