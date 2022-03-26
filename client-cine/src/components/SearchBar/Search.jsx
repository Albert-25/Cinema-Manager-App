import React from "react";
import { Link } from 'react-router-dom';
import s from './search.module.css'

const searchTitle = (t, a) => {
  if (t !== '') return a.filter(m => m.titulo.toLowerCase().includes(t.toLowerCase()))
}

export const Search = ({title,setTitle, items}) => {

  const movies = searchTitle(title.trim(), items) || []

  return (
    <div className={s.container}>
      <div>
        <input placeholder="Ingrese nombre de la pelicula..." type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {title && <span className={s.button} onClick={() => setTitle('')}>🗑️</span>}
        <ul className={s.list}>
          {
            title.trim() !== '' && movies.length === 0
              ? <p>No se encontro ese titulo</p>
              : movies.map(movie => {
                return (
                  <li key={movie.id}>
                    <Link to={`MovieDetails/${movie.id}`} className={s.item_list}>
                      {movie.titulo}
                    </Link>
                  </li>
                )
              })
          }
        </ul>
      </div>
    </div>
  );
}
