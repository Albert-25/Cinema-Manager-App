const { Router } = require("express");
const router = Router();
const { getMovies, getMovie, insertMovie, updateMovie, destroyMovie } = require("../controller/peliculas.controller");

router.get("/", getMovies);
router.get("/:id", getMovie);
router.post('/', insertMovie);
router.put("/:id", updateMovie);
router.delete("/:id", destroyMovie);

module.exports = router;
