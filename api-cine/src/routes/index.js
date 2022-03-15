const routes = require("express").Router();
const handleErrors = require("./handleErrors");
const { User } = require("../db/models/user");
const { Router } = require("express");

const Pin = require("./pin.js");
const Peliculas = require("./peliculas.js");
const Productos = require("./productos.js");
const Actores = require("./actores.js");
const Comentarios = require("./comentarios.js");
const Compras = require("./compras.js");
const Funcion = require("./funcion.js");
const Generos = require("./generos.js");
const ProximosEstrenos = require("./proximosEstrenos.js");

// routes.get("/pin", (_req, res) => {
//   return res.json({ msg: "pong" });
// });

routes.use((_req, res) => res.status(404).json("Not found3"));
routes.use(handleErrors); // Error catching endware.

routes.use("/pin", Pin);
routes.use("/peliculas", Peliculas);
routes.use("/productos", Productos);
routes.use("/actores", Actores);
routes.use("/comentarios", Comentarios);
routes.use("/compras", Compras);
routes.use("/funcion", Funcion);
routes.use("/generos", Generos);
routes.use("/proximosEstrenos", ProximosEstrenos);

module.exports = { routes };
