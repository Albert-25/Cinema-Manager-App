const { Comentarios } = require("../db/models/comentarios");

const getComentarios = async (req, res) => {
    const comentarios = await Comentarios.findAll()
    res.send(comentarios)
}

const postComentario = async (req, res) => {
    try {
        const {
            nombre, comentario, puntuación
        } = req.body

        const review = await Comentarios.create({
            nombre, comentario, puntuación
        })
        
        res.send("¡comentario enviado!")
    }
    catch (e) {
        console.log("error from post(/comentarios)", e)
    }
}

module.exports = {
    getComentarios,
    postComentario
}