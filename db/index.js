const conn = require('./conn');

const Category = require('./Category');
const Product = require('./Products');
const Order = require('./Order')
const LineItem = require('./LineItem');
const User = require('./User');

conn.syncAndSeed = ()=>{
  return conn.seed({ force: true })
}

Product.hasMany(Category);
Product.belongsTo(Category, {alias: categoryId});

Order.hasMany(LineItem);
LineItem.hasOne(Product);

User.hasMany(Order);

module.exports = {
  db,
  syncAndSeed,
  models: {
    Category,
    Product,
    Order,
    LineItem,
    User
  }}
