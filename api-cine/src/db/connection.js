const { Sequelize } = require("sequelize");
const { DATABASE_URI } = require("../../config.js");

// Connection to Heroku database
const sequelize = new Sequelize(DATABASE_URI, {
   logging: false,
   native: false,
   dialectOptions: {
      require: true,
      rejectUnauthorized: false,
   },
},
);

module.exports = { sequelize };
