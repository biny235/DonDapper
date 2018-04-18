const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgress://localhost/grace_shopper_db');

module.exports = conn;
