const { Productos } = require("../db/models/productos");

const getAll = async (req, res, next) => {
  try {
    let pedidoDB = await Productos.findAll();
    res.json(pedidoDB);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  const { Product } = req.body;
  try {
    if (Product.nombreProducto === "") {
      return res
        .status(406)
        .json({ message: "El nombre del producto no puede ser vacío" });
    }
    if (
      await Productos.findOne({
        where: { nombreProducto: Product.nombreProducto },
      })
    ) {
      return res
        .status(406)
        .json({ message: "El producto ingresado ya existe" });
    }
    let nuevo = await Productos.create(Product);
    if (nuevo) {
      res.json({ message: "producto creado correctamente", data: nuevo });
    }
  } catch (error) {
    next(error);
  }
};

const editProduct = async (req, res, next) => {
  const id = req.params.id;
  const { Product } = req.body;
  try {
    if (Product.nombreProducto === "") {
      return res
        .status(406)
        .json({ message: "El nombre del producto no puede ser vacío" });
    }
    if ( Product.nombreProducto &&
      await Productos.findOne({
        where: { nombreProducto: Product.nombreProducto },
      })
    ) {
      return res
        .status(406)
        .json({ message: "El producto ingresado ya existe" });
    }

    const [producto] = await Productos.update(Product, { where: { id: id } });
    if (producto) {
      return res.json({
        message: "producto editado correctamente",
        data: await Productos.findByPk(id),
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    let selectedProduct = await Productos.findByPk(id);
    if (selectedProduct) {
      await selectedProduct.destroy();
      res.json({ message: "Producto eliminado correctamente" });
    } else {
      res.json({ message: "No se encontró el id del producto" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  createProduct,
  editProduct,
  deleteProduct,
};
