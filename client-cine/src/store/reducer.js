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
                PelisAll: state.PelisAll.concat(action.payload.pelis),
            };
        }

        case "DETAILEDMOVIE": {
            state = initialState;
            return {
                ...state,
                PelisDetails: action.payload.detis,
            };
        }
        // ----------------------------------------------------------------------------------------------------
        case "BESTMOVIES": {
            // console.log("howdy soy reducer")
            console.log(state.PelisAll)
            let pelis = [...state.PelisAll]
            let arreglar = pelis.sort((a, b) =>
                a.puntuación < b.puntuación ? 1 : b.puntuación < a.puntuación ? -1 : 0
            )
            // console.log("arreglar",arreglar)
            let arregloFinal = arreglar.slice(0,3)
            return {
                ...state,
                TopPelis: arregloFinal,
            };

        }


          case "BESTMOVIES": {
            // console.log("howdy soy reducer")
            let pelis = [...state.PelisAll]
            let arreglar = pelis.sort((a, b) =>
                a.puntuación < b.puntuación ? 1 : b.puntuación < a.puntuación ? -1 : 0
            )
            // console.log("arreglar",arreglar)
            let arregloFinal = arreglar.slice(0,3)
            return {
                ...state,
                TopPelis: arregloFinal,
            };

        }


        case "GENRES": {
            return {
                ...state,
                GenresAll: state.GenresAll.concat(action.payload.generos),
            };
        }

        case "CAST": {
            return {
                ...state,
                CastAll: state.CastAll.concat(action.payload.actores),
            };
        }

        case "FILTRARGENRES": {
            let ArrayReader = (elm, action) => {
                let completeArray = [];
                for (let i = 0; i < elm.length; i++) {
                    completeArray.push(elm[i].genero);
                }
                return action.every((v) => completeArray.includes(v));
            };
            let filteredArray = state.PelisAll.filter((element) =>
                ArrayReader(element.Generos, action.payload)
            );
            if (filteredArray.length === 0) {
                filteredArray.push(Misterious);
            }
            return {
                ...state,
                PelisFiltred: filteredArray,
            };
        }

        case "FILTRARCASTING": {
            let ArrayReader = (elm, action) => {
                let completeArray = [];
                for (let i = 0; i < elm.length; i++) {
                    completeArray.push(elm[i].nombre);
                }
                return action.every((v) => completeArray.includes(v));
            };
            let filteredArray = state.PelisAll.filter((element) =>
                ArrayReader(element.Actores, action.payload)
            );
            if (filteredArray.length === 0) {
                filteredArray.push(Misterious);
            }
            return {
                ...state,
                PelisFiltred: filteredArray,
            };
        }
        case "FILTRARGENEROYCASTING": {
            let ArrayReaderGenero = (elm, action) => {
                let completeArray = [];
                for (let i = 0; i < elm.length; i++) {
                    completeArray.push(elm[i].genero);
                }
                return action.every((v) => completeArray.includes(v));
            };
            let ArrayReaderCast = (elm, action) => {
                let completeArray = [];
                for (let i = 0; i < elm.length; i++) {
                    completeArray.push(elm[i].nombre);
                }
                return action.every((v) => completeArray.includes(v));
            };
            let genreArray = state.PelisAll.filter((element) =>
                ArrayReaderGenero(element.Generos, action.payload[0])
            );
            let castArray = state.PelisAll.filter((element) =>
                ArrayReaderCast(element.Actores, action.payload[1])
            );
            let filteredArray = genreArray.filter((value) =>
                castArray.includes(value)
            );
            if (
                genreArray.length === 0 ||
                castArray.length === 0 ||
                filteredArray.length === 0
            ) {
                filteredArray.push(Misterious);
            }
            return {
                ...state,
                PelisFiltred: filteredArray,
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

        default: {
            return state;
        }
    }
};
export default reducer;
