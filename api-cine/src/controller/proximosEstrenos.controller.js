const { ProximosEstrenos } = require("../db/models/proximosEstrenos");
const Generos = require("../db/models/generos");
const Actores = require("../db/models/actores");

//desarrollar aqui las funciones para los pedidos a la base de datos

const getAll = async (req, res, next) => {
  try {
    const proxEstrenos = await ProximosEstrenos.findAll({
      include: [Generos, Actores],
    });
    res.send(proxEstrenos);
  } catch (error) {
    next(error);
  }
};

const crearEstreno = async (req, res, next) => {
  const { movie, genreIds, actorsIds } = req.body;

  //   console.log("movie: " + movie,"genres: " + genreIds, "actors: " +  actorsIds);

  const testMovies = [
    {
      titulo: "Megamente",
      sinopsis:
        "Megamind es un supervillano. Durante años, ha intentado conquistar Metro City, pero un héroe llamado Metro Man se lo impedía. Tras muchos intentos, Megamind consigue matarlo. De repente, su vida carece de sentido. ¿Qué puede hacer un supervillano sin un superhéroe con el que enfrentarse? Crear a Titán, un nuevo héroe. Sin embargo Titán empieza a pensar que es mucho más divertido destruir el mundo en vez de salvarlo. ¿Podrá derrotar Megamind a su diabólica criatura?",
      poster: "https://pics.filmaffinity.com/Megamind-871453660-large.jpg",
      duracion: 96,
      clasificacion: "G",
      director: "Tom McGarth",
      puntuacion: "0",
      pais: "Estados Unidos",
      distribuidora: "DreamWorks",
      trailer: "https://youtu.be/kPVbYBYN--I",
    },
    {
      titulo: "Soul",
      sinopsis:
        "Un profesor de música que ha perdido la pasión se transporta fuera de su cuerpo al 'Gran Antes' y debe encontrar el camino de regreso con la ayuda de un alma infantil que aprende sobre sí misma.",
      poster:
        "https://lumiere-a.akamaihd.net/v1/images/image_5e27f8d3.jpeg?region=0,0,648,972",
      duracion: 100,
      clasificacion: "ATP",
      director: "Pete Docter, Kemp Powers",
      puntuacion: "0",
      pais: "Estados Unidos",
      distribuidora: "Disney+",
      trailer: "https://www.youtube.com/watch?v=xOsLIiBStEs&ab_channel=Pixar",
    },
    {
      titulo: "The Night Is Short, Walk on Girl",
      sinopsis:
        "La película sigue a una noche de fiesta para dos estudiantes universitarios: una mujer anónima, conocida como Kōhai a través de película, y un hombre anónimo conocido como Senpai en la película. El senpai planea confesarle sus sentimientos románticos por la kōhai esa noche, aunque las circunstancias los mantienen separados durante la mayor parte de la noche",
      poster:
        "https://media-cache.cinematerial.com/p/500x/rfszix4c/yoru-wa-mijikashi-arukeyo-otome-spanish-movie-poster.jpg?v=1525909712",
      duracion: 93,
      clasificacion: "PG-13",
      director: "Masaaki Yuasa",
      puntuacion: "0",
      pais: "Japón",
      distribuidora: "Tōhō",
      trailer: "https://www.youtube.com/watch?v=RGHXqjCbyEQ",
    },
    {
      titulo: "The Northman",
      sinopsis:
        "The Northman es una próxima película de suspenso y drama histórico épico estadounidense-británica dirigida por Robert Eggers, con un guion coescrito por el poeta y novelista islandés Sjón. Con su historia ambientada a principios del siglo x en Islandia, estará protagonizada por Alexander Skarsgård como el príncipe vikingo Amleth, junto a Nicole Kidman, Anya Taylor-Joy, Björk, Ralph Ineson, Ethan Hawke y Willem Dafoe. La trama seguirá al personaje de Amleth, quien emprende una misión vengativa después del asesinato de su padre.",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMDNkMTVlODUtNjBlMi00ZTUyLWI5OTItZTFjMjVlMTA5MTkzXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UX1000_.jpg",
      duracion: 93,
      clasificacion: "PG",
      director: "Robert Eggers",
      puntuacion: "4.4",
      pais: "Estados Unidos",
      distribuidora: "Focus Pictures",
      trailer: "https://www.youtube.com/watch?v=oMSdFM12hOw",
    },
    {
      titulo: "Alien: El Octavo Pasajero",
      sinopsis:
        "De regreso a la Tierra, la nave de carga Nostromo interrumpe su viaje y despierta a sus siete tripulantes. El ordenador central, MADRE, ha detectado la misteriosa transmisión de una forma de vida desconocida, procedente de un planeta cercano aparentemente deshabitado. La nave se dirige entonces al extraño planeta para investigar el origen de la comunicación.",
      poster: "https://pics.filmaffinity.com/alien-657278575-mmed.jpg",
      duracion: 116,
      clasificacion: "PG",
      director: "Ridley Scott",
      puntuacion: "0",
      pais: "Estados Unidos",
      distribuidora: "20th Century Fox",
      trailer: "https://www.youtube.com/watch?v=LjLamj-b0I8",
    },
  ];

  try {
    let peli = await ProximosEstrenos.create(movie);
    await peli.addGeneros(genreIds);
    await peli.addActores(actorsIds);

    res.json({ message: "creado correctamente", data: peli });
  } catch (error) {
    next(error);
  }
};

const editarEstreno = async (req, res, next) => {
  const id = req.params.id;
  try {
    const [Estreno] = await ProximosEstrenos.update(req.body.movie, {
      where: { id: id },
    });
    if (Estreno) {
      return res.json({
        message: "Estreno actualizado correctamente",
        data: await ProximosEstrenos.findByPk(id),
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const eliminarEstreno = async (req, res, next) => {
  const id = req.params.id;
  try {
    const eliminado = await ProximosEstrenos.destroy({ where: { id: id } });
    if (eliminado) {
      return res.json({ message: "Estreno eliminado correctamente" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  crearEstreno,
  getAll,
  editarEstreno,
  eliminarEstreno
  //funciones a exportar para las rutas
};
