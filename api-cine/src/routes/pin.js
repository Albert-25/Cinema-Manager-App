const { Router } = require("express");
const router = Router();

//importar funciones desde el controlador aqui
const { pin } = require("../controller/pin.controller");

//GET A PIN (EJEMPLO)
router.get("/", pin);

module.exports = router;
