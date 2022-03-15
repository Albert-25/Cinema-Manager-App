const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define("Compra", {
    correo: {
      type: DataTypes.STRING,
    },
    notas: {
      type: DataTypes.TEXT,
    },
    total: {
      type: DataTypes.STRING,
    },
  });
};
