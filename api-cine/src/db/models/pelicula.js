const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define("Pelicula", {
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
    puntuación: {
      type: DataTypes.FLOAT,
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
