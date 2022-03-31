export function validate(input, stateErrors, name) {
  let errors = {
    titulo: stateErrors.titulo,
    sinopsis: stateErrors.sinopsis,
    poster: stateErrors.poster,
    duracion: stateErrors.duracion,
    clasificacion: stateErrors.clasificacion,
    director: stateErrors.director,
    pais: stateErrors.pais,
    distribuidora: stateErrors.distribuidora,
    trailer: stateErrors.trailer,
    genders: stateErrors.genders,
    actors: stateErrors.actors,
    error: false,
  };
  if (name === "titulo" || name === "submit") {
    if (!input.titulo && input.titulo !== undefined) {
      errors.titulo = "Nombre del titulo es requerido";
      errors.error = true;
    } else if (!/^[a-z ,.'-]+$/i.test(input.name)) {
      errors.name = "Actividad invalida";
      errors.error = true;
    } else {
      errors.titulo = "";
    }
  }

  if (name === "sinopsis" || name === "submit") {
    if (!input.sinopsis && input.sinopsis !== undefined) {
      errors.sinopsis = "La sinopsis o resumen es requerida";
      errors.error = true;
    } else {
      errors.sinopsis = "";
    }
  }

<<<<<<< HEAD
   if (name === "pais" || name === "submit") {
      if (!input.pais && input.pais !== undefined) {
         errors.pais = "El pais de origen del titulo es requerido";
         errors.error = true;
      } else {
         errors.pais = "";
      }
   }
=======
  if (name === "duracion" || name === "submit") {
    if (!input.duracion && input.duracion !== undefined) {
      errors.duracion = "Ingrese un numero para la duracion";
      errors.error = true;
    } else {
      errors.duracion = "";
    }
  }

  if (name === "poster" || name === "submit") {
    if (!input.poster && input.poster !== undefined) {
      errors.poster = "Ingrese un poster para mostrar";
      errors.error = true;
    } else {
      errors.poster = "";
    }
  }
>>>>>>> origin/Developer

  if (name === "clasificacion" || name === "submit") {
    if (!input.clasificacion && input.clasificacion !== undefined) {
      errors.clasificacion = "Defina la clasicacion de la pelicula";
      errors.error = true;
    } else {
      errors.clasificacion = "";
    }
  }

  if (name === "pais" || name === "submit") {
    if (!input.pais && input.pais !== undefined) {
      errors.pais = "El pais de origen del titulo es requerido";
      errors.error = true;
    } else {
      errors.pais = "";
    }
  }

  if (name === "director" || name === "submit") {
    if (!input.director && input.director !== undefined) {
      errors.director = "El nombre del director es requerido";
      errors.error = true;
    } else {
      errors.director = "";
    }
  }

  if (name === "distribuidora" || name === "submit") {
    if (!input.distribuidora && input.distribuidora !== undefined) {
      errors.distribuidora = "El distribuidor de la pelicula es requerido";
      errors.error = true;
    } else {
      errors.distribuidora = "";
    }
  }

  if (name === "trailer" || name === "submit") {
    if (!input.trailer && input.trailer !== undefined) {
      errors.trailer = "El trailer del titulo es requerido";
      errors.error = true;
    } else {
      errors.trailer = "";
    }
  }

  if (!input.genders && input.genders !== undefined) {
    errors.genders = "El genero es requerido";
    errors.error = true;
  }

  if (!input.actors && input.actors !== undefined) {
    errors.actors = "Los actores son requeridos";
    errors.error = true;
  }

  return errors;
}
