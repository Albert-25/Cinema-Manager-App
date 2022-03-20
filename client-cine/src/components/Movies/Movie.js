import React from "react";
import { Link } from "react-router-dom";
import "./Movie.css";

export default function Movie({ id, titulo, director, poster, puntuación, clasificacion }) {
    return (
        <div>
            <Link to={`MovieDetails/${id}`}>
                <div
                    className="Movie__All"
                    style={{ backgroundImage: `url('${poster}')` }}>
                    <div className="Movie__ContainerImg">
                        <div className="Movie__info">
                            {titulo}<br></br>
                            Estrellas: {puntuación},<br></br>
                            clasificacion: {clasificacion},
                        </div>
                        <div><span className="Movie__director">{director}</span></div>
                    </div>
                </div>
            </Link>
        </div>
    )
}