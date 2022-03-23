import React from "react";
import axios from "axios";
import { useState } from "react";
import { List } from "./List";
import s from './search.module.css'
const { REACT_APP_BASE_URL } = process.env;

export default function Search() {
  const [title, setTilte] = useState("");
  const [movies, setMovies] = useState([]);
  const [err, setErr] = useState();

  function handleInputChange(e) {
    e.preventDefault();
    setTilte(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const parseTitle = title.trim()
    if (parseTitle === '') return null
    try {
      const res = await axios.get(`${REACT_APP_BASE_URL}/peliculas/?title=${parseTitle}`);
      if (res.status === 200) {
        setMovies(res.data)
      }
    } catch (err) {
      setErr('No se encontraron peliculas con ese Titulo')
    }
    setTilte('')
  }

  const handleClick = () => {
    setMovies([])
    setErr(null)
  }

  return (
    <div className={s.container}>
      <form onSubmit={(e) => handleSubmit(e)} >
        <input placeholder="Ingrese nombre de la pelicula..." type="text" value={title}
          onChange={(e) => handleInputChange(e)} 
          onClick={handleClick}
        />
        <button type="submit" >search</button>
      </form>
      {err && <p>{err}</p>}
      {
        movies.length !== 0
          ? <List array={movies}/>
          : null
      }
    </div>
  );
}



