const initialState = {
    PelisAll: [],
    ProductAll: [],

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
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "FALSEINFO": {
            state = initialState;
            return {
                ...state,
                PelisAll: state.PelisAll.concat("holiwis SOY UN DATO, WOOOO!!!")
            }
        }






        default: {
            return state;
        }
    }
}
export default reducer;