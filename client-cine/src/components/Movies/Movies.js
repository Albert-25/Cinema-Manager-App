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
              titulo={e.titulo}
              poster={e.poster}
              puntuacion={e.puntuacion}
              clasificacion={e.clasificacion}
              director={e.director}
            />
          ))}
      </div>
    );
  }
  