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
    lineOne: faker.address.streetName(),
    lineTwo: faker.address.secondaryAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zipCode: faker.address.zipCode(),
    lat: faker.address.latitude(),
    lng: faker.address.longitude()
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
  let orderId = Math.floor(Math.random() * 6) + 1;
  return Promise.all([
    LineItem.create({
      quantity: Math.floor(Math.random() * 5) + 1,
      productId: Math.floor(Math.random() * 9) + 1,
      orderId
    }),
    LineItem.create({
      quantity: Math.floor(Math.random() * 5) + 1,
      productId: Math.floor(Math.random() * 9) + 1,
      orderId
    }),
    LineItem.create({
      quantity: Math.floor(Math.random() * 5) + 1,
      productId: Math.floor(Math.random() * 9) + 1,
      orderId
    })
  ]);
};

const seed = () => {
  return Promise.all([
    Category.create({ name: 'Look', imageUrl: '/img/default.png' }),
    Category.create({ name: 'Feel', imageUrl: '/img/default.png' }),
    Category.create({ name: 'Smell', imageUrl: '/img/default.png' })
  ])
    .then(() => {
      return Promise.all([
        Product.create({
          name: 'Cologne',
          description: `It's breezy. It's lofty. It's sultry. Our cologne attracts.`,
          imageUrl: 'images/cologne.jpg',
          price: 18,
          categoryId: 3
        }),
        Product.create({
          name: 'Comb',
          description: `Our multi-purpose comb can tidy your hair up top, on your face, anywhere.`,
          imageUrl: 'images/comb.jpg',
          price: 8,
          categoryId: 1
        }),
        Product.create({
          name: 'Conditioner',
          description: `Keep your hair soft and luscious with our proprietary conditioner.`,
          imageUrl: 'images/conditioner.jpg',
          price: 12,
          categoryId: 2
        }),
        Product.create({
          name: 'Cream',
          description: `Lather that face up. Our shaving cream prevents nicks and cuts. Your shave will never be smoother.`,
          imageUrl: 'images/cream.jpg',
          price: 10,
          categoryId: 1
        }),
        Product.create({
          name: 'Deodorant',
          description: `Kick it old school and puff away. This is no ordinary deodorant.`,
          imageUrl: 'images/deodorant.jpg',
          price: 9,
          categoryId: 3
        }),
        Product.create({
          name: 'Pomade',
          description: `It's time to drop that gel and step up your hair game. With pomade, your hair will look its best without crusting or flaking.`,
          imageUrl: 'images/pomade.jpg',
          price: 11,
          categoryId: 1
        }),
        Product.create({
          name: 'Razor',
          description: `Why pay for a bajillion blades? You only need one! Our safety razor will keep your face freshly shaven and your wallet fat.`,
          imageUrl: 'images/razor.jpg',
          price: 9,
          categoryId: 1
        }),
        Product.create({
          name: 'Shampoo',
          description: `Don't throw chemicals at your precious hair. Our shampoo is all natural.`,
          imageUrl: 'images/shampoo.jpg',
          price: 12,
          categoryId: 2
        }),
        Product.create({
          name: 'Soap',
          description: `Everybody knows body wash is a joke. Take cleanliness seriously with a classic bar.`,
          imageUrl: 'images/soap.jpg',
          price: 15,
          categoryId: 2
        })
      ]);
    })
    .then(() => {
      return Promise.all([
        User.create({
          fullName: 'Test User',
          email: 'test@test.com',
          password: '123456'
        }).then(user => {
          return Address.create(generateAddress()).then(address => {
            address.update({ userId: user.id });
            Order.create({ userId: user.id, addressId: address.id });
          });
        }),
        User.create({
          fullName: 'Test Admin',
          email: 'test@admin.com',
          password: '123456',
          admin: true
        }).then(user => {
          return Address.create(generateAddress()).then(address => {
            address.update({ userId: user.id });
            Order.create({ userId: user.id, addressId: address.id });
          });
        }),
        User.create(generateUser()).then(user => {
          return Address.create(generateAddress()).then(address => {
            address.update({ userId: user.id });
            Order.create({ userId: user.id, addressId: address.id });
          });
        }),
        User.create(generateUser()).then(user => {
          return Address.create(generateAddress()).then(address => {
            address.update({ userId: user.id });
            Order.create({ userId: user.id, addressId: address.id });
          });
        }),
        User.create(generateUser()).then(user => {
          return Address.create(generateAddress()).then(address => {
            address.update({ userId: user.id });
            Order.create({ userId: user.id, addressId: address.id });
          });
        }),
        User.create(generateUser()).then(user => {
          return Address.create(generateAddress()).then(address => {
            address.update({ userId: user.id });
            Order.create({ userId: user.id, addressId: address.id });
          });
        }),
        User.create(generateUser()).then(user => {
          return Address.create(generateAddress()).then(address => {
            address.update({ userId: user.id });
            Order.create({ userId: user.id, addressId: address.id });
          });
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
