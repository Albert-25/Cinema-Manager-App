const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("ProximosEstrenos", {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    sinopsis: {
      type: DataTypes.TEXT,
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duracion: {
      type: DataTypes.INTEGER,
    },
    clasificacion: {
      type: DataTypes.STRING,
    },
    director: {
      type: DataTypes.STRING,
    },
    pais: {
      type: DataTypes.STRING,
    },
    distribuidora: {
      type: DataTypes.STRING,
    },
    trailer: {
      type: DataTypes.STRING,
    },
  });
};
