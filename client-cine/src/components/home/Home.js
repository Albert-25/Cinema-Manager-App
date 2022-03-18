import SearchBar from "../SearchBar/index.jsx";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../Navbar/navbar.jsx'
import {
  FalseInfo, searchByName,
} from "../../store/actions";

import Movies from "../Movies/Movies.js"
import Pagination from "../Movies/Pagination"

 const Home = () => {




  //*dispatch de prueba para las pelis falas que luego sera usado en mostar todas laspelis

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FalseInfo());
  }, [dispatch]);
  const pelisfalsas = useSelector((state) => state.PelisAll);
  const [container, setContainer] = useState([]);

  React.useEffect(() => { //luego se añadira filter aqui para decidir si se muestran los resultados filtrados o las pelis
    if (pelisfalsas !== 0) {
      setContainer(pelisfalsas);
    }
  }, [pelisfalsas]);

  console.log(pelisfalsas)
  //*

  const SearchName = (titulo) => {
    titulo === "" ? dispatch(FalseInfo()) : dispatch(searchByName(titulo))
  }





  //*paginado 
  const [loading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(2);

  const indexOfLastPost = currentPage * moviesPerPage;
  const indexOfFirstPost = indexOfLastPost - moviesPerPage;
  const currentPost = container.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //*

  return (
    <div>
      <div>
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="ls" sx={{ height: "auto" }}>
            <Navbar />
            <SearchBar search={SearchName}/>
          </Container>
        </React.Fragment>
      </div>
      <div className="Home__Wellcome!">
        <h1>Wellcome!!!</h1>
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

    </div>
  )
}
export default Home