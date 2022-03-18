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