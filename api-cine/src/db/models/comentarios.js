const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");
const { bcrypt } = require("bcrypt");

const Comentarios = sequelize.define("Comentarios", {
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

module.exports = Comentarios;
