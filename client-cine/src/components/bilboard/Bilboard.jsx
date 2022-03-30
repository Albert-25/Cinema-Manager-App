import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Search } from "../SearchBar/Search";
import { Actorsfilter, GenderFilter } from "../filters/Filters";
import Movies from "../Movies/Movies";
import Pagination from "../Movies/Pagination";
import { filterByActors, filterByGenders, filterByTitle } from "./utils";

export const Bilboard = () => {
  const [title, setTitle] = useState("");
  const [actors, setActors] = useState([]);
  const [genders, setGenders] = useState([]);
  const [pageSelected, setPageSelected] = useState(1);
  const moviesAll = useSelector((state) => state.PelisAll);
  const moviesByTitle = filterByTitle(moviesAll, title)
  const moviesByActors = filterByActors(moviesByTitle, actors)
  const moviesByGenders = filterByGenders(moviesByActors, genders)
  const moviesPerPage = 4;
  const end = moviesPerPage * pageSelected;
  const start = end - moviesPerPage;
  const filteredMovies = moviesByGenders.slice(start, end)

  return (
    <>
      <Search title={title} setTitle={setTitle} items={moviesAll} />
      <Actorsfilter setPageSelected={setPageSelected} actors={actors} setActors={setActors} />
      <GenderFilter setPageSelected={setPageSelected} genders={genders} setGenders={setGenders} />
      <Movies items={filteredMovies} />
      {/* <Pagination items={moviesByGenders} setPageSelected={setPageSelected} limit={moviesPerPage} /> */}
      
      {filteredMovies.length === 0 && <h1>No hay Resultados</h1>}
    </>
  )
}