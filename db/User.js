const conn = require('./conn');
const { Sequelize } = conn;

const User = conn.define(
  'user',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: 'you must enter a first name!'
        }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: 'you must enter a last name!'
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          args: [true],
          msg: 'you must enter a valid email'
        },
        notEmpty: {
          args: [true],
          msg: 'you must enter an email!'
        }
      }
    },
    password: {
      type: Sequelize.STRING,

      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: 'must enter a password'
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
