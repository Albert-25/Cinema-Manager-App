import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Search } from "../SearchBar/Search";
import { Actorsfilter, GenderFilter } from "../filters/Filters";
import Movies from "../Movies/Movies";
import Pagination from "../Movies/Pagination";
import { filterByActors, filterByGenders, filterByTitle } from "./utils";
import { Row, Col, Container } from "react-bootstrap";

export const Bilboard = () => {
   const [title, setTitle] = useState("");
   const [actors, setActors] = useState([]);
   const [genders, setGenders] = useState([]);
   const [pageSelected, setPageSelected] = useState(1);
   const moviesAll = useSelector((state) => state.PelisAll);
   const moviesByTitle = filterByTitle(moviesAll, title);
   const moviesByActors = filterByActors(moviesByTitle, actors);
   const moviesByGenders = filterByGenders(moviesByActors, genders);
   const moviesPerPage = 4;
   const end = moviesPerPage * pageSelected;
   const start = end - moviesPerPage;
   const filteredMovies = moviesByGenders.slice(start, end);

   return (
      <Container>
         <h2
            style={{ color: "var(--text-light-color)" }}
            className="mt-5 mb-5 text-center"
         >
            Disfruta las mejores peliculas estrenos en
            <span className="text-primary"> Pantalla Grande</span>
         </h2>
         <Row className="mt-5 mb-5 mx-auto">
            <Col
               xl="8"
               md="12"
               className="d-flex align-items-center justify-content-xl-between mb-4"
            >
               <Actorsfilter actors={actors} setActors={setActors} />
               <GenderFilter genders={genders} setGenders={setGenders} />
            </Col>
            <Col
               xl="4"
               md="12"
               className="d-flex align-items-center justify-content-xl-end justify-content-xs-center mb-4"
            >
               <Search
                  className="mx-auto"
                  title={title}
                  setTitle={setTitle}
                  items={moviesAll}
               />
            </Col>
         </Row>
         <Movies items={filteredMovies} />
         {/* <Pagination
      items={moviesByGenders}
      setPageSelected={setPageSelected}
      limit={moviesPerPage}
   /> */}
         {filteredMovies.length === 0 && <h1>No hay Resultados</h1>}
      </Container>
   );
};
