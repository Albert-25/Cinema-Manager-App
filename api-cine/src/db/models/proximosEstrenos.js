// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//   sequelize.define("ProximosEstrenos", {
//     titulo: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     sinopsis: {
//       type: DataTypes.TEXT,
//     },
//     poster: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     duracion: {
//       type: DataTypes.INTEGER,
//     },
//     clasificacion: {
//       type: DataTypes.STRING,
//     },
//     director: {
//       type: DataTypes.STRING,
//     },
//     pais: {
//       type: DataTypes.STRING,
//     },
//     distribuidora: {
//       type: DataTypes.STRING,
//     },
//     trailer: {
//       type: DataTypes.STRING,
//     },
//   });
// };

const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");
const { bcrypt } = require("bcrypt");
const Actores = require("./actores.js");
const Generos = require("./generos.js");

const ProximosEstrenos = sequelize.define("ProximosEstrenos", {
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

Actores.belongsToMany(ProximosEstrenos, { through: "ProximosEstrenosActores" });
ProximosEstrenos.belongsToMany(Actores, { through: "ProximosEstrenosActores" });

Generos.belongsToMany(ProximosEstrenos, { through: "ProximosEstrenosGeneros" });
ProximosEstrenos.belongsToMany(Generos, { through: "ProximosEstrenosGeneros" });

module.exports = ProximosEstrenos;
