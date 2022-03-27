const initialState = {
    PelisAll: [],
    ProductAll: [],

    GenresAll: [],
    CastAll: [],

    PelisFiltred: [],
    ProductFiltred: [],

    TopPelis: [],
    NextReleases: [],
    Promotions: [],
    ShoppingCart: [],

    PelisDetails: [],
    PelisComments: [],
    ProductDetails: [],
    ProductComments: [],
    // numberOfTickets: [],
    // costoTotalTickets: []
};

/*Película no encontrada*/
let Misterious = {
    titulo: "Movie Not found",
    sipnosis: "???",
    poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Orange_question_mark.svg/1200px-Orange_question_mark.svg.png",
    duracion: "???",
    pais: "???",
    clasificacion: "???",
    director: "???",
    puntuación: "???",
    distribuidora: "???",
    genero: ["???"],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // case "FALSEINFO": {
        //     state = initialState;
        //     return {
        //         ...state,
        //         PelisAll: state.PelisAll.concat(Alien, MiniMente, Anime, Alma)
        //     }
        // }

        case "ALLMOVIES": {
            return {
                ...state,
                PelisAll:action.payload.pelis,
            };
        }
        case "ALLPRODUCTS": {
            return {
                ...state,
                ProductAll:action.payload.produs,
            };
        }
        case "DELETECAST":{
            console.log("delete CastAll")
            return {
                ...state,
                CastAll: state.CastAll.filter(e=> e.id!== action.payload)
            }
        }
        case "DETAILEDMOVIE": {
            state = initialState;
            return {
                ...state,
                PelisDetails: action.payload.detis,
            };
        }
        case "DETAILEDPRODUCT": {
            state = initialState;
            return {
                ...state,
                ProductDetails: action.payload.produs,
            };
        }

        case "BESTMOVIES": {
            // console.log("howdy soy reducer")
            let pelis = [...state.PelisAll]
            let arreglar = pelis.sort((a, b) =>
                a.puntuación < b.puntuación ? 1 : b.puntuación < a.puntuación ? -1 : 0
            )
            // console.log("arreglar",arreglar)
            let arregloFinal = arreglar.slice(0, 3)
            return {
                ...state,
                TopPelis: arregloFinal,
            };

        }


        case "GENRES": {
            return {
                ...state,
                GenresAll:action.payload.generos,
            };
        }

        case "CAST": {
            return {
                ...state,
                CastAll:action.payload.actores,
            };
        }

        case "GET_REVIEW_BY_MOVIEID": {
            return {
                ...state,
                PelisComments: action.payload,
            };
        }

        case "POST_REVIEW": {
            return {
                ...state,
            };
        }

        case "PELI_NAME":
            state = initialState;
            return {
                ...state,
                PelisAll: action.payload,
            };
            
        case "FILTER_REVIEWBYRATING":
            let comentariosByRating;
            if (action.payload === "asc") {
                console.log(action.payload)
                comentariosByRating = state.PelisComments.sort(function (a, b) {
                    if (a.puntuación < b.puntuación) {
                        return -1
                    }
                    if (a.puntuación > b.puntuación) {
                        return 1
                    }
                    return 0
                })
            }
            if (action.payload === "des") {
                console.log(action.payload)
                comentariosByRating = state.PelisComments.sort(function (a, b) {
                    if (a.puntuación > b.puntuación) {
                        return -1
                    }
                    if (a.puntuación < b.puntuación) {
                        return 1
                    }
                    return 0
                })
            }
            return {
                ...state,
                PelisComments: comentariosByRating
            }

        default: {
            return state;
        }

        // case "DELETE_REVIEW": {
        //     return {
        //         ...state,
        //         PelisComments: state.PelisComments.filter(p =>{
        //             console.log(p)
        //             return  p !== action.payload
        //         })
        //     };
        // }
    }
};
export default reducer;
