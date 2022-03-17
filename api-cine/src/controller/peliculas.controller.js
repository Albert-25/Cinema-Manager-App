const { Pelicula } = require("../db/models/pelicula");
const { Generos } = require("../db/models/generos");
const { Actores } = require("../db/models/actores");

const getAll = async (_req, res) => {
  try {
    const pedidoDB = await Pelicula.findAll({ include: Generos, Actores });
    res.send(pedidoDB);
  } catch {
    res.send({ msg: "error" });
  }
};

const insert = async (req, res, next) => {
  if (
    !req.body.titulo || !req.body.sinopsis || !req.body.poster || !req.body.duracion ||
    !req.body.clasificacion || !req.body.director || !req.body.puntuación ||
    !req.body.pais || !req.body.distribuidora || !req.body.trailer
  ) {
    return res.status(406).json({ msg: 'All atrributes are required' })
  }
  try {
    const movie = await Pelicula.create({
      titulo: req.body.titulo,
      sinopsis: req.body.sinopsis,
      poster: req.body.poster,
      duracion: req.body.duracion,
      clasificacion: req.body.clasificacion,
      director: req.body.director,
      puntuación: req.body.puntuación,
      pais: req.body.pais,
      distribuidora: req.body.distribuidora,
      trailer: req.body.trailer
    })
    res.json(movie)
  } catch (err) { next(err) }
}

module.exports = { getAll, insert };
