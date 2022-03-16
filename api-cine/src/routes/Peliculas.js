const { Router } = require("express");
const router = Router();

//importar funciones desde el controlador aqui
const { getAll } = require("../controller/peliculas.controller");

//GET PELICULAS
router.get("/", getAll);

module.exports = router;
