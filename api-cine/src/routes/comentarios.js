const { Router } = require("express");
const router = Router();

const {
    getComentariosByIdOfMovie,
    postComentario,
    getComentariosTotal,
    deleteComentario,
    putComentario
} = require('../controller/comentarios.controller')

router.get("/:id", getComentariosByIdOfMovie)
router.get("/", getComentariosTotal)
router.post("/", postComentario)
router.delete("/:id", deleteComentario)
router.put("/", putComentario)

module.exports = router;