const { Sequelize } = require('sequelize')
const { DATABASE_URI } = require('../../config.js')

const opt = process.env.NODE_ENV === 'production'
   ? {
      ssl: {
         require: true,
         rejectUnauthorized: false
      }
   }
   : null;

const sequelize = new Sequelize(DATABASE_URI, {
   logging: false,
   native: false,
   dialectOptions: opt
})

module.exports = { sequelize }
