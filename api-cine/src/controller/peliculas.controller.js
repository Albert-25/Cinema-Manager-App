const { Pelicula } = require("../db/models/pelicula");
const { Generos } = require("../db/models/generos");
const { Actores } = require("../db/models/actores");

const getMovies = async (req, res, next) => {
  let movies = []
  try {
    if (Object.keys(req.query).includes('title')) {
      movies = await Pelicula.findAll({
        where: { titulo: req.query.title },
        include:  [Generos,Actores]
      })
    }
    if (Object.keys(req.query).length === 0) {
      movies = await Pelicula.findAll({ include: [Generos, Actores] });
    }
    if (movies.length !== 0) return res.send(movies);
    next()
  } catch (err) { next(err) };
};

const insertMovie = async (req, res, next) => {
  if (Object.keys(req.body).length !== 12) {
    return res.status(406).json({ msg: 'All atrributes are required' })
  }
  const gendersTds = req.body.genders
  const actorsIds = req.body.actors
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
    await movie.addGeneros(gendersTds);
    await movie.addActores(actorsIds);
    return res.json(await Pelicula.findByPk(movie.id, { include: [Generos, Actores] }))
  } catch (err) { next(err) }
}

const getMovie = async (req, res, next) => {
  const id = req.params.id
  try {
    const movie = await Pelicula.findByPk(id, { include: [Generos, Actores] })
    if (movie) return res.json(movie)
    next()
  } catch (err) { next(err) }
}

const updateMovie = async (req, res, next) => {
  const id = req.params.id
  try {
    const [movie] = await Pelicula.update(req.body, { where: { id: id } })
    if (movie) return res.json(await Pelicula.findByPk(id, { include: [Generos, Actores] }))
    next()
  } catch (err) { next(err) }
}

const destroyMovie = async (req, res, next) => {
  const id = req.params.id
  try {
    const deleted = await Pelicula.destroy({ where: { id: id } })
    if (deleted) return res.json({ msg: 'Deleted' })
    next()
  } catch (err) { next(err) }
}

module.exports = { getMovies, insertMovie, getMovie, updateMovie, destroyMovie };
