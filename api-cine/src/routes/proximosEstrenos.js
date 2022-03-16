const { Router } = require("express");
const router = Router();

//importar funciones desde el controlador aqui
const {
  newMovie,
  getAll,
} = require("../controller/proximosEstrenos.controller");

router.get("/", getAll);
router.post("/", newMovie);

module.exports = router;
