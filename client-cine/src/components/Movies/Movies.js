import React from "react";
import Movie from "./Movie";
import { Row, Col } from "react-bootstrap";


export default function Movies({ items }) {
   return (
      <Row sm={1} md={2} lg={3} className="justify-content-between g-4 mx-auto">
         {items.map((e) => (
            <Col>
               <Movie
                  key={e.id}
                  id={e.id}
                  titulo={e.titulo}
                  poster={e.poster}
                  clasificacion={e.clasificacion}
                  director={e.director}
                  sinopsis={e.sinopsis}
                  comments={e.Comentarios}
               />
            </Col>
         ))}
      </Row>
   );
}
