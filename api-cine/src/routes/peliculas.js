const { Router } = require("express");
const Peliculas = Router();
const { getAll, insert } = require("../controller/peliculas.controller");

Peliculas.get("/", getAll);
Peliculas.post('/', insert);

module.exports = { Peliculas };
