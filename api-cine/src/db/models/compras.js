const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");
const { Productos } = require("./productos.js");
const { Funciones } = require("./funcion.js");

const Compra = sequelize.define(
  "Compra",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    products: {
      type: DataTypes.JSON,
      allowNull:false,
    },
    Nombre: {
      type: DataTypes.STRING,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    verificado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  { timestamps: false }
);

Funciones.belongsToMany(Compra, { through: "CompraFuncion" });
Compra.belongsToMany(Funciones, { through: "CompraFuncion" });

Productos.belongsToMany(Compra, { through: "CompraProductos" });
Compra.belongsToMany(Productos, { through: "CompraProductos" });

module.exports = { Compra };
