const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define("Actores", {
    nombre: {
      type: DataTypes.STRING,
    },
  });
};
