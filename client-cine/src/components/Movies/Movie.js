import React from "react";
import { Link } from "react-router-dom";
import "./Movie.css";

export default function Movie({ id, titulo, director, poster, puntuacion, clasificacion }) {
    return (
        <div>
            <Link to={`details/${id}`}>
                <div
                    className="Movie__All"
                    style={{ backgroundImage: `url('${poster}')` }}>
                    <div className="Movie__ContainerImg">
                        <div className="Movie__info">
                            {titulo},
                            Estrellas: {puntuacion},
                            clasificacion: {clasificacion},
                        </div>
                        <div><span className="Movie__director">{director}</span></div>
                    </div>
                </div>
            </Link>
        </div>
    )
}