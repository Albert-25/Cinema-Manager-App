import Search from "../SearchBar/Search.jsx";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../Navbar/navbar.jsx";
import Swal from "sweetalert2";

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

const Home = () => {
  //*dispatch de prueba para las pelis falas que luego sera usado en mostar todas laspelis

  const dispatch = useDispatch();
  const pelisTotales = useSelector((state) => state.PelisAll);
  const pelisFiltradas = useSelector((state) => state.PelisFiltred);
  // console.log(pelisFiltradas)
  const [container, setContainer] = useState([]);

  React.useEffect(() => {
    //luego se añadira filter aqui para decidir si se muestran los resultados filtrados o las pelis
    if (pelisTotales.length !== 0) {
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
  const [moviesPerPage] = useState(2);

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
    <div>
      <div>
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="ls" sx={{ height: "auto" }}>
            <Navbar />
          </Container>
        </React.Fragment>
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
      <Movies moviesInfo={currentPost} loading={loading} />
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
