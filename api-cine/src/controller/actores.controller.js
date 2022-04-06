const { Actores } = require("../db/models/actores");

const getAll = async (req, res, next) => {
  try {
    let pedidoDB = await Actores.findAll();
    res.json(pedidoDB);
  } catch (error) {
    next(error);
  }
};

const createActor = async (req, res, next) => {
  const { Actor } = req.body;
  try {
    if (Actor.nombre === "") {
      return res.status(406).json({ message: "El nombre no puede ser vacío" });
    }
    if (await Actores.findOne({ where: { nombre: Actor.nombre } })) {
      return res.status(406).json({ message: "El actor ingresado ya existe" });
    }
    let nuevo = await Actores.create(Actor);
    if (nuevo) {
      res.json({ message: "actor creado correctamente", data: nuevo });
    }
  } catch (error) {
    next(error);
  }
};

const editActor = async (req, res, next) => {
  const id = req.params.id;
  const { Actor } = req.body;
  try {
    if (Actor.nombre === "") {
      return res.status(406).json({ message: "El nombre no puede ser vacío" });
    }
    if (await Actores.findOne({ where: { nombre: Actor.nombre } })) {
      return res.status(406).json({ message: "El actor ingresado ya existe" });
    }

    const [actor] = await Actores.update(Actor, { where: { id: id } });
    if (actor) {
      return res.json({
        message: "actor editado correctamente",
        data: await Actores.findByPk(id),
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const deleteActor = async (req, res, next) => {
  const id = req.params.id;
  try {
    let selectedActor = await Actores.findByPk(id);
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
  deleteActor
};
