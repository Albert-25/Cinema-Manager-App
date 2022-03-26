import { Search } from "../SearchBar/Search.jsx";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../Navbar/navbar.jsx";
import "./Home.css"
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext";


import {
  AllMovies,
  GetAllGenres,
  GetAllCast,
  FiltrarGenero,
  FiltrarCast,
  FiltrarGeneroYCast,
} from "../../store/actions";

import Movies from "../Movies/Movies.js";
import Pagination from "../Movies/Pagination";
import FiltroGeneros from "../filters/filterGenre.js";
import Carousel from "../Carousel/Carousel.js"

const Home = () => {

  const dispatch = useDispatch();
  const pelisTotales = useSelector((state) => state.PelisAll);
  const pelisFiltradas = useSelector((state) => state.PelisFiltred);

  const [container, setContainer] = useState([]);

  useEffect(() => {
    dispatch(AllMovies());
    dispatch(GetAllGenres());
    dispatch(GetAllCast());
  }, [dispatch]);


  React.useEffect(() => {

    if (pelisTotales.length !== 0) {
      console.log(pelisTotales)
      setContainer(pelisTotales);
    }
    if (pelisFiltradas.length !== 0) {
      //Si no hay pelis encontradas popea una alerta y vacía el estado
      if (
        pelisFiltradas[0].titulo &&
        pelisFiltradas[0].titulo === "Movie Not found"
      ) {
        Swal.fire("No se encontro peliculas con estos filtros.", "", "error");
        // alert("No movie found with that sorting");
        pelisFiltradas.pop();
      } else {
        setContainer(pelisFiltradas);
      }
    }
  }, [pelisTotales, pelisFiltradas]);

  //*paginado
  const [loading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(4);

  const indexOfLastPost = currentPage * moviesPerPage;
  const indexOfFirstPost = indexOfLastPost - moviesPerPage;
  const currentPost = container.slice(indexOfFirstPost, indexOfLastPost);

  //* Filtros
  const FiltradoGeneros = (arg) => {
    if (arg) {
      dispatch(FiltrarGenero(arg));
    } else {
      setContainer(pelisTotales);
    }
  };

  const FiltradoCast = (arg) => {
    dispatch(FiltrarCast(arg));
  };

  const FiltradoGenreAndCast = (arg) => {
    dispatch(FiltrarGeneroYCast(arg));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="Home__Background">
      <React.Fragment>
        <NavBar />
      </React.Fragment>
      <div className="carrousel__home">
        <Carousel
     AllMovies={AllMovies}
      /> 

        </div>



      <Search />

      <div className="filterContainer">
        <FiltroGeneros
          GetAllGenres={GetAllGenres}
          GetAllCast={GetAllCast}
          FiltradoGeneros={FiltradoGeneros}
          FiltradoCast={FiltradoCast}
          FiltradoGenreAndCast={FiltradoGenreAndCast}
        />
      </div>
      <div className="Home__MoviesContainer">
        <Movies className="Home__Movies" moviesInfo={currentPost} loading={loading} />
      </div>
      <Pagination
          className="Home__pagination__li"
          moviesPerPage={moviesPerPage}
          totalMovies={container.length}
          paginate={paginate}
        />

    </div>
  );
};
export default Home;
