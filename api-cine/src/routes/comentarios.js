const { Router } = require("express");
const router = Router();

const { getComentariosByIdOfMovie, postComentario, getComentariosTotal} = require('../controller/comentarios.controller')

router.get("/:id", getComentariosByIdOfMovie)
router.get("/", getComentariosTotal)
router.post("/", postComentario)


module.exports = router;