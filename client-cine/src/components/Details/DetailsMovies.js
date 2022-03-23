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
            <div className="Details__left">
                <img
                    className="MovieImg__img"
                    src={detailed.poster || Mooovie.poster}
                    alt="background"
                ></img>
            </div>

            <div className="Details__right">
                <div className="Details__title">
                    {detailed.titulo || Mooovie.titulo}
                </div>
                <div className="Details__sinopsis">
                    💖sinopsis: {detailed.sinopsis || Mooovie.sinopsis}
                </div>
                <div className="Details__duracion">
                    💖duracion: {detailed.duracion || Mooovie.duracion}
                </div>
                <div className="Details__clasificacion">
                    💖clasificacion: {detailed.clasificacion || Mooovie.clasificacion}
                </div>
                <div className="Details__director">
                    💖director: {detailed.director || Mooovie.director}
                </div>
                <div className="Details__puntuación">
                    💖puntuación: {detailed.puntuación || Mooovie.puntuación}
                </div>
                <div className="Details__puntuación">
                    {`★puntuación: ${isNaN(promedioPuntuacion) ? "Todavia sin puntuación" : promedioPuntuacion}`}
                </div> 
                <div className="Details__pais">
                    💖pais: {detailed.pais || Mooovie.pais}
                </div>
                <div className="Details__distribuidora">
                    💖distribuidora: {detailed.distribuidora || Mooovie.distribuidora}
                </div>
                <div className="Details__trailer">
                    💖trailer: {detailed.trailer || Mooovie.trailer}
                </div>

                <div className="Details__genero">
                    <div className="Details__trailer">
                        {Array.isArray(GenArray) ? (
                            GenArray.map((a) => (
                                <li key={a}>
                                    <span>{a} </span>
                                </li>
                            ))
                        ) : (
                            <span>No genres yet</span>
                        )}
                    </div>
                </div>

                <div className="Details__actores">
                    <div className="Details__trailer">
                        {Array.isArray(ActArray) ? (
                            ActArray.map((a) => (
                                <li key={a}>
                                    <span>{a} </span>
                                </li>
                            ))
                        ) : (
                            <span>No genres yet</span>
                        )}
                    </div>
                </div>

            </div>
            <div>
                <Link to={`/review/${id}`}>
                    <button>Escribir un comentario</button>
                </Link>
            </div>
            <div className="">
                <Link to="/" className="Details__rightdown">
                    <p className="Details__rightdown__text">👉 Go back 👈</p>
                </Link>
            </div>
            <div>
                <ReviewToShow id={id} />
            </div>
        </body>
    );
};

export default DetailsMovies;
