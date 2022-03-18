const { Comentarios } = require("../db/models/comentarios");
const { Pelicula } = require("../db/models/pelicula");


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

        // const pelicula = await Pelicula.findOne({ where: { titulo: tituloParams } });
        // await pelicula.addGenres(review) en esta linea se debe asociar una pelicula con sus comentarios respectivos
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