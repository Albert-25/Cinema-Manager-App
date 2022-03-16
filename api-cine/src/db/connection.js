const { Sequelize } = require('sequelize')
const { DATABASE_URI } = require('../../config.js')
const sequelize = new Sequelize(DATABASE_URI, { logging: false, native: false })

module.exports = { sequelize }
