const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Productos", {
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
};
