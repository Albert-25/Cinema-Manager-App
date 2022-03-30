const { Router } = require("express");
const router = Router();

//importar funciones desde el controlador aqui
const { getEstrenos } = require("../controller/peliculas.controller");

router.get("/", getEstrenos);

module.exports = router;
