const conn = require('./conn');
const { Sequelize } = conn;

const Address = conn.define(
  'address',
  {
    lineOne: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: 'you must enter a street address!'
        }
      }
    },
    lineTwo: {
      type: Sequelize.STRING,
      allowNull: true
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: 'you must enter a city!'
        }
      }
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: 'you must enter a state!'
        }
      }
    },
    zipCode: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: 'you must enter a zip!'
        }
      }
    },
    latitude: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
    longitude: {
      type: Sequelize.FLOAT,
      allowNull: true
    }
  },
  {
    getterMethods: {
      fullAddress() {
        return `${this.lineOne} ${this.lineTwo} ${this.city} ${
          this.state
        } ${this.zipCode}`;
      }
    }
  }
);

module.exports = Address;
