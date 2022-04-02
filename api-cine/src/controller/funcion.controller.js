const { Funciones } = require("../db/models/funcion");
const { Pelicula } = require("../db/models/pelicula");

const getAll = async (req, res, next) => {
  try {
    let funciones = await Funciones.findAll({ include: [Pelicula] });
    if(funciones){
      res.json(funciones);
    }
    else{
      req.json({message: "no se encontró ninguna funcion en la base de datos"})
    }
  } catch (error) {
    next(error);
  }
};

const getFuncion = async (req, res, next) => {
  let id = req.params.id;
  try {
    const func = await Funciones.findByPk(id, { include: [Pelicula] });
    if (func) return res.json(func);
    next();
  } catch (error) {
    next(error);
  }
};

const crearFuncion = async (req, res, next) => {
  const { funcion, peliculaId } = req.body;

  try {
    let func = await Funciones.create(funcion);
    await func.addPelicula(peliculaId);
    return res.json({
      message: "funcion creada satisfactoriamente",
      data: func,
    });
  } catch (error) {
    next(error);
  }
};

const crearFunciones = async (req, res, next) => {
  const { funciones, peliculaId } = req.body;
  try {
    let funcs = await Funciones.bulkCreate(funciones, {
      ignoreDuplicates: true,
    });

    funcs.forEach((element) => {
      element.addPelicula(peliculaId);
    });

    return res.send(funcs);
  } catch (error) {
    next(error);
  }
};

const editarFuncion = async (req, res, next) => {
  const id = req.params.id;
  try {
    const [func] = await Funciones.update(req.body.funcion, {
      where: { id: id },
    });
    if (func) {
      return res.json({
        message: "Funcion actualizada satisfactoriamente",
        data: await Funciones.findByPk(id, { include: [Pelicula] }),
      });
    }
  } catch (error) {
    next(error);
  }
};

const eliminarFuncion = async (req, res, next) => {
  const id = req.params.id;
  try {
    const eliminado = await Funciones.destroy({ where: { id: id } });
    if (eliminado) {
      return res.json({ message: "Funcion eliminada satisfactoriamente" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getFuncion,
  crearFuncion,
  crearFunciones,
  editarFuncion,
  eliminarFuncion,
};
