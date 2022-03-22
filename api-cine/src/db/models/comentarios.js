const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");
const { Pelicula } = require("../models/pelicula.js")

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
}, { timestamps: true });

Pelicula.belongsToMany(Comentarios, { through: "PeliculaComentario" });
Comentarios.belongsToMany(Pelicula, { through: "PeliculaComentario" });

module.exports = { Comentarios };
