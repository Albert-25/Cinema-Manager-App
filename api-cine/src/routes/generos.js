const { Router } = require("express");
const router = Router();

//importar funciones desde el controlador aqui
const {
  getAll,
  createGenre,
  editGenre,
  deleteGenre,
} = require("../controller/generos.controller");

router.get("/", getAll);
router.post("/", createGenre);
router.put("/:id", editGenre);
router.delete("/:id", deleteGenre);

module.exports = router;
