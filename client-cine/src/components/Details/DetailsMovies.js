import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DetailedMovie, getAllReviewByIdOfMovie } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ReviewToShow from "../ReviewToShow/ReviewToShow.jsx"
import "./DetailsMovies.css";

const DetailsMovies = (props) => {
    let { id: code } = useParams();
    let [id] = useState(code);
    const dispatch = useDispatch();
    const detailed = useSelector((state) => state.PelisDetails);
    const comentarios = useSelector(state => state.PelisComments);
    const puntuacionArray = comentarios.map(c => c.puntuación)
    const sumaPuntuaciones = puntuacionArray.reduce((contador, puntuacion) => contador + puntuacion, 0);
    const numeroPuntuaciones = puntuacionArray.length;
    const promedioPuntuacion = (sumaPuntuaciones / numeroPuntuaciones).toFixed(1)
    // console.log(detailed)


    useEffect(() => {
        dispatch(DetailedMovie(id));
        dispatch(getAllReviewByIdOfMovie(id));
    }, [id, dispatch]);



    // console.log("la ide detalles : ", id)
    let Mooovie = [];
    if (detailed[0]) {
        Mooovie = detailed[0];
    }



    let GenArray = detailed.Generos && detailed.Generos.length ? detailed.Generos.map((e) => e.genero) : ["no genres"]
    let ActArray = detailed.Actores && detailed.Actores.length ? detailed.Actores.map((e) => e.nombre) : ["no actors"]

    return (
        <body className="Background__Details">
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
                <div className="Details__trailer grid__child">
                    <h4>Trailer:</h4>
                    <p>{detailed.trailer || Mooovie.trailer}</p>
                </div>
            </div>

            <div className="container_footer">
                <div className="buttons">
                    <Link to={`/review/${id}`}>
                        <button>Escribir un comentario</button>
                    </Link>
                    <Link to="/" className="Details__rightdown">
                        <button className="Details__rightdown__text">👉 Go back 👈</button>
                    </Link>
                </div>
                <div className="comentarios">
                    <ReviewToShow id={id} />
                </div>
            </div>
        </body>
    );
};

export default DetailsMovies;
