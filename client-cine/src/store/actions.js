 import axios from "axios"

export const FalseInfo = (arg) => {
    return {
        type: "FALSEINFO",
        payload: arg
    }
}


export const FalseGenres = (arg) => {

    return {
        type: "FALSEGENRES",
        payload: arg
    }
}

export const FalseCast = (arg) => {

    return {
        type: "FALSECAST",
        payload: arg
    }
}

export const FiltrarGenero = (arg) => {
    return {
        type: "FILTRARGENRES",
        payload: arg
    }
}

export const FiltrarCast  = (arg) => {
    return {
        type: "FILTRARCASTING",
        payload: arg
    }
}


export const  FiltrarGeneroAndCast = (arg) => {
    return {
        type: "FILTRARGENEROANDCASTING",
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

