const { Comentarios } = require("../db/models/comentarios");
const { Pelicula } = require("../db/models/pelicula")

const getComentariosTotal = async (req, res) => {
    const comentarios = await Comentarios.findAll({ include: [Pelicula] })
    res.send(comentarios)
}
const getComentariosByIdOfMovie = async (req, res) => {
    const { id } = req.params;
    const comentarios = await Comentarios.findAll({ include: [Pelicula] })
    const comentariosFiltrados = comentarios.filter(c => c.Peliculas[0].id == id)
    res.send(comentariosFiltrados)
}

const postComentario = async (req, res) => {

    try {
        const {
            nombre, comentario, puntuación, id
        } = req.body

        if (comentario.trim() && comentario.length <= 10 && puntuación) {
            const review = await Comentarios.create({
                nombre, comentario, puntuación
            })

            const pelicula = await Pelicula.findByPk(id);
            await pelicula.addComentario(review)
            res.send("¡comentario enviado!")
        }
        else res.status(404).send("asegurese de llenar bien los campos")
    }
    catch (e) {
        console.log("error from post(/comentarios)", e)
    }
}

// const deleteComentario = async (req,res)=>{
//     const {id} = req.params;
//     const reviewToDelete = await Comentarios.findByPk(id,{
//         include:[Pelicula]
//     })
//     await reviewToDelete.destroy();
//     res.send(reviewToDelete)
// }

// const putComentario = async (req, res)=>{
    
// }


module.exports = {
    getComentariosByIdOfMovie,
    postComentario,
    getComentariosTotal,
    // putComentario,
    // deleteComentario
}