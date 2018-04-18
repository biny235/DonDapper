const conn = require('./conn');
const { Sequelize } = conn;

const Category = conn.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: '/images/default-photo.jpg'
  }
});

module.exports = Category;
