const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");
const { Pelicula } = require("./pelicula.js");

const Funciones = sequelize.define(
  "Funciones",
  {
    sala: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    horario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    asientos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    detalle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Pelicula.belongsToMany(Funciones, { through: "FuncionesPelicula" });
Funciones.belongsToMany(Pelicula, { through: "FuncionesPelicula" });

module.exports = { Funciones };
