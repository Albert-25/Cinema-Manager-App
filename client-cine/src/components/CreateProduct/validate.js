export function validate(input, stateErrors, name) {
  let errors = {
    nombreProducto: stateErrors.nombreProducto,
    descripcion: stateErrors.descripcion,
    precio: stateErrors.precio,
    stock: stateErrors.stock,
    error: false,
  };

  if (name === "nombreProducto" || name === "submit") {
    if (!input.nombreProducto && input.nombreProducto !== undefined) {
      errors.nombreProducto = "Nombre del producto es requerido";
      errors.error = true;
    } else if (!/^[a-z ,.'-]+$/i.test(input.name)) {
      errors.name = "Actividad invalida";
      errors.error = true;
    } else {
      errors.nombreProducto = "";
    }
  }

  if (name === "descripcion" || name === "submit") {
    if (!input.descripcion && input.descripcion !== undefined) {
      errors.descripcion = "La descripcion del producto es requerida";
      errors.error = true;
    } else {
      errors.descripcion = "";
    }
  }

  if (name === "precio" || name === "submit") {
    if (!input.precio && input.precio !== undefined) {
      errors.precio = "Ingrese un numero para el precio";
      errors.error = true;
    } else {
      errors.precio = "";
    }
  }

  if (name === "stock" || name === "submit") {
    if (!input.stock && input.stock !== undefined) {
      errors.stock = "Ingrese un poster para mostrar";
      errors.error = true;
    } else {
      errors.stock = "";
    }
  }

  return errors;
}
