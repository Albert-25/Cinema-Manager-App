const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");

const Generos = sequelize.define("Generos", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
},{ timestamps: false });

module.exports = { Generos };
