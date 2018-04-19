const conn = require('./conn');

const Category = require('./Category');
const Product = require('./Product');
const Order = require('./Order')
const LineItem = require('./LineItem');
const User = require('./User');

const syncAndSeed = ()=>{
  return conn.sync({ force: true })
}

Category.belongsToMany(Product, {through: 'ProductCategory'});

Product.belongsToMany(Category, {through: 'ProductCategory'})
Product.hasMany(LineItem)


Order.hasMany(LineItem);
LineItem.belongsTo(Order);
LineItem.belongsTo(Product);



User.hasMany(Order);

module.exports = {
  syncAndSeed,
  models: {
    Category,
    Product,
    Order,
    LineItem,
    User
  }}
