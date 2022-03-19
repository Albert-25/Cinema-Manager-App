const { Generos } = require("../db/models/generos");

const getAll = async (req, res, next) => {
  try {
    let pedidoDB = await Generos.findAll();
    res.json(pedidoDB);
  } catch (error) {
    next(error);
  }
};

const createGenre = async (req, res, next) => {

  let  Genre  = req.body;
  console.log(Genre)
  try {
    if (Genre.genero === "") {
      return res.status(406).json({ message: "El genero no puede ser vacío" });
    }
    if (await Generos.findOne({ where: { genero: Genre.genero } })) {
      return res.status(406).json({ message: "El genero ingresado ya existe" });
    }
    let nuevo = await Generos.create(Genre);
    if (nuevo) {
      res.json({ message: "genero creado correctamente", data: nuevo });
    }
  } catch (error) {
    next(error);
  }
};

const editGenre = async (req, res, next) => {
  const id = req.params.id;
  const { Genre } = req.body;
  try {
    if (Genre.genero === "") {
      return res.status(406).json({ message: "El genero no puede ser vacío" });
    }
    if (await Generos.findOne({ where: { genero: Genre.genero } })) {
      return res.status(406).json({ message: "El genero ingresado ya existe" });
    }

    const [genero] = await Generos.update(Genre, { where: { id: id } });
    if (genero) {
      return res.json({
        message: "genero editado correctamente",
        data: await Generos.findByPk(id),
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const deleteGenre = async (req, res, next) => {
  const id = req.params.id;
  try {
    let selectedGenre = await Generos.findByPk(id);
    if (selectedGenre) {
      await selectedGenre.destroy();
      res.json({ message: "Genero eliminado correctamente" });
    } else {
      res.json({ message: "No se encontró el id del genero" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  createGenre,
  editGenre,
  deleteGenre,
};
