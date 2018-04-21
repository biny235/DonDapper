const conn = require('./conn');
const faker = require('faker');

const Category = require('./Category');
const Product = require('./Product');
const Order = require('./Order');
const LineItem = require('./LineItem');
const User = require('./User');

const generateProduct = () => {
  return {
    name: faker.commerce.product(),
    imgUrl: faker.image.image(),
    description: faker.commerce.productMaterial(),
    price: faker.commerce.price(),
    quantity: 5,
    categoryId: Math.floor(Math.random() * 3) + 1
  };
};

const generateUser = () => {
  return {
    fullName: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };
};

const generateOrder = () => {
  orderId = Math.floor(Math.random() * 5) + 1;
  return Promise.all([
    LineItem.create({
      quantity: Math.floor(Math.random() * 5) + 1,
      productId: Math.floor(Math.random() * 10) + 1,
      orderId
    }),
    LineItem.create({
      quantity: Math.floor(Math.random() * 5) + 1,
      productId: Math.floor(Math.random() * 10) + 1,
      orderId
    }),
    LineItem.create({
      quantity: Math.floor(Math.random() * 5) + 1,
      productId: Math.floor(Math.random() * 10) + 1,
      orderId
    })
  ]);
};

const seed = () => {
  return Promise.all([
    Category.create({ name: 'Kits', imgUrl: '/img/default.png' }),
    Category.create({ name: 'Individual', imgUrl: '/img/default.png' }),
    Category.create({ name: 'Accessories', imgUrl: '/img/default.png' })
  ])

    .then(() => {
      return Promise.all([
        Product.create(generateProduct()),
        Product.create(generateProduct()),
        Product.create(generateProduct()),
        Product.create(generateProduct()),
        Product.create(generateProduct()),
        Product.create(generateProduct()),
        Product.create(generateProduct()),
        Product.create(generateProduct()),
        Product.create(generateProduct()),
        Product.create(generateProduct())
      ]);
    })
    .then(() => {
      Promise.all([
        User.create(generateUser()),
        User.create(generateUser()),
        User.create(generateUser()),
        User.create(generateUser()),
        User.create(generateUser())
      ]);
    })
    .then(() => {
      Promise.all([
        Order.create({ userId: Math.floor(Math.random() * 5) + 1 }),
        Order.create({ userId: Math.floor(Math.random() * 5) + 1 }),
        Order.create({ userId: Math.floor(Math.random() * 5) + 1 }),
        Order.create({ userId: Math.floor(Math.random() * 5) + 1 }),
        Order.create({ userId: Math.floor(Math.random() * 5) + 1 })
      ]);
    })
    .then(() => {
      generateOrder();
      generateOrder();
      generateOrder();
    });
};

const syncAndSeed = () => {
  return conn.sync({ force: true }).then(() => seed());
};

Product.belongsTo(Category);
Product.hasMany(LineItem);

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
  }
};
