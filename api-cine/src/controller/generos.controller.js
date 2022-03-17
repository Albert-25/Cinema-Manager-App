const Generos = require("../db/models/generos");

//desarrollar aqui las funciones para los pedidos a la base de datos

const getAll = async (req, res, next) => {
  try {
    let pedidoDB = await Generos.findAll();
    res.json(pedidoDB);
  } catch (error) {
    next(error);
  }
};

const createGenre = async (req, res, next) => {
  const { Genre } = req.body;
  try {
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
  try {
    const [genero] = await Generos.update(req.body, { where: { id: id } });
    if (genero) {
      return res.json({
        message: "genero editado correctamente",
        data: (await Generos.findByPk(id)),
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
  //funciones a exportar para las rutas
};
