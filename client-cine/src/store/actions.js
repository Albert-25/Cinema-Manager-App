// import axios from "axios"

export const FalseInfo = (arg) => {
    return {
        type: "FALSEINFO",
        payload: arg
    }
}

export const DetailedMovie = (id) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`/Movies/${id}`);
        if (response?.data) {
          dispatch({ type: "DETAILEDMOVIE", payload: { detis: response.data } });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };