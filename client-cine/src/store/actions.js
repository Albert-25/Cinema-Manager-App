import axios from "axios";

export const FalseInfo = (arg) => {
   return {
      type: "FALSEINFO",
      payload: arg,
   };
};

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

export function getAllReview() {
   return async function (dispatch) {
      const json = await axios.get("http://localhost:3001/comentarios");
      return dispatch({
         type: "GET_REVIEW",
         payload: json.data,
      });
   };
}

export const postReview = (payload) => {
   return async (dispatch) => {
      const json = await axios.post(
         "http://localhost:3001/comentarios",
         payload
      );
      return dispatch({
         type: "POST_REVIEW",
         payload: json,
      });
   };
};

export const FalseGenres = (arg) => {
   return {
      type: "FALSEGENRES",
      payload: arg,
   };
};

export const FalseCast = (arg) => {
   return {
      type: "FALSECAST",
      payload: arg,
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

export const FiltrarGeneroAndCast = (arg) => {
   return {
      type: "FILTRARGENEROANDCASTING",
      payload: arg,
   };
};

export const searchByName = (titulo) => {
   return async function (dispatch) {
      try {
         const json = await axios.get(
            "http://localhost:3001/peliculas/?title=" + titulo
         );
         return dispatch({
            type: "PELI_NAME",
            payload: json.data,
         });
      } catch (error) {
         console.log("No se pudo obtener las peliculas", error);
      }
   };
};

export const DetailedMovie = (id) => {
   return async (dispatch) => {
      try {
         const response = await axios.get(`/Movies/${id}`);
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
