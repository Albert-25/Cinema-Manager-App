export function validate(input, stateErrors, name) {
  let errors = {
    sala: stateErrors.sala,
    fecha: stateErrors.fecha,
    horario: stateErrors.horario,
    asientos: stateErrors.asientos,
    precio: stateErrors.precio,
    detalle: stateErrors.detalle,
    pelicula: stateErrors.pelicula,
    error: false,
  };

  console.log(input);

  if (name === "sala" || name === "submit") {
    if (!input.sala && input.sala !== undefined) {
      errors.sala = "Es requerido especificar la sala";
      errors.error = true;
      console.log(errors.sala);
      console.log("sala error " + errors.error);
    } else {
      errors.sala = "";
    }
  }

  if (name === "fecha" || name === "submit") {
    console.log(input.fecha);
    if (!input.fecha && input.fecha !== undefined) {
      errors.fecha = "La fecha de la función es requerida";
      errors.error = true;
      console.log(errors.fecha);
      console.log("fecha error " + errors.error);
    } else {
      errors.fecha = "";
    }
  }

  if (name === "horario" || name === "submit") {
    if (!input.horario && input.horario !== undefined) {
      errors.horario = "Ingrese un horario para la función";
      errors.error = true;
      console.log(errors.horario);
      console.log("hora error " + errors.error);
    } else {
      errors.horario = "";
    }
  }

  if (name === "asientos" || name === "submit") {
    if (!input.asientos && input.asientos !== undefined) {
      errors.asientos = "Ingrese la cantidad de asientos de la sala";
      errors.error = true;
      console.log(errors.asientos);
      console.log("asientos error " + errors.error);
    } else {
      errors.asientos = "";
    }
  }

  if (name === "precio" || name === "submit") {
    if (!input.precio && input.precio !== undefined) {
      errors.precio = "Ingrese el precio para la función";
      errors.error = true;
      console.log(errors.precio);
      console.log("precio error " + errors.error);
    } else {
      errors.precio = "";
    }
  }

  if (name === "detalle" || name === "submit") {
    if (!input.detalle && input.detalle !== undefined) {
      errors.detalle = "El detalle de la pelicula es requerido";
      errors.error = true;
      console.log(errors.detalle);
      console.log("detalle error " + errors.error);
    } else {
      errors.detalle = "";
    }
  }

  if (name === "pelicula" || name === "submit") {
    if (!input.pelicula && input.pelicula !== undefined) {
      errors.pelicula = "La pelicula a proyectar es requerida";
      errors.error = true;
      console.log(errors.pelicula);
      console.log("peli error " + errors.error);
    } else {
      errors.pelicula = "";
    }
  }

  return errors;
}
