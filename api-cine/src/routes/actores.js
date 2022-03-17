const { Router } = require("express");
const router = Router();

//importar funciones desde el controlador aqui
const {
  getAll,
  createActor,
  editActor,
  deleteActor,
} = require("../controller/actores.controller");

router.get("/", getAll);
router.post("/", createActor);
router.put("/", editActor);
router.delete("/", deleteActor);
module.exports = router;
