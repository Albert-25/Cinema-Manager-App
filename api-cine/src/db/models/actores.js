const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");

const Actores = sequelize.define("Actores", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
},{  timestamps: false });

module.exports = { Actores };
