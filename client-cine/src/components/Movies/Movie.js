import React from "react";
import { Link } from "react-router-dom";
import "./Movie.css";

export default function Movie({
   id,
   titulo,
   director,
   poster,
   clasificacion,
   comments,
}) {
   const puntuacionArray = comments && comments.map((c) => c.puntuación);
   const sumaPuntuaciones =
      puntuacionArray &&
      puntuacionArray.reduce(
         (contador, puntuación) => contador + puntuación,
         0
      );
   const numeroPuntuaciones = puntuacionArray && puntuacionArray.length;
   const promedioPuntuacion = sumaPuntuaciones / numeroPuntuaciones;

   return (
      <>
         <Link to={`MovieDetails/${id}`}>
            <div
               className="Movie__All"
               style={{ backgroundImage: `url('${poster}')` }}
            >
               <div className="Movie__title">{titulo}</div>
               <div className="Movie__info">
                  ⭐: {isNaN(promedioPuntuacion) ? "--" : promedioPuntuacion}
                  <br></br>
                  ®: {clasificacion}
               </div>
               <span className="Movie__director">{director}</span>
            </div>
         </Link>
      </>
   );
}
