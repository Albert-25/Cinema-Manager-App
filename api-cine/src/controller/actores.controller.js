const Actores = require("../db/models/actores");

//desarrollar aqui las funciones para los pedidos a la base de datos

//getAll devuelve todos los actores de la DB
const getAll = async (req, res, next) => {
  try {
    let pedidoDB = await Actores.findAll();
    res.json(pedidoDB);
  } catch (error) {
    next(error);
  }
};

//createActor crea un nuevo actor en la DB
const createActor = async (req, res, next) => {
  const { Actor } = req.body;
  try {
    let nuevo = await Actores.create(Actor);
    if (nuevo) {
      res.json({ message: "actor creado correctamente", data: nuevo });
    }
  } catch (error) {
    next(error);
  }
};

//editActor recibe un id de actor y un nombre nuevo por body,
//busca el actor por id y edita su nombre

const editActor = async (req, res, next) => {
  const { actorId, newName } = req.body;
  try {
    let selectedActor = await Actores.findByPk(actorId);
    if (selectedActor) {
      selectedActor.nombre = newName;
      await selectedActor.save();
      res.json({ message: "actor editado correctamente", data: selectedActor });
    } else {
      res.json({ message: "No se encontró el id del actor" });
    }
  } catch (error) {
    next(error);
  }
};

//deleteActor recibe un id de actor por body,
//busca el actor por id y lo elimina
const deleteActor = async (req, res, next) => {
  const { actorId } = req.body;
  try {
    let selectedActor = await Actores.findByPk(actorId);
    if (selectedActor) {
      await selectedActor.destroy();
      res.json({ message: "Actor eliminado correctamente" });
    } else {
      res.json({ message: "No se encontró el id del actor" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  createActor,
  editActor,
  deleteActor,
  //funciones a exportar para las rutas
};
