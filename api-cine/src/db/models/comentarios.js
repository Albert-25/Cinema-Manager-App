const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define("Comentarios", {
    nombre: {
      type: DataTypes.STRING,
    },
    comentario: {
      type: DataTypes.TEXT,
    },
    puntuación: {
      type: DataTypes.FLOAT,
    },
  });
};
