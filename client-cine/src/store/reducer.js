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

let Alien = {
    "titulo": "Alien: El Octavo Pasajero",
    "sipnosis": "De regreso a la Tierra, la nave de carga Nostromo interrumpe su viaje y despierta a sus siete tripulantes. El ordenador central, MADRE, ha detectado la misteriosa transmisión de una forma de vida desconocida, procedente de un planeta cercano aparentemente deshabitado. La nave se dirige entonces al extraño planeta para investigar el origen de la comunicación.",
    "poster": "https://www.elche.es/wp-content/uploads/2019/10/Alien-El-Octavo-Pasajero.jpg",
    "duracion": "116",
    "clasificacion": "PG",
    "director": "Ridley Scott",
    "puntuación": "4",
    "pais": "Estados Unidos",
    "distribuidora": "20th Century Fox",
    "trailer": "https://www.youtube.com/watch?v=LjLamj-b0I8"
}

let MiniMente = {
    "titulo": "Megamente",
    "sipnosis": "Megamind es un supervillano. Durante años, ha intentado conquistar Metro City, pero un héroe llamado Metro Man se lo impedía. Tras muchos intentos, Megamind consigue matarlo. De repente, su vida carece de sentido. ¿Qué puede hacer un supervillano sin un superhéroe con el que enfrentarse? Crear a Titán, un nuevo héroe. Sin embargo Titán empieza a pensar que es mucho más divertido destruir el mundo en vez de salvarlo. ¿Podrá derrotar Megamind a su diabólica criatura?",
    "poster": "https://www.encadenados.org/rdc/images/stories/sin_perdon/num_65/megamind-00.jpg",
    "duracion": "96",
    "clasificacion": "G",
    "director": "Tom McGrath",
    "puntuación": "5",
    "pais": "estados unidos",
    "distribuidora": "DreamWorks",
    "trailer": "https://youtu.be/kPVbYBYN--I"
}

let Anime = {
    "titulo": "The Night Is Short, Walk on Girl",
    "sipnosis": "La película sigue a una noche de fiesta para dos estudiantes universitarios: una mujer anónima, conocida como Kōhai a través de película y kurokami no otome ('doncella de cabello negro') en los créditos de la película, y un hombre anónimo conocido como Senpai en la película y sus créditos. El senpai planea confesarle sus sentimientos románticos por la kōhai esa noche, aunque las circunstancias los mantienen separados durante la mayor parte de la noche.",
    "poster": "https://media-cache.cinematerial.com/p/500x/rfszix4c/yoru-wa-mijikashi-arukeyo-otome-spanish-movie-poster.jpg?v=1525909712",
    "duracion": "93",
    "pais": "Japón",
    "clasificacion": "PG-13",
    "director": "Masaaki Yuasa",
    "puntuación": "2",
    "distribuidora": "Tōhō",
    "trailer": "https://www.youtube.com/watch?v=RGHXqjCbyEQ",
}

let Alma = {
    "titulo": "Soul",
    "sipnosis": "Un profesor de música que ha perdido la pasión se transporta fuera de su cuerpo al 'Gran Antes' y debe encontrar el camino de regreso con la ayuda de un alma infantil que aprende sobre sí misma.",
    "poster": "https://lumiere-a.akamaihd.net/v1/images/image_5e27f8d3.jpeg?region=0,0,648,972",
    "duracion": "100",
    "pais": "EE.UU",
    "clasificacion": "Todos los públicos",
    "director": "Pete Docter, Kemp Powers",
    "puntuación": "3",
    "distribuidora": "Disney+",
    "trailer": "https://www.youtube.com/watch?v=xOsLIiBStEs&ab_channel=Pixar",
}




const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "FALSEINFO": {
            state = initialState;
            return {
                ...state,
                PelisAll: state.PelisAll.concat(Alien, MiniMente, Anime, Alma)
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



        default: {
            return state;
        }
    }
}
export default reducer;