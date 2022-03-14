const { sequelize } = require('../connection')
const { DataTypes } = require('sequelize')
const { bcrypt } = require('bcrypt')

const User = sequelize.define(
  'User',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    passwd: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: false
  }
)

// User.beforeCreate(async (user, _options) => {
//   const hash = await bcrypt.hash(user.passwd, 10)
//   user.passwd = hash
// })

module.exports = { User }