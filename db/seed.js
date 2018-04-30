const db = require('./index.js');
const conn = require('./conn');
const faker = require('faker');
const { Category, Product, Order, LineItem, User, Address } = db.models;

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
const generateAddress = () => {
  return {
    streetName: faker.address.streetName(),
    secondaryAddress: faker.address.secondaryAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zipCode: faker.address.zipCode(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude()
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
        }).then(user => {
          Order.create({ userId: user.id });
          Address.create(generateAddress(), { userId: user.id });
        }),
        User.create(generateUser()).then(user => {
          Order.create({ userId: user.id });
          Address.create(generateAddress(), { userId: user.id });
        }),
        User.create(generateUser()).then(user => {
          Order.create({ userId: user.id });
          Address.create(generateAddress(), { userId: user.id });
        }),
        User.create(generateUser()).then(user => {
          Order.create({ userId: user.id });
          Address.create(generateAddress(), { userId: user.id });
        }),
        User.create(generateUser()).then(user => {
          Order.create({ userId: user.id });
          Address.create(generateAddress(), { userId: user.id });
        }),
        User.create(generateUser()).then(user => {
          Order.create({ userId: user.id });
          Address.create(generateAddress(), { userId: user.id });
        })
      ]);
    })

    .then(() => {
      return Promise.all([
        generateOrder(),
        generateOrder(),
        generateOrder(),
        generateOrder(),
        generateOrder(),
        generateOrder(),
        generateOrder(),
        generateOrder()
      ]);
    });
  // .then(() => {
  //   return Promise.all([
  //     Address.create(generateAddress()),
  //     Address.create(generateAddress()),
  //     Address.create(generateAddress()),
  //     Address.create(generateAddress()),
  //     Address.create(generateAddress()),
  //     Address.create(generateAddress())
  //   ]);
  // });
};
const main = () => {
  conn
    .sync({ force: true })
    .then(() => console.log('synced'))
    .then(() => seed())
    .then(() => {
      console.log('seeded');
      conn.close();
    })
    .catch(console.error);
};
main();
