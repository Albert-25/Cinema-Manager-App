const { Sequelize } = require("sequelize");
const { DATABASE_URI } = require("../../config.js");

// Connection to Heroku database
/* const sequelize = new Sequelize(DATABASE_URI, {
   logging: false,
   native: false,
   dialectOptions: {
      require: true,
      rejectUnauthorized: false,
   },
},
); */

// Connection to Heroku database
const sequelize = new Sequelize(DATABASE_URI, {
   logging: false,
   native: false,
   dialectOptions: {
      ssl: {
         require: true,
         rejectUnauthorized: false,
      },
   },
});

sequelize
   .authenticate()
   .then(() => {
      console.log("Connection has been established successfully.");
   })
   .catch((err) => {
      console.error("Unable to connect to the database:", err);
   });

module.exports = { sequelize };
