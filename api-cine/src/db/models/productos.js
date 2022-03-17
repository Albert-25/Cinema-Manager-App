const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");

const Productos = sequelize.define("Productos", {
  nombreProducto: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
});

module.exports = { Productos };
