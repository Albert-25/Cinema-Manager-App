import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./Movie.css";

export default function Movie({
   id,
   titulo,
   director,
   poster,
   puntuación,
   clasificacion,
   sinopsis,
}) {
   console.log(sinopsis);
   return (
      <>
         <Card style={{ width: "17rem", marginBottom: "1rem" }}>
            <Card.Img variant="top" src={poster} />
            <Card.ImgOverlay>
               <Card.Body>
                  <Card.Title>{titulo}</Card.Title>
                  <Card.Text>{`Puntuación: ${puntuación}`}</Card.Text>
                  <Card.Text>{`Clasificacion: ${clasificacion}`}</Card.Text>
                  <Link to={`MovieDetails/${id}`}>
                     <Button variant="primary">Ver detalles</Button>
                  </Link>
               </Card.Body>
            </Card.ImgOverlay>
         </Card>
      </>
   );
}
