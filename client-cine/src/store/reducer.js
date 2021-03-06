import { getItemsCart } from "../utils/itemsCart";

const initialState = {
  PelisAll: [],
  ProductAll: [],
  TotalProductAll: [],

  GenresAll: [],
  CastAll: [],
  FunctionsAll: [],

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

  FirebaseUsers: [],
  newPic: [],
  DetailedUser: [],
  cartUrl:[],
  cartID:[],
  Retrive:[],
  itemsCart: JSON.parse(localStorage.getItem("items")) || [],
  // numberOfTickets: [],
  // costoTotalTickets: []
  editInfo: "",
  editFunctionInfo: [], 
};

/*Película no encontrada*/
let Misterious = {
  titulo: "Movie Not found",
  sipnosis: "???",
  poster:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Orange_question_mark.svg/1200px-Orange_question_mark.svg.png",
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


    case "DETAILEDMOVIE": {
      return {
        ...state,
        PelisDetails: action.payload.detis,
      };
    }
    case "GETRETRIVE": {
      return {
        ...state,
        Retrive: action.payload.retr,
      };
    }
    case "DETAILEDPRODUCT": {
      return {
        ...state,
        ProductDetails: action.payload.produs,
      };
    }

    case "ALLMOVIES": {
      return {
        ...state,

        PelisAll: action.payload.pelis,

      };
    }
    case "ALLPRODUCTS": {
      return {
        ...state,
        ProductAll: action.payload.produs,
        TotalProductAll: action.payload.produs,
      };
    }
    case "FUTURERELEASES": {
      return {
        ...state,
        NextReleases: action.payload.rele,
      };
    }
    case "CLEANCOMMENTS": {
      return {
        ...state,
        PelisComments: []
      }
    }
    case "EDITMOVIEINFO": {
      return {
        ...state,
        editInfo: action.payload.info,
      };
    }

    case "EDITPRODUCTINFO": {
      return {
        ...state,
        editInfo: action.payload.info,
      };
    }



    
    case "EDITFUNCTIONINFO": {
      return {
        ...state,
        editFunctionInfo: action.payload.info,
      };
    }

    // ----------------------------------------------------------------------------------------------------
    case "BESTMOVIES": {
      let pelis = [...state.PelisAll];
      let arreglar = pelis.sort((a, b) =>
        a.puntuación < b.puntuación ? 1 : b.puntuación < a.puntuación ? -1 : 0
      );
      let arregloFinal = arreglar.slice(0, 3);
      return {
        ...state,
        TopPelis: arregloFinal,
      };
    }
    case "GETFUNCTIONS": {
      return {
        ...state,
        FunctionsAll: action.payload.funcs,
      };
    }

    case "GENRES": {
      return {
        ...state,
        GenresAll: action.payload.generos,
      };
    }

    case "CAST": {
      return {
        ...state,
        CastAll: action.payload.actores,
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
    case "POSTBUY": {
      return{
        ...state,
        cartUrl: [...action.payload]
      }
    }

    case "PELI_NAME":
      //state = initialState;
      return {
        ...state,
        PelisAll: action.payload,
      };
      
       case "DELETEFUNCTION":
      return {
        ...state,
        FunctionsAll: state.FunctionsAll.filter(e => e.id !== action.payload)
      }
    case "DELETEMOVIE":
      return {
        ...state,
        PelisAll: state.PelisAll.filter(e => e.id !== action.payload)
      }
    case "DELETEGENRE":
      return {
        ...state,
        GenresAll: state.GenresAll.filter(e => e.id !== action.payload)
      }
    case "DELETECAST":
      return {
        ...state,
        CastAll: state.CastAll.filter(e => e.id !== action.payload)
      }
    case "DELETEPRODUCT":
      return {
        ...state,
        ProductAll: state.ProductAll.filter(e => e.id !== action.payload)
      }
    case "FILTER_REVIEWBYRATING":
      let comentariosByRating;
      if (action.payload === "asc") {
        comentariosByRating = state.PelisComments.sort(function (a, b) {
          if (a.puntuación < b.puntuación) {
            return -1;
          }
          if (a.puntuación > b.puntuación) {
            return 1;
          }
          return 0;
        });
      }
      if (action.payload === "des") {
        comentariosByRating = state.PelisComments.sort(function (a, b) {
          if (a.puntuación > b.puntuación) {
            return -1;
          }
          if (a.puntuación < b.puntuación) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        PelisComments: comentariosByRating,
      };


    case "DELETE_REVIEW": {
      return {
        ...state,
        PelisComments: state.PelisComments.filter(c => c.id !== action.payload)
      };
    }
    case "UPDATE_REVIEW": {
      return {
        ...state
      }
    }
    case "ALL_USERS": {
      return {
        ...state,
        FirebaseUsers: action.payload.users
      }
    }
   case "CREATE_USER": {
      return {
        ...state
      }
    }
    case "DETAILED_USER": {
      return {
        ...state,
        DetailedUser: action.payload.details,
      }
    }

    case "DELETE_USER":
      return {
        ...state,
        FirebaseUsers: state.FirebaseUsers.filter(e => e.id !== action.payload)
      }

    case "UPDATE_USER": {
      return {
        ...state,
        newPic: action.payload
      }
    }

    case "UPDATE_CART": {
      return {
        ...state,
        itemsCart: action.payload
      }
    }

    case "FILTER_BYPRICE": {
      let ProductsByPrice;
      if (action.payload === "asc") {
        ProductsByPrice = state.ProductAll.sort(function (a, b) {
          if (a.precio < b.precio) {
            return -1;
          }
          if (a.precio > b.precio) {
            return 1;
          }
          return 0;
        });
      }
      if (action.payload === "des") {
        ProductsByPrice = state.ProductAll.sort(function (a, b) {
          if (a.precio > b.precio) {
            return -1;
          }
          if (a.precio < b.precio) {
            return 1;
          }
          return 0;
        });
      }

      return {
        ...state,
        ProductAll: ProductsByPrice
      }
    }

    case "FILTER_BYCOMBO": {
      const totalProductAll = state.TotalProductAll;
      const comboFiltered = action.payload === "true" ? totalProductAll.filter(p => p.isCombo === true) : totalProductAll.filter(p => p.isCombo === false)
      return {
        ...state,
        ProductAll: action.payload === "all" ? totalProductAll : comboFiltered
      }
    }

    default: {
      return state;
    }


  }
};

export default reducer