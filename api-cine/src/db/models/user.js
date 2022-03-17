const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    passwd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
)

User.beforeCreate(async (user, _options) => {
  const hash = await bcrypt.hash(user.passwd, 10)
  user.passwd = hash
})

module.exports = { User };
