// import axios from "axios"

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

export const FiltrarGenero = (arg) => {

    return {
        type: "FILTRARGENRES",
        payload: arg
    }
}

