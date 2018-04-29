const conn = require('./conn');
const jwt = require('jwt-simple');
const secret = process.env.SECRET;

const Category = require('./Category');
const Product = require('./Product');
const Order = require('./Order');
const LineItem = require('./LineItem');
const User = require('./User');

Product.belongsTo(Category);
Product.hasMany(LineItem);

Order.hasMany(LineItem);

LineItem.belongsTo(Order);
LineItem.belongsTo(Product);

User.hasMany(Order);

User.findOrCreateCart = function(userId) {
  return Order.findOrCreate({
    where: { status: 'cart', userId },
    defaults: { status: 'cart', userId },
    include: [{ model: LineItem }]
  });
};

User.authenticate = function(user) {
  const { email, password } = user;
  console.log(secret);
  return User.find({
    where: { email, password },
    attributes: ['id', 'firstName', 'lastName', 'email']
  }).then(user => {
    if (!user) {
      throw { status: 401 };
    }
    return jwt.encode({ id: user.id }, secret);
  });
};

User.exchangeToken = function(token) {
  try {
    const id = jwt.decode(token, secret).id;
    return User.findById(id).then(user => {
      if (user) {
        return user;
      }
      throw { status: 401 };
    });
  } catch (err) {
    return Promise.reject({ status: 401 });
  }
};

module.exports = {
  models: {
    Category,
    Product,
    Order,
    LineItem,
    User
  }
};
