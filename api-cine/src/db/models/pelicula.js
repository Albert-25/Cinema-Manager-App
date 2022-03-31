const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");
const { Actores } = require("./actores.js");
const { Generos } = require("./generos.js");

const Pelicula = sequelize.define(
   "Pelicula",
   {
      titulo: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      sinopsis: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
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
    proximoEstreno: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Generos.belongsToMany(Pelicula, { through: "PeliculaGenero" });
Pelicula.belongsToMany(Generos, { through: "PeliculaGenero" });

Actores.belongsToMany(Pelicula, { through: "PeliculaActor" });
Pelicula.belongsToMany(Actores, { through: "PeliculaActor" });

module.exports = { Pelicula };
