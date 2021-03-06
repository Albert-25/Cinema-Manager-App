const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");
const { Pelicula } = require("./pelicula.js");

const Funciones = sequelize.define(
  "Funciones",
  {
    id:{
      type: DataTypes.STRING,
      primaryKey: true,
    },
    sala: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    priceID: {
      type: DataTypes.STRING,
    },
    horario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    asientos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxAsientos: {
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
