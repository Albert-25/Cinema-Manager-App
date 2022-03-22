const { ProximosEstrenos } = require("../db/models/proximosEstrenos");
const { Generos }= require("../db/models/generos");
const { Actores } = require("../db/models/actores");

const getAll = async (req, res, next) => {
  try {
    const proxEstrenos = await ProximosEstrenos.findAll({
      include: [Generos, Actores],
    });
    res.send(proxEstrenos);
  } catch (error) {
    next(error);
  }
};

const getEstreno = async (req, res, next) => {
  const id = req.params.id;
  try {
    const movie = await ProximosEstrenos.findByPk(id);
    if (movie) return res.json(movie);
    next();
  } catch (error) {
    next(error);
  }
};

const crearEstreno = async (req, res, next) => {
  const { movie, genreIds, actorsIds } = req.body;

  try {
    if (await ProximosEstrenos.findOne({ where: { titulo: movie.titulo } })) {
      return res.json({ message: "El estreno ya existe" });
    }
    let peli = await ProximosEstrenos.create(movie);
    await peli.addGeneros(genreIds);
    await peli.addActores(actorsIds);

    return res.json({ message: "creado correctamente", data: peli });
  } catch (error) {
    next(error);
  }
};

const editarEstreno = async (req, res, next) => {
  const id = req.params.id;
  try {
    const [Estreno] = await ProximosEstrenos.update(req.body.movie, {
      where: { id: id },
    });
    if (Estreno) {
      return res.json({
        message: "Estreno actualizado correctamente",
        data: await ProximosEstrenos.findByPk(id),
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const eliminarEstreno = async (req, res, next) => {
  const id = req.params.id;
  try {
    const eliminado = await ProximosEstrenos.destroy({ where: { id: id } });
    if (eliminado) {
      return res.json({ message: "Estreno eliminado correctamente" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  crearEstreno,
  getAll,
  editarEstreno,
  eliminarEstreno,
  getEstreno,
  //funciones a exportar para las rutas
};
