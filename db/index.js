const conn = require("./conn");

const Category = require("./Category");
const Product = require("./Product");
const Order = require("./Order");
const LineItem = require("./LineItem");
const User = require("./User");

const syncAndSeed = ()=>{
  return conn.sync({ force: true })
}

Category.hasMany(Product);
Product.belongsToMany(Category)

Order.hasMany(LineItem);
LineItem.belongsTo(Order);



User.hasMany(Order);

module.exports = {
  syncAndSeed,
  models: {
    Category,
    Product,
    Order,
    LineItem,
    User
  }
};
