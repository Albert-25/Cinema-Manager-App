const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Funcion", {
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
  });
};
