const { Pelicula } = require("../db/models/pelicula");
const { Generos } = require("../db/models/generos");
const { Actores } = require("../db/models/actores");
const { Comentarios } = require("../db/models/comentarios");
const { Op } = require("sequelize");

const getMovies = async (req, res, next) => {
  let movies = [];
  try {
    if (Object.keys(req.query).includes("title")) {
      movies = await Pelicula.findAll({
        where: {
          titulo: {
            [Op.iLike]: "%" + req.query.title + "%",
          },
          proximoEstreno: false,
        },
        include: [Generos, Actores, Comentarios],
      });
    }
    if (Object.keys(req.query).length === 0) {
      movies = await Pelicula.findAll({
        where: { proximoEstreno: false },
        include: [Generos, Actores, Comentarios],
      });
    }
    if (movies.length !== 0) return res.send(movies);
    next();
  } catch (err) {
    next(err);
  }
};

const getEstrenos = async (req, res, next) => {
  let estrenos = [];
  try {
    estrenos = await Pelicula.findAll({
      where: { proximoEstreno: true },
      include: [Generos, Actores],
    });
    if (estrenos.length !== 0) return res.send(estrenos);
    next();
  } catch (error) {
    next(error);
  }
};

const insertMovie = async (req, res, next) => {
  for (const key in req.body) {
    if ((key !== "proximoEstreno") && req.body[key].length === 0) {
      return res.status(406).json({ msg: "All atrributes are required" });
    }
  }
  const gendersTds = req.body.genders;
  const actorsIds = req.body.actors;
  try {
    const movie = await Pelicula.create({
      titulo: req.body.titulo,
      sinopsis: req.body.sinopsis,
      poster: req.body.poster,
      background: req.body.background,
      duracion: req.body.duracion,
      clasificacion: req.body.clasificacion,
      director: req.body.director,
      puntuación: req.body.puntuación,
      pais: req.body.pais,
      distribuidora: req.body.distribuidora,
      trailer: req.body.trailer,
      proximoEstreno: req.body.proximoEstreno,
    });
    await movie.addGeneros(gendersTds);
    await movie.addActores(actorsIds);
    return res.json(
      await Pelicula.findByPk(movie.id, { include: [Generos, Actores] })
    );
  } catch (err) {
    next(err);
  }
};

const getMovie = async (req, res, next) => {
  const id = req.params.id;
  try {
    const movie = await Pelicula.findByPk(id, { include: [Generos, Actores] });
    if (movie) return res.json(movie);
    next();
  } catch (err) {
    next(err);
  }
};

const updateMovie = async (req, res, next) => {
  const id = req.params.id;
  try {
    const [movie] = await Pelicula.update(req.body, { where: { id: id } });
    const testmovie = await Pelicula.findByPk(id, {
      include: [Generos, Actores],
    });

    if (req.body.actors.length > 0) {
      await testmovie.removeActores(calculateAsoc(1, await Actores.count()));
      await testmovie.addActores(req.body.actors);
    }
    if (req.body.genders.length > 0) {
      await testmovie.removeGeneros(calculateAsoc(1, await Generos.count()));
      await testmovie.addGeneros(req.body.genders);
    }

    if (movie || testmovie)
      return res.json(
        await Pelicula.findByPk(id, { include: [Generos, Actores] })
      );
    next();
  } catch (err) {
    next(err);
  }
};

//funcion auxiliar para calcular el numero actual de generos y actores para poder eliminarlos
const calculateAsoc = (lowEnd, highEnd) => {
  var arr = [];
  while (lowEnd <= highEnd) {
    arr.push(lowEnd++);
  }
  return arr;
};

const destroyMovie = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deleted = await Pelicula.destroy({ where: { id: id } });
    if (deleted) return res.json({ msg: "Deleted" });
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMovies,
  insertMovie,
  getMovie,
  updateMovie,
  destroyMovie,
  getEstrenos,
};
