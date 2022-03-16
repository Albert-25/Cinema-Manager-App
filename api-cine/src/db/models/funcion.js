const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");
const { bcrypt } = require("bcrypt");
const Pelicula = require("./pelicula.js");

const Funcion = sequelize.define("Funcion", {
  sala: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  horario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  asientos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Pelicula.belongsToMany(Funcion, { through: "FuncionPelicula" });
Funcion.belongsToMany(Pelicula, { through: "FuncionPelicula" });

module.exports = Funcion;
