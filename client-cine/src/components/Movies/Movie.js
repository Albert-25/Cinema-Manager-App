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
   return (
      <>
         <Card style={{ width: "15rem", marginBottom: "1rem" }}>
            <Card.Img variant="top" src={poster} />
            <Card.Body>
               <Card.Title>{titulo}</Card.Title>
               <Card.Text>{sinopsis}</Card.Text>
               <Link to={`MovieDetails/${id}`}>
                  <Button variant="primary">Ver detalles</Button>
               </Link>
            </Card.Body>
         </Card>
      </>
   );
}
