const { Router } = require("express");
const router = Router();

const { getComentarios, postComentario} = require('../controller/comentarios.controller')

router.get("/", getComentarios)
router.post("/", postComentario)


module.exports = router;