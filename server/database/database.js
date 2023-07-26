// database.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense', 'root', 'Fifa#2255', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
