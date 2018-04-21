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
      console.log(userList[1].findOrCreateCart());
    });
    it(' a new user gets a new cart ', () => {
      User.create({
        fullName: 'jack jack',
        email: 'j@aol.com',
        password: 'abcd1234'
      }).then(user => {
        userList.jack = user;
        console.log(userList.jack.findOrCreateCart());
      });
    });
  });
});
