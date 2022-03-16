const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Comentarios", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    puntuación: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
};
