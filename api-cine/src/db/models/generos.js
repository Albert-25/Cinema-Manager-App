const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");

const Generos = sequelize.define("Generos", {
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
},{ timestamps: false });

module.exports = { Generos };
