const conn = require('./conn');
const faker = require('faker');
const jwt = require('jwt-simple');
const secret = process.env.SECRET;


const Category = require('./Category');
const Product = require('./Product');
const Order = require('./Order');
const LineItem = require('./LineItem');
const User = require('./User');


const generateProduct = () => {
  return {
    name: faker.commerce.product(),
    imageUrl: faker.image.image(),
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
    password: '123456'
  };
};

const generateOrder = () => {
  orderId = Math.floor(Math.random() * 6) + 1;
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
    Category.create({ name: 'Kits', imageUrl: '/img/default.png' }),
    Category.create({ name: 'Individual', imageUrl: '/img/default.png' }),
    Category.create({ name: 'Accessories', imageUrl: '/img/default.png' })
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
      return Promise.all([
        User.create({
          fullName: 'Test User',
          email: 'test@test.com',
          password: '123456'
        }),
        User.create(generateUser()),
        User.create(generateUser()),
        User.create(generateUser()),
        User.create(generateUser()),
        User.create(generateUser())
      ]);
    })
    .then(() => {
      return Promise.all([
        Order.create({ userId: 1 }),
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
      generateOrder();
      generateOrder();
      generateOrder();
      generateOrder();
    });
};

const syncAndSeed = () => {
  return conn.sync(); //.then(() => seed());
};

Product.belongsTo(Category);
Product.hasMany(LineItem);

Order.hasMany(LineItem);

LineItem.belongsTo(Order);
LineItem.belongsTo(Product);

User.hasMany(Order);

User.findOrCreateCart = function (userId) {
  return Order.findOrCreate({
    where: { userId },
    defaults: { status: 'cart', userId },
    include: [{ model: LineItem }]
  });
};

User.authenticate = function (user) {
  const { email, password } = user;
  console.log(secret)
  return User.find({
    where: { email, password },
    attributes: ['id', 'firstName', 'lastName', 'email']
  })
    .then(user => {
      if (!user) {
        throw { status: 401 };
      }
      return jwt.encode({ id: user.id }, secret);
    });
};

User.exchangeToken = function (token) {
  try {
    const id = jwt.decode(token, secret).id;
    return User.findById(id)
      .then(user => {
        if (user) {
          return user;
        }
        throw { status: 401 };
      });

  }
  catch (err) {
    return Promise.reject({ status: 401 });
  }
};

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
