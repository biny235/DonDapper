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
          msg: 'First Name cannot be empty'
        }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: 'Last Name cannot be empty'
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      unique: {
        args: [true],
        msg: 'E-mail is taken'
      },
      allowNull: false,
      validate: {
        isEmail: {
          args: [true],
          msg: 'E-mail is invalid'
        },
        notEmpty: {
          args: [true],
          msg: 'E-mail cannot be empty'
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: 'Password cannot be empty'
        }
      }
    },
    admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
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
