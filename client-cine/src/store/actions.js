import axios from "axios";
import Swal from "sweetalert2";

export function postMovies(inputs) {
   return (dispatch) => {
      axios.post("http://localhost:3001/peliculas", inputs).then(
         (res) => {
            Swal.fire({
               icon: "success",
               title: "Excelente!",
               text: "La pelicula fue agregada correctamente",
            });
            dispatch(AllMovies());
         },
         (err) => {
            Swal.fire({
               icon: "error",
               title: "Error!",
               text: `${err.response}`,
            });
         }
      );
   };
}

export const postBuy = (payload) => {
   return async (dispatch) => {
      const json = await axios.post(
         "http://localhost:3001/testStripe/create-checkout-session",
         payload
      );
      return dispatch({
         type: "POSTBUY",
         payload: json.data,
      });
   };
};

export const getRetrive = (id) => {

  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/testStripe/retrive/${id}`);
    if (response?.data) {
      dispatch({
        type: "GETRETRIVE",
        payload: { retr: response.data },
      });
    }
  };

};

export const GetAllFunctions = () => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/funcion`);
    if (response?.data) {
      dispatch({
        type: "GETFUNCTIONS",
        payload: { funcs: response.data },
      });
    }
  };

};

export const postFunciones = (funciones, peliculaId) => {
 
   try {
      if (funciones.length > 1) {
         let body = {
            funciones: funciones,
            peliculaId: peliculaId,
         };
         axios.post("http://localhost:3001/funcion/bulk", body);
         Swal.fire({
            icon: "success",
            title: "Excelente!",
            text: "La funcion se agrego satisfactoriamente",
         });
      } else {
         let body = {
            funcion: funciones[0],
            peliculaId: peliculaId,
         };
         axios.post("http://localhost:3001/funcion", body);
      }
   } catch (error) {
      Swal.fire({
         icon: "error",
         title: "Oops...",
         text: "Porfavor, ingrese correctamente los datos y vuelva a intentar",
       });
   }

};

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

export const AllProducts = () => {
   return async (dispatch) => {
      const response = await axios.get(`http://localhost:3001/productos`);
      if (response?.data) {
         dispatch({
            type: "ALLPRODUCTS",
            payload: { produs: response.data },
         });
      }
   };
};

export const FutureReleases = () => {
   return async (dispatch) => {
      const response = await axios.get(
         `http://localhost:3001/proximosEstrenos`
      );
      if (response?.data) {
         dispatch({
            type: "FUTURERELEASES",
            payload: { rele: response.data },
         });
      }
   };
};

