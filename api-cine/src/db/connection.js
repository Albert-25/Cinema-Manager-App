const { Sequelize } = require("sequelize");
const { DATABASE } = require("../../config.js");

const sequelize = new Sequelize(DATABASE.uri, {
   logging: false,
   native: false,
   dialectOptions: DATABASE.opt,
});

module.exports = { sequelize };
