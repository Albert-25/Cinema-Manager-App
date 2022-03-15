const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define("ProximosEstrenos", {
    titulo: {
      type: DataTypes.STRING,
    },
    sinopsis: {
      type: DataTypes.TEXT,
    },
    poster: {
      type: DataTypes.STRING,
    },
    duracion: {
      type: DataTypes.STRING,
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
