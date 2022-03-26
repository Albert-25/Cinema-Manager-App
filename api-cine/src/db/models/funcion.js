const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");
const { Pelicula } = require("./pelicula.js");

const Funcion = sequelize.define(
  "Funcion",
  {
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

Pelicula.belongsToMany(Funcion, { through: "FuncionPelicula" });
Funcion.belongsToMany(Pelicula, { through: "FuncionPelicula" });

module.exports = { Funcion };
