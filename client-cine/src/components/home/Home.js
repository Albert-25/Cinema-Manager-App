import SearchBar from "../SearchBar/index.jsx";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../Navbar/navbar.jsx'

import MapView from '../mapView/MapView.js'



import {

  // FalseInfo,
  AllMovies,
  GetAllGenres,
  GetAllCast,
  FiltrarGenero,
  FiltrarCast,
  FiltrarGeneroAndCast,
  searchByName,

} from "../../store/actions";

import Movies from "../Movies/Movies.js"
import Pagination from "../Movies/Pagination"
import FiltroGeneros from "../filters/filterGenre.js";



const Home = () => {






  //*dispatch de prueba para las pelis falas que luego sera usado en mostar todas laspelis

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AllMovies());
    dispatch(GetAllGenres());
    dispatch(GetAllCast());
  }, [dispatch]);
  const pelisTotales = useSelector((state) => state.PelisAll);
  const pelisFiltradas = useSelector((state) => state.PelisFiltred);
  // console.log(pelisFiltradas)
  const [container, setContainer] = useState([]);

  React.useEffect(() => { //luego se añadira filter aqui para decidir si se muestran los resultados filtrados o las pelis
    if (pelisTotales.length !== 0) {
      setContainer(pelisTotales);
    } if (pelisFiltradas.length !== 0) {
      setContainer(pelisFiltradas)
    }
  }, [pelisTotales, pelisFiltradas]);

  //*
  // console.log(pelisTotales)

  const SearchName = (titulo) => {
    titulo === "" ? dispatch(AllMovies()) : dispatch(searchByName(titulo))
  }





  //*paginado 
  const [loading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(2);

  const indexOfLastPost = currentPage * moviesPerPage;
  const indexOfFirstPost = indexOfLastPost - moviesPerPage;
  const currentPost = container.slice(indexOfFirstPost, indexOfLastPost);


  //* Filtros
  const FiltradoGeneros = (arg) => {
    if(arg){
      dispatch(FiltrarGenero(arg));
    }else{
      setContainer(pelisTotales)
    }
  };

  const FiltradoCast = (arg) => {
    dispatch(FiltrarCast(arg))
  }

  const FiltradoGenreAndCast = (arg) => {
    dispatch(FiltrarGeneroAndCast(arg))
  }



  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //*


  return (
    <div>
      <div>
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="ls" sx={{ height: "auto" }}>
            <Navbar />

            <SearchBar search={SearchName} />
          </Container>
        </React.Fragment>
      </div>

      <div className="Home__Wellcome!">
        <h1>Wellcome!!!</h1>
      </div>

      <div className='filterContainer'>
        <FiltroGeneros
          GetAllGenres={GetAllGenres}
          GetAllCast={GetAllCast}
          FiltradoGeneros={FiltradoGeneros}
          FiltradoCast={FiltradoCast}
          FiltradoGenreAndCast={FiltradoGenreAndCast}
        />
      </div>


      <div className="Home__PelisContainer">
        <Movies moviesInfo={currentPost} loading={loading} />
      </div>
      <div>
        <Pagination
          className="Home__pagination__li"
          moviesPerPage={moviesPerPage}
          totalMovies={container.length}
          paginate={paginate}
        />
      </div>
      <div className='mapContainer'>

        <MapView />

      </div>
    </div>
  )
}
export default Home