const { Sequelize } = require("sequelize");
const { DATABASE_URI } = require("../../config.js");
const sequelize = new Sequelize(DATABASE_URI, {
   logging: false,
   native: false,

   dialectOptions: {
 
   },

});

module.exports = { sequelize };
