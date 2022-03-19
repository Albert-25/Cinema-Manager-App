const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");

const Generos = sequelize.define("Generos", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
},{ timestamps: false });

Generos.bulkCreate([{name:'Action'},{name: 'Fiction'}])
  .then(r => console.log(r))
  .catch(err => console.log(err))

module.exports = { Generos };
