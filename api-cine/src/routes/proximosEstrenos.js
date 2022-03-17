const { Router } = require("express");
const router = Router();

//importar funciones desde el controlador aqui
const {
  crearEstreno,
  getAll,
  editarEstreno,
  eliminarEstreno,
} = require("../controller/proximosEstrenos.controller");

router.get("/", getAll);
router.post("/", crearEstreno);
router.put("/:id", editarEstreno);
router.delete("/:id", eliminarEstreno);

module.exports = router;
