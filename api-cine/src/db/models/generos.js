const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define("Generos", {
    genero: {
      type: DataTypes.STRING,
    },
  });
};
