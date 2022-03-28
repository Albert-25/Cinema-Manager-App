import React from "react";
import Movie from "./Movie";

export default function Movies({ moviesInfo, loading }) {
    if (loading) {
      return <h2>Loading...</h2>;
    }
    return (
      <div className="moviesInfo">
        {moviesInfo && moviesInfo &&
          moviesInfo.map((e, index) => (
            <Movie
              key={index}
              id={e.id}
              titulo={e.titulo}
              poster={e.poster}
              puntuación={e.puntuación}
              clasificacion={e.clasificacion}
              director={e.director}
              sinopsis={e.sinopsis}
            />
          ))}
      </div>
    );
  }
  
