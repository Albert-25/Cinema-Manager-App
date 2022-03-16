const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Compra", {
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
};
