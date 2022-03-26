import React from "react";
import { Link } from "react-router-dom";
import "./Movie.css";

export default function Movie({ id, titulo, director, poster, puntuación, clasificacion }) {
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
                            
                            ⭐: {puntuación}<br></br>
                            ®: {clasificacion}
                        </div>
                        <div><span className="Movie__director">{director}</span></div>
                    </div>
                </div>
            </Link>
        </>
    )
}