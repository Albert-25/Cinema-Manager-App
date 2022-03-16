// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//   sequelize.define("Generos", {
//     genero: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//   });
// };

const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");
const { bcrypt } = require("bcrypt");

const Generos = sequelize.define("Generos", {
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Generos;
