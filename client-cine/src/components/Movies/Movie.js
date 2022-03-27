import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Movie.css";
import { getAllReviewByIdOfMovie } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";

export default function Movie({ id, titulo, director, poster, puntuación, clasificacion }) {

    const dispatch = useDispatch();
    const comentarios = useSelector(state => state.PelisComments);
    const puntuacionArray = comentarios && comentarios.map(c => c.puntuación)
    const sumaPuntuaciones = puntuacionArray && puntuacionArray.reduce((contador, puntuacion) => contador + puntuacion, 0);
    const numeroPuntuaciones = puntuacionArray && puntuacionArray.length;
    const promedioPuntuacion = (sumaPuntuaciones / numeroPuntuaciones).toFixed(1)

    useEffect(() => {
        dispatch(getAllReviewByIdOfMovie(id));
    }, [dispatch]);

    return (
        <>
            <Link to={`MovieDetails/${id}`}>
                <div
                    className="Movie__All"
                    style={{ backgroundImage: `url('${poster}')` }}>
                    <div className="Movie__ContainerImg">
                        <div className="Movie__title">
                            {titulo}
                        </div>
                        <div className="Movie__info">
                            ⭐: {isNaN(promedioPuntuacion) ? "--" : promedioPuntuacion}<br></br>
                            ®: {clasificacion}
                        </div>
                        <div><span className="Movie__director">{director}</span></div>
                    </div>
                </div>
            </Link>
        </>
    )
}