const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");
const { Productos } = require("./productos.js");
const { Pelicula } = require("./pelicula.js");

const Compra = sequelize.define("Compra", {
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notas: {
    type: DataTypes.TEXT,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Pelicula.belongsToMany(Compra, { through: "CompraPelicula" });
Compra.belongsToMany(Pelicula, { through: "CompraPelicula" });

Productos.belongsToMany(Compra, { through: "CompraProductos" });
Compra.belongsToMany(Productos, { through: "CompraProductos" });

module.exports = { Compra };
