const conn = require('./conn');
const Order = require('./Order');
const { Sequelize } = conn;

const User = conn.define(
  'user',
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'you have to enter a firstName'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'you have to enter a firstName'
        }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'you have to enter a lastName'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'you have to enter a lastName'
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: {
        args: false,
        msg: 'you must enter a email'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'you must  enter a email'
        },
        isEmail: {
          args: true,
          msg: 'you must enter an email'
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'you have to enter a password'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'you must enter a password'
        }
      }
    }
  },
  {
    getterMethods: {
      name() {
        return this.firstName + ' ' + this.lastName;
      }
    },
    setterMethods: {
      fullName(value) {
        const names = value.split(' ');
        this.setDataValue('firstName', names.slice(0, -1).join(' '));
        this.setDataValue('lastName', names.slice(-1).join(' '));
      }
    }
  }
);
User.prototype.findOrCreateCart = function() {
  return Order.findOrCreate({
    where: { userId: this.id },
    defaults: { status: 'cart', userId: this.id }
  });
};
module.exports = User;
