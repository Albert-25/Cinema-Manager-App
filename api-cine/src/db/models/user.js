const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");
const bcrypt = require('bcrypt')

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Please enter valid email'
      }
    }
  },
  passwd: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, { timestamps: false })

User.beforeCreate(async (user, _options) => {
  user.passwd = await bcrypt.hash(user.passwd, 10)
})

module.exports = { User };