export const DetailedMovie = (id) => {
   return async (dispatch) => {
      try {
         const response = await axios.get(
            `http://localhost:3001/peliculas/${id}`
         );
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

export const DetailedProduct = (id) => {
   return async (dispatch) => {
      try {
         const response = await axios.get(
            `http://localhost:3001/productos/${id}`
         );
         if (response?.data) {
            dispatch({
               type: "DETAILEDPRODUCT",
               payload: { produs: response.data },
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
         payload: json.data.comentarios,
      });
   };
}

export const BestMovies = (arg) => {
   return {
      type: "BESTMOVIES",
      payload: arg,
   };
};

export const postReview = (payload) => {
   return async (dispatch) => {
      try {
         const json = await axios.post(
            "http://localhost:3001/comentarios",
            payload
         );
         Swal.fire({
               position: 'center',
               icon: 'success',
               title: '¡Comentario publicado!',
               showConfirmButton: false,
               timer: 1000
             })
         return dispatch({
            type: "POST_REVIEW",
            payload: json.data,
         });
      } catch (error) {
         Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No se pudo crear el comentario...',
            showConfirmButton: false,
            timer: 1000
          })
      }
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
   return function postGenre(dispatch) {
      let body = { Genre: { genero: info.genero } };
      axios
         .post("http://localhost:3001/generos", body)
         .then((res) => {
            Swal.fire({
               icon: "success",
               title: "Excelente!",
               text: "Genero creado satisfactoriamente",
            });
            dispatch(GetAllGenres());
         })
         .catch((err) => {
            Swal.fire({
               icon: "error",
               title: "Error!",
               text: "El Actor ya se encuentra en la base de datos",
            });
         });
   };
};

export const uploadActor = (info) => {
   return async function postActor(dispatch) {
      let body = {
         Actor: {
            nombre: info.nombre,
         },
      };
      axios.post("http://localhost:3001/actores", body).then(
         (resp) => {
            Swal.fire({
               icon: "success",
               title: "Excelente!",
               text: "Actor creado satisfactoriamente",
            });
            dispatch(GetAllCast());
         },
         (error) => {
            Swal.fire({
               icon: "error",
               title: "Error!",
               text: "El actor ya se encuentra en la base de datos",
            });
         }
      );
   };
};

export const uploadProduct = (info) => {
   if (info.imagenProducto === "") {
      info.imagenProducto =
         "https://www.feednavigator.com/var/wrbm_gb_food_pharma/storage/images/9/2/8/5/235829-6-eng-GB/Feed-Test-SIC-Feed-20142.jpg";
   }
   return async function postProduct(dispatch) {
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
      axios.post("http://localhost:3001/productos", body).then(
         (res) => {
            Swal.fire({
               icon: "success",
               title: "Excelente!",
               text: "Producto creado satisfactoriamente",
            });
            dispatch(AllProducts());
         },
         (error) => {
            Swal.fire({
               icon: "error",
               title: "Oops...",
               text: "Datos erroneos o el producto ya existe en la base de datos",
            });
         }
      );
   };
};

export const getMovieInfo = (id) => {
   return async (dispatch) => {
      try {
         const response = await axios.get(
            `http://localhost:3001/peliculas/${id}`
         );
         if (response?.data) {
            dispatch({
               type: "EDITMOVIEINFO",
               payload: { info: response.data },
            });
         }
      } catch (error) {
         console.log(error);
      }
   };
};

export const getFunctionInfo = (id) => {
   return async (dispatch) => {
      try {
         const response = await axios.get(
            `http://localhost:3001/funcion/${id}`
         );
         if (response?.data) {
            dispatch({
               type: "EDITFUNCTIONINFO",
               payload: { info: response.data },
            });
         }
      } catch (error) {
         console.log(error);
      }
   };
};

export const editMovie = (id, data) => {
   return async (dispatch) => {
      try {
         axios.put(`http://localhost:3001/peliculas/${id}`, data);
         Swal.fire("La pelicula fue editada!", "", "success");
         dispatch(AllMovies())
      } catch (error) {
         Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error}`,
         });
      }
   };

};


export const editFunction = (id, data) => {

   console.log("actiondata: " + JSON.stringify(data));
   return async (dispatch) => {
      try {
         axios.put(`http://localhost:3001/funcion/${id}`, data);
         Swal.fire("La función ha sido editada!", "", "success");
         dispatch(GetAllFunctions())
      } catch (error) {
         Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error}`,
         });
         //alert(error);
      }
   };

};

export const filterReviewByRating = (payload) => {
   return {
      type: "FILTER_REVIEWBYRATING",
      payload,
   };
};

export const removeActors = (id) => {
   return (dispatch) => {
      axios
         .delete(`http://localhost:3001/actores/${parseInt(id)}`)
         .then((res) => dispatch({ type: "DELETECAST", payload: id }))
         .catch((err) => console.log(err.response));
   };
};
export const deleteFunction = (id) => {
   return (dispatch) => {
      axios
         .delete(`http://localhost:3001/funcion/${id}`)
         .then((res) =>
            dispatch({ type: "DELETEFUNCTION", payload: parseInt(id) })
         )
         .catch((re) => Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error al eliminar pelicula!',
        showConfirmButton: false,
        timer: 1000
      }));
   };
};
export const removeMovie = (id) => {
   return (dispatch) => {
      axios
         .delete(`http://localhost:3001/peliculas/${parseInt(id)}`)
         .then((res) =>
            dispatch({ type: "DELETEMOVIE", payload: parseInt(id) })
         )
         .catch((re) => Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error al eliminar pelicula!',
        showConfirmButton: false,
        timer: 1000
      }));
   };
};
export const removeGenres = (id) => {
   return (dispatch) => {
      axios
         .delete(`http://localhost:3001/generos/${parseInt(id)}`)
         .then((res) =>
            dispatch({ type: "DELETEGENRE", payload: parseInt(id) })
         )
         .catch((res) => Swal.fire({
            position: 'center',
            icon: 'error',
            title: res.response.data,
            showConfirmButton: false,
            timer: 1000
          }));
   };
};
export const removeProduct = (id) => {
   return (dispatch) => {
      axios
         .delete(`http://localhost:3001/productos/${parseInt(id)}`)
         .then((res) =>
            dispatch({ type: "DELETEPRODUCT", payload: parseInt(id) })
         )
         .catch((res) => Swal.fire({
            position: 'center',
            icon: 'error',
            title: res.response,
            showConfirmButton: false,
            timer: 1000
          }));
   };
};
export const cleanMovieComments = () => {
   return (dispatch) => {
      dispatch({ type: "CLEANCOMMENTS" });
   };
};

