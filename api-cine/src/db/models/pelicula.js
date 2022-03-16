const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");
const { bcrypt } = require("bcrypt");
const Actores = require("./actores.js");
const Generos = require("./generos.js");

const Pelicula = sequelize.define("Pelicula", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  sinopsis: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  poster: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duracion: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clasificacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  director: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  puntuación: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  pais: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  distribuidora: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trailer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Generos.belongsToMany(Pelicula, { through: "PeliculaGenero" });
Pelicula.belongsToMany(Generos, { through: "PeliculaGenero" });

Actores.belongsToMany(Pelicula, { through: "PeliculaActor" });
Pelicula.belongsToMany(Actores, { through: "PeliculaActor" });

module.exports = Pelicula;
