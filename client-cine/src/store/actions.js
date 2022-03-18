import axios from "axios"

export const FalseInfo = (arg) => {
    return {
        type: "FALSEINFO",
        payload: arg
    }
}

export function getAllReview() {
    return async function (dispatch) {
        const json = await axios.get("http://localhost:3001/comentarios")
        return dispatch({
            type: "GET_REVIEW",
            payload: json.data
        })
    }
}


export const postReview = (payload) => {
    return async dispatch => {
        const json = await axios.post("http://localhost:3001/comentarios", payload)
        return dispatch({
            type: "POST_REVIEW",
            payload: json
        })
    }
}