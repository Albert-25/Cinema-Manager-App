const { Pelicula } = require("../db/models/pelicula");
const { Generos } = require("../db/models/generos");
const { Actores } = require("../db/models/actores");

//desarrollar aqui las funciones para los pedidos a la base de datos
const getAll = async (req, res) => {
  try {
    const pedidoDB = await Pelicula.findAll({ include: Generos, Actores });
    res.send(pedidoDB);
  } catch {
    res.send({ msg: "error" });
  }
};

module.exports = {
  //funciones a exportar para las rutas
  getAll,
};