export function deleteReview(id) {
   return async function (dispatch) {
      await axios.delete(`http://localhost:3001/comentarios/${id}`);
      return dispatch({
         type: "DELETE_REVIEW",
         payload: id,
      });
   };
}

export const updateReview = (payload) => {
   return async (dispatch) => {
      const json = await axios.put(
         "http://localhost:3001/comentarios",
         payload
      );
      return dispatch({
         type: "UPDATE_REVIEW",
         payload: json.data,
      });
   };
};

export const allUsers = (payload) => {
   return async (dispatch) => {
      const response = await axios.get("http://localhost:3001/firebase");
      if (response?.data) {
         dispatch({
            type: "ALL_USERS",
            payload: { users: response.data },
         });
      }
   };
};


export const createUser = (payload) => {
  return async (dispatch) => {

      const json = await axios.post(
         "http://localhost:3001/firebase/create",
         payload
      );

      return dispatch(allUsers());
   };
};

export const detailedUser = (id) => {
   return async (dispatch) => {
      const response = await axios.get(`http://localhost:3001/firebase/${id}`);
      if (response?.data) {
         dispatch({
            type: "DETAILED_USER",
            payload: { details: response.data },
         });
      }
   };
};

export const deleteUser = (id) => {

  return (dispatch) => {
    axios
      .get(`http://localhost:3001/firebase/delete/${id}`)
      .then((res) => dispatch({ type: "DELETE_USER", payload: id }))
      .catch((err) => console.log(err.response));
  };
};

export const updateUser = (id, data) => {
  return async (dispatch) => {
    const json = await axios.post(
      `http://localhost:3001/firebase/update/${id}`,
      data
    );
    dispatch(allUsers())
    return dispatch({
      type: "UPDATE_USER",
      payload: json.data
    })
  }
}

export const getProductInfo = (id) => {
   return async (dispatch) => {
      try {
         const response = await axios.get(
            `http://localhost:3001/productos/${id}`
         );
         if (response?.data) {
            dispatch({
               type: "EDITPRODUCTINFO",
               payload: { info: response.data },
            });
         }
      } catch (error) {
         console.log(error);
      }
   };
};

export const editProduct = (id, data) => {
   let body = {
      Product: data
   }
   return async (dispatch) => {
      try {
         axios.put(`http://localhost:3001/productos/${id}`, body);
         Swal.fire("El producto fue editado!", "", "success");
         dispatch(AllProducts())
      } catch (error) {
         Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error}`,
         });
      }
   };

};

export const updateCart = (payload) => ({ type: "UPDATE_CART", payload });
