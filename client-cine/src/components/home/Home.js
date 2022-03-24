import Search from "../SearchBar/Search.jsx";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../Navbar/navbar.jsx";
import "./Home.css"
import Swal from "sweetalert2";


import {
  AllMovies,
  GetAllGenres,
  GetAllCast,
  FiltrarGenero,
  FiltrarCast,
  FiltrarGeneroYCast,
  BestMovies,
} from "../../store/actions";

import Movies from "../Movies/Movies.js";
import Pagination from "../Movies/Pagination";
import FiltroGeneros from "../filters/filterGenre.js";
import Carousel from "../Carousel/Carousel.js"

const Home = () => {


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AllMovies());
    dispatch(GetAllGenres());
    dispatch(GetAllCast());
  }, [dispatch]);
  const pelisTotales = useSelector((state) => state.PelisAll);
  const pelisFiltradas = useSelector((state) => state.PelisFiltred);
   const BestPelis = useSelector((state) => state.TopPelis)
   console.log('mejores', BestPelis)
  // console.log(pelisFiltradas)
  const [container, setContainer] = useState([]);



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


    React.useEffect(() => {
  dispatch(BestMovies())

  },[dispatch, pelisTotales])


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
    <div className="Home__Background">
      <div>
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="ls" sx={{ height: "auto" }}>
            <Navbar />
          </Container>
        </React.Fragment>

        <div className="carrousel__home">
        {/* <Carousel
      BestMovies={BestMovies}
      /> */}
        </div>
      </div>

      <div className="carrousel__home">
        <Carousel
      BestMovies={BestMovies}
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
