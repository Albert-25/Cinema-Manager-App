const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define("Productos", {
    nombreProducto: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    precio: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.STRING,
    },
    isCombo: {
      type: DataTypes.STRING,
    },
  });
};
