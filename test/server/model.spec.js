const expect = require('chai').expect;
const db = require('../../db');
const { User, Order } = db.models;
const Sequelize = require('sequelize');
let userList;

beforeEach(() => {
  return db.syncAndSeed();
});

describe('models', () => {
  User.findAll().then(users => {
    userList = users.reduce((obj, user) => {
      obj[user.id] = user;
      return obj;
    }, {});
  });
  describe('User', () => {
    it('exists', () => {
      expect(User).to.be.ok;
    });

    it(' a user has a cart exists', () => {
      return userList[1]
        .findOrCreateCart()
        .then(() => Order.findAll())
        .then(cart => {
          expect(cart.length).to.equal(5);
        });
    });
    it(' a new user gets a new cart ', () => {
      User.create({
        fullName: 'jack jack',
        email: 'j@aol.com',
        password: 'abcd1234'
      })
        // )
        .then(user => {
          return user.findOrCreateCart();
        })
        .then(() =>
          Order.findOne({
            where: { userId: 6 }
          })
        )
        .then(order => {
          expect(order).to.be.ok;
        });
    });
  });
});
