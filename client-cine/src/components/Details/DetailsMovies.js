import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DetailedMovie, getAllReviewByIdOfMovie, filterReviewByRating } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ReviewToShow from "../ReviewToShow/ReviewToShow.jsx"
import { BodyBackground } from "./styled.js"
import "./DetailsMovies.css";
import ReactPlayer from "react-player"

const DetailsMovies = (props) => {
    let { id: code } = useParams();
    let [id] = useState(code);
    const dispatch = useDispatch();
    const detailed = useSelector((state) => state.PelisDetails);
    const comentarios = useSelector(state => state.PelisComments);
    const puntuacionArray = comentarios && comentarios.map(c => c.puntuación)
    const sumaPuntuaciones = puntuacionArray && puntuacionArray.reduce((contador, puntuacion) => contador + puntuacion, 0);
    const numeroPuntuaciones = puntuacionArray && puntuacionArray.length;
    const promedioPuntuacion = (sumaPuntuaciones / numeroPuntuaciones).toFixed(1)
    const [ordenRating, setOrdenRating] = useState("")

    useEffect(() => {
        dispatch(DetailedMovie(id));
        dispatch(getAllReviewByIdOfMovie(id));
    }, [dispatch]);

    const handleFilterRating = e => {
        dispatch(filterReviewByRating(e.target.value))
        setOrdenRating(`ordenado ${e.target.value}`)
    }

    // console.log("la ide detalles : ", id)
    let Mooovie = [];
    if (detailed[0]) {
        Mooovie = detailed[0];
    }



    let GenArray = detailed.Generos && detailed.Generos.length ? detailed.Generos.map((e) => e.genero) : ["no genres"]
    let ActArray = detailed.Actores && detailed.Actores.length ? detailed.Actores.map((e) => e.nombre) : ["no actors"]

    return (
        <BodyBackground image={detailed.background} className="Background__Details">
            <ReactPlayer
                url={detailed.trailer}
                width="100%"
                height="400px"
            />
            <div className="Details__title">
                <h1>{detailed.titulo || Mooovie.titulo}</h1>
            </div>
            <div className="Details__right">
                <div className="Details__left">
                    <img
                        className="MovieImg__img"
                        src={detailed.poster || Mooovie.poster}
                        alt="background"
                    ></img>
                </div>
                <div className="Details__sinopsis">
                    <h3>Sinopsis: </h3>
                    <p>{detailed.sinopsis || Mooovie.sinopsis}</p>
                </div>
                <div className="Details__duracion grid__child">
                    <h4>Duracion:</h4>
                    <span>{detailed.duracion || Mooovie.duracion}</span>
                </div>
                <div className="Details__clasificacion grid__child">
                    <h4>Clasificacion:</h4>
                    <span>{detailed.clasificacion || Mooovie.clasificacion}</span>
                </div>
                <div className="Details__director grid__child">
                    <h4>Director:</h4>
                    <span> {detailed.director || Mooovie.director}</span>
                </div>
                <div className="Details__puntuación grid__child">
                    <h4>Puntuación: </h4>
                    <span>{isNaN(promedioPuntuacion) ? "Todavia sin puntuación" : promedioPuntuacion}</span>
                </div>
                <div className="Details__pais grid__child">
                    <h4>Pais:</h4>
                    <span>{detailed.pais || Mooovie.pais}</span>
                </div>
                <div className="Details__distribuidora grid__child">
                    <h4>Distribuidora:</h4>
                    <span>{detailed.distribuidora || Mooovie.distribuidora}</span>
                </div>
                <div className="Details__genero grid__child">
                    <h4>Generos</h4>
                    <div className="Details__trailer">
                        {Array.isArray(GenArray) ? (
                            GenArray.map((a, i) => {
                                if (i == GenArray.length - 1) {

                                    return (
                                        <span key={a}>
                                            {a}
                                        </span>
                                    )
                                }
                                return (
                                    <span key={a}>
                                        {a + ", "}
                                    </span>
                                )
                            })
                        ) : (
                            <span>No genres yet</span>
                        )}
                    </div>
                </div>

                <div className="Details__actores grid__child">
                    <h4>Actores</h4>
                    <div className="Details__trailer">
                        {Array.isArray(ActArray) ? (
                            ActArray.map((a, i) => {
                                if (i == GenArray.length - 1) {
                                    return (
                                        <span key={a}>
                                            {a}
                                        </span>
                                    )
                                }
                                return (
                                    <span key={a}>
                                        {a + ", "}
                                    </span>
                                )
                            })
                        ) : (
                            <span>No genres yet</span>
                        )}
                    </div>
                </div>
            </div>


            <div className="container_footer">
                <div className="h3">
                    <h5>Comentarios</h5>
                    <hr></hr>
                </div>
                <div className="buttons">
                    <div className="div_lef">
                        <div>Ordenar por rating:</div>
                        <select className="filterByRating" onChange={handleFilterRating}>
                            <option selected disabled={true}>Select rating</option>
                            <option value="asc">Ascendente</option>
                            <option value="des">Descendente</option>
                        </select>
                        <Link className="button_comentar" to={`/review/${id}`}>
                            <button>Escribir un comentario</button>
                        </Link>
                    </div>
                </div>
                <div>
                <a href="/" className="Details__rightdown">
                    <p className="Details__rightdown__text">👉 Go back 👈</p>
                </a>
                </div>
                <div className="comentarios">
                    <ReviewToShow id={id} />
                </div>
                {console.log(comentarios)}

            </div>


        </BodyBackground>
    );
};

export default DetailsMovies;
