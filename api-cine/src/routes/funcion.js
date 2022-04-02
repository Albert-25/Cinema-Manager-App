const { Router } = require("express");
const router = Router();

//importar funciones desde el controlador aqui
const {
  getAll,
  getFuncion,
  crearFuncion,
  crearFunciones,
  editarFuncion,
  eliminarFuncion,
} = require("../controller/funcion.controller");

router.get("/", getAll);
router.get("/:id", getFuncion);
router.post("/", crearFuncion);
router.post("/bulk", crearFunciones);
router.put("/:id", editarFuncion);
router.delete("/:id", eliminarFuncion);

module.exports = router;
