const conn = require('./conn');
const { Sequelize } = conn;

const User = conn.define(
  'user',
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'you must enter a first name!'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'you must enter a first name!'
        }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'you must enter a last name!'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'you must enter a last name!'
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      isUnique: true,
      allowNull: {
        args: false,
        msg: 'you must enter an email!'
      },
      isEmail: {
        args: true,
        msg: 'you must enter a valid email'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'you must enter an email!'
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

module.exports = User;
