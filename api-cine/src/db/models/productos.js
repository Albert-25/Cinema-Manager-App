const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");
const { Pelicula } = require("./pelicula");

const Productos = sequelize.define(
  "Productos",
  {
    id:{
      type: DataTypes.STRING,
      primaryKey: true,
    },
    priceID:{
      type: DataTypes.STRING,
    },
    nombreProducto: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imagenProducto: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isCombo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Pelicula.belongsToMany(Productos, { through: "ProductosPelicula" });
Productos.belongsToMany(Pelicula, { through: "ProductosPelicula" });

module.exports = { Productos };
