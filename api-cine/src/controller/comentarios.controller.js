const { Comentarios } = require("../db/models/comentarios");
const { Pelicula } = require("../db/models/pelicula");

const getComentariosTotal = async (req, res) => {
   const comentarios = await Comentarios.findAll({ include: [Pelicula] });
   res.send(comentarios);
};
const getComentariosByIdOfMovie = async (req, res) => {
   const { id } = req.params;
   const comentarios = await Pelicula.findOne({ where:{id:id},include: [Comentarios] });
   res.status(200).json({comentarios:comentarios.Comentarios});
};

const postComentario = async (req, res) => {
   try {
      const { nombre, comentario, puntuación, id } = req.body;

      if (comentario.trim() && comentario.length <= 600 && puntuación) {
         const review = await Comentarios.create({
            nombre,
            comentario,
            puntuación,
         });

         const pelicula = await Pelicula.findByPk(id);
         await pelicula.addComentario(review);
         res.send("¡comentario enviado!");
      } else res.status(404).send("asegurese de llenar bien los campos");
   } catch (e) {
      console.log("error from post(/comentarios)", e);
   }
};

const deleteComentario = async (req, res) => {
   const { id } = req.params;
   const reviewToDelete = await Comentarios.findByPk(id);
   await reviewToDelete.destroy();
   res.send(reviewToDelete);
};

const putComentario = async (req, res) => {
   const { comentario, puntuación, id } = req.body;
   const reviewToUpdate = await Comentarios.findByPk(id);
   await reviewToUpdate.update({
      comentario,
      puntuación,
   });
   res.send(reviewToUpdate);
};

module.exports = {
   getComentariosByIdOfMovie,
   postComentario,
   getComentariosTotal,
   deleteComentario,
   putComentario,
};
