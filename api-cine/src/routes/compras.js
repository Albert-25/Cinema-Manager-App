const { Router } = require("express");
const router = Router();

//importar funciones desde el controlador aqui
const {
  getAll,
  getCompra,
  crearCompra,
  editarCompra,
  eliminarCompra,
} = require("../controller/compras.controller");

router.get("/", getAll);
router.get("/:id", getCompra);
router.post("/", crearCompra);
router.put("/:id", editarCompra);
router.delete("/:id", eliminarCompra);

module.exports = router;
