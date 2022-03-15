const { Actores } = require("../db/models/actores");

//desarrollar aqui las funciones para los pedidos a la base de datos
const pin = async (req, res) => {
  return res.json({ msg: "pong" });
};

module.exports = {
  pin,
  //funciones a exportar para las rutas
};
