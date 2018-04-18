const conn = require("./conn");
const { Sequelize } = conn;

const User = conn.define(
  "user",
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: "you have to enter a firstName"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "you have to enter a firstName"
        }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: "you have to enter a lastName"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "you have to enter a lastName"
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: {
        args: false,
        msg: "you must enter a email"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "you must  enter a email"
        },
        isEmail: {
          args: true,
          msg: "you must enter an email"
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: "you have to enter a password"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "you must enter a password"
        }
      }
    }
  },
  {
    getterMethods: {
      name() {
        return this.firstName + " " + this.lastName;
      }
    }
  }
);

module.exports = User;
