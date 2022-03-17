const { Router } = require("express");
const Peliculas = Router();
const { getMovies, getMovie, insertMovie, updateMovie, destroyMovie } = require("../controller/peliculas.controller");

Peliculas.get("/", getMovies);
Peliculas.get("/:id", getMovie);
Peliculas.post('/', insertMovie);
Peliculas.put("/:id", updateMovie);
Peliculas.delete("/:id", destroyMovie);

module.exports = { Peliculas };
