import axios from "axios";

export function postMovies(inputs) {
  return function (dispatch) {
    fetch("http://localhost:3001/peliculas", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(inputs), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => console.log({ msg: "Success" }))
      .catch((err) => console.log(err.message));
  };
}

export const AllMovies = () => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/peliculas`);
    if (response?.data) {
      dispatch({
        type: "ALLMOVIES",
        payload: { pelis: response.data },
      });
    }
  };
};

export const DetailedMovie = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/peliculas/${id}`);
      if (response?.data) {
        dispatch({
          type: "DETAILEDMOVIE",
          payload: { detis: response.data },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export function getAllReviewByIdOfMovie(id) {
  return async function (dispatch) {
    const json = await axios.get(`http://localhost:3001/comentarios/${id}`);
    return dispatch({
      type: "GET_REVIEW_BY_MOVIEID",
      payload: json.data,
    });
  };
}

export const BestMovies = (arg) => {
  // console.log("howdy im action")
  return {
    type: "BESTMOVIES",
    payload: arg,
  };
};

export const postReview = (payload) => {
  return async (dispatch) => {
    const json = await axios.post("http://localhost:3001/comentarios", payload);
    return dispatch({
      type: "POST_REVIEW",
      payload: json,
    });
  };
};

export const GetAllGenres = () => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/generos`);
    if (response?.data) {
      dispatch({
        type: "GENRES",
        payload: { generos: response.data },
      });
    }
  };
};

export const GetAllCast = () => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/actores`);
    if (response?.data) {
      dispatch({
        type: "CAST",
        payload: { actores: response.data },
      });
    }
  };
};

export const FiltrarGenero = (arg) => {
  return {
    type: "FILTRARGENRES",
    payload: arg,
  };
};

export const FiltrarCast = (arg) => {
  return {
    type: "FILTRARCASTING",
    payload: arg,
  };
};

export const FiltrarGeneroYCast = (arg) => {
  return {
    type: "FILTRARGENEROYCASTING",
    payload: arg,
  };
};

export const uploadGenre = (info) => {
  return async function postGenre() {
    let body = {
      Genre: {
        genero: info.genero,
      },
    };
    try {
      await axios.post("http://localhost:3001/generos", body);
      alert("Genero creado satisfactoriamente");
    } catch (error) {
      alert("Error, el genero ya se encuentra en la base de datos");
    }
  };
};

export const uploadActor = (info) => {
  return async function postActor() {
    let body = {
      Actor: {
        nombre: info.nombre,
      },
    };
    try {
      await axios.post("http://localhost:3001/actores", body);
      alert("Actor creado satisfactoriamente");
    } catch (error) {
      alert("Error, el actor ya se encuentra en la base de datos");
    }
  };
};

export const uploadProduct = (info) => {
  if(info.imagenProducto === ""){
    info.imagenProducto = "https://www.feednavigator.com/var/wrbm_gb_food_pharma/storage/images/9/2/8/5/235829-6-eng-GB/Feed-Test-SIC-Feed-20142.jpg"
  }
  return async function postProduct() {
    let body = {
      Product: {
        nombreProducto: info.nombreProducto,
        imagenProducto: info.imagenProducto,
        descripcion: info.descripcion,
        precio: info.precio,
        stock: info.stock,
        isCombo: info.isCombo,
      },
    };
    try {
      await axios.post("http://localhost:3001/productos", body);
      alert("Producto creado satisfactoriamente");
    } catch (error) {
      alert("Datos erroneos o el producto ya existe en la base de datos");
    }
  };
};
