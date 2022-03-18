 import axios from "axios"

export const FalseInfo = (arg) => {
    return {
        type: "FALSEINFO",
        payload: arg
    }
}


export const searchByName = (titulo) => {
	return async function (dispatch) {
		try {
			const json = await axios.get('http://localhost:3001/peliculas/?title=' + titulo);
		        return dispatch({
				type: "PELI_NAME",
				payload: json.data
			});

		} catch (error) {
			console.log("No se pudo obtener las peliculas", error);
        }
    }
}
