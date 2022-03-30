import React from "react";
import Movie from "./Movie";
import s from './movies.module.css'


export default function Movies({ items }) {

  return (
    <div className={s.container}>
        {
          items.map((e) => (
              <Movie
                key={e.id}
                id={e.id}
                titulo={e.titulo}
                poster={e.poster}
                clasificacion={e.clasificacion}
                director={e.director}
                sinopsis={e.sinopsis}
              />
          ))}
    </div>
  );
}
