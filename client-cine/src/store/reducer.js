const initialState = {
    PelisAll: [],
    ProductAll: [],

    GenresAll:[],
    CastAll:[],

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
}


/*Película no encontrada*/
let Misterious = {
    "titulo": "Movie Not found",
    "sipnosis": "???",
    "poster": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Orange_question_mark.svg/1200px-Orange_question_mark.svg.png",
    "duracion": "???",
    "pais": "???",
    "clasificacion": "???",
    "director": "???",
    "puntuación": "???",
    "distribuidora": "???",
    "trailer": "???",
    'genero': ['???'],
}

let Generos = ["Acción", "Terror", "Animación", "Infantil"];
let Cast = ["Chris Pratt", "Adam Sandler", "Sigourney Weaver", "Jamie Lee Curtis"];





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
            state = initialState;
            return {
                ...state,
                PelisAll: state.PelisAll.concat(action.payload.pelis)
            }
        }

        case "DETAILEDMOVIE": {
            state = initialState;
            return {
                ...state,
                PelisDetails: action.payload.detis,
            };
        }

         case "FALSEGENRES": {
            return {
                ...state,
                GenresAll: state.GenresAll.concat(Generos)
            }
        }
        case "FALSECAST": {
            return {
                ...state,
                CastAll: state.CastAll.concat(Cast)
            }
        }
        case "FILTRARGENRES": {
            let ArrayReader = (elm, action) => action.every(v => elm.includes(v))
            let filteredArray = state.PelisAll.filter((element) => ArrayReader(element.genero, action.payload));
            if(filteredArray.length === 0){
                filteredArray.push(Misterious)
            }
            return {
                ...state,
                PelisFiltred: filteredArray
            }
        }
        case "FILTRARCASTING": {
             let ArrayReader = (elm, action) => action.every(v => elm.includes(v))
            let filteredArray = state.PelisAll.filter((element) => ArrayReader(element.cast, action.payload));
            if(filteredArray.length === 0){
                filteredArray.push(Misterious)
            }
            return {
                ...state,
                PelisFiltred: filteredArray
            }
        }
         case "FILTRARGENEROANDCASTING": {
            console.log(action.payload)
            let ArrayReader = (elm, action) => action.every(v => elm.includes(v))
            let genreArray = state.PelisAll.filter((element) => ArrayReader(element.genero, action.payload[0]));
            console.log(genreArray)
            let castArray = state.PelisAll.filter((element) => ArrayReader(element.cast, action.payload[1]));
            let filteredArray = genreArray.filter(value => castArray.includes(value));
            if(genreArray.length === 0 || castArray.length === 0 || filteredArray.length === 0){
                filteredArray.push(Misterious)
            }
            return {
                ...state,
                PelisFiltred: filteredArray
            }
        }


        case "GET_REVIEW": {
            return {
                ...state,
                ProductComments: action.payload
            }
        }

        case "POST_REVIEW": {
            return {
                ...state
            }
        }


        case "PELI_NAME":
            state = initialState
			return {
				...state,
				PelisAll: action.payload
			}









        default: {
            return state;
        }
    }
}
export default reducer;