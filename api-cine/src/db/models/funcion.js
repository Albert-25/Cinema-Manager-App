const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define("Funcion", {
    sala: {
      type: DataTypes.STRING,
    },
    horario: {
      type: DataTypes.TEXT,
    },
    asientos: {
      type: DataTypes.STRING,
    },
  });
};
