const { Compra } = require("../db/models/compras");
const { Funciones } = require("../db/models/funcion");
const { Productos } = require("../db/models/productos");

const getAll = async (req, res, next) => {
  try {
    let compras = await Compra.findAll({ include: [Funciones, Productos] });
    res.json(compras);
  } catch (error) {
    next(error);
  }
};

const getCompra = async (req, res, next) => {
  let id = req.params.id;
  try {
    const compra = await Compra.findByPk(id);
    if (compra) return res.json(compra);
    next();
  } catch (error) {
    next(error);
  }
};

const crearCompra = async (req, res, next) => {
  const { compra } = req.body;
  try {
    let comp = await Compra.create(compra);
    return res.send(comp.id);
  } catch (error) {
    next(error);
  }
};

const editarCompra = async (req, res, next) => {
  const id = req.params.id;
  try {
    const [comp] = await Compra.update(req.body.compra, {
      where: { id: id },
    });
    if (comp) {
      return res.json({
        message: "orden de compra actualizada satisfactoriamente",
        data: await Compra.findByPk(id, { include: [Funciones, Productos] }),
      });
    }
  } catch (error) {
    next(error);
  }
};

const eliminarCompra = async (req, res, next) => {
  const id = req.params.id;
  try {
    const eliminado = await Compra.destroy({ where: { id: id } });
    if (eliminado) {
      return res.json({
        message: "Orden de compra eliminada satisfactoriamente",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getCompra,
  crearCompra,
  editarCompra,
  eliminarCompra,
};
