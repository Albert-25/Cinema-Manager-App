const { Router } = require("express");
const router = Router();

//importar funciones desde el controlador aqui
const {
  getAll,
  getOne,
  createProduct,
  editProduct,
  deleteProduct,
} = require("../controller/productos.controller");

router.get("/", getAll);
router.post("/", createProduct);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getOne);

module.exports = router;
