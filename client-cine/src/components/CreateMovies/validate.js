export function validate(input) {
   let errors = {
      titulo: "",
      sinopsis: "",
      poster: "",
      duracion: "",
      clasificacion: "",
      director: "",
      puntuación: "",
      pais: "",
      distribuidora: "",
      trailer: "",
      genders: "",
      actors: "",
      error: false,
   };

   if (!input.titulo && input.titulo !== undefined) {
      errors.titulo = "Nombre del titulo es requerido";
      errors.error = true;
   } else if (!/^[a-z ,.'-]+$/i.test(input.name)) {
      errors.name = "Actividad invalida";
      errors.error = true;
   }

   if (!input.sinopsis && input.sinopsis !== undefined) {
      errors.sinopsis = "La sinopsis o resumen es requerida";
      errors.error = true;
   }

   if (!input.duracion && input.duracion !== undefined) {
      errors.duracion = "Ingrese un numero para la duracion";
      errors.error = true;
   }

   if (!input.poster && input.poster !== undefined) {
      errors.poster = "Ingrese un poster para mostrar";
      errors.error = true;
   }

   if (!input.clasificacion && input.clasificacion !== undefined) {
      errors.clasificacion = "Defina la clasicacion de la pelicula";
      errors.error = true;
   }

   if (!input.puntuación && input.puntuación !== undefined) {
      errors.puntuación = "La puntuacion de la pelicula es requerida";
      errors.error = true;
   }

   if (!input.pais && input.pais !== undefined) {
      errors.pais = "El pais de origen del titulo es requerido";
      errors.error = true;
   }

   if (!input.director && input.director !== undefined) {
      errors.director = "El nombre del director es requerido";
      errors.error = true;
   }

   if (!input.distribuidora && input.distribuidora !== undefined) {
      errors.distribuidora = "El distribuidor de la pelicula es requerido";
      errors.error = true;
   }

   if (!input.trailer && input.trailer !== undefined) {
      errors.trailer = "El trailer del titulo es requerido";
      errors.error = true;
   }

   if (input.genders.length === 0) {
      errors.genders = "El genero es requerido";
      errors.error = true;
   }

      if (input.actors.length === 0) {
      errors.actors = "Los actores son requeridos";
      errors.error = true;
   }

   return errors;
}
