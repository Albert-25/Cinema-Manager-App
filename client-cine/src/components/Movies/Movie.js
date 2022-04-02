import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdRule, MdPerson, MdStarRate } from "react-icons/md";
import "./Movie.css";

export default function Movie({
   id,
   titulo,
   director,
   poster,
   clasificacion,
   comments,
}) {
   const puntuacionArray = comments && comments.map((c) => c.puntuación);
   const sumaPuntuaciones =
      puntuacionArray &&
      puntuacionArray.reduce(
         (contador, puntuación) => contador + puntuación,
         0
      );
   const numeroPuntuaciones = puntuacionArray.length === 0 ? 1 : puntuacionArray.length
   const promedioPuntuacion = sumaPuntuaciones / numeroPuntuaciones;
   console.log(promedioPuntuacion)
   return (
      <>
         <Card
            style={{ width: "20rem", marginLeft: "auto", marginRight: "auto" }}
         >
            <Card.Img
               variant="top"
               src={poster}
               style={{ maxHeight: "390px" }}
            />
            <Card.Body>
               <Card.Title>{titulo}</Card.Title>
               <Card.Text>
                  {clasificacion} -{" "}
                  <MdRule style={{ height: "1.5rem", width: "auto" }} />
               </Card.Text>
               <Card.Text>
                  {director} -{" "}
                  <MdPerson style={{ height: "1.5rem", width: "auto" }} />
               </Card.Text>
               <Card.Text>
                  <Button style={{ cursor: "auto" }}>
                     {promedioPuntuacion}
                  </Button>{" "}
                  {Array(Math.round(promedioPuntuacion))
                     .fill(3)
                     .map((el, index) => (
                        <MdStarRate
                           key={`${director}${index}`}
                           style={{ height: "1.75rem", width: "auto" }}
                        />
                     ))}
               </Card.Text>
               <Link to={`MovieDetails/${id}`}>
                  <Button className="me-3" variant="primary">
                     Details
                  </Button>
               </Link>
               <Link to={`MovieDetails/${id}`}>
                  <Button variant="primary">Ticket</Button>
               </Link>
            </Card.Body>
         </Card>
         {/* <Link to={`MovieDetails/${id}`}>
                <div
                    className="Movie__All"
                    style={{ backgroundImage: `url('${poster}')` }}>
                    <div className="Movie__title">
                        {titulo}
                    </div>
                    <div className="Movie__info">
                        ⭐: {isNaN(promedioPuntuacion) ? "--" : promedioPuntuacion}<br></br>
                        ®: {clasificacion}
                    </div>
                    <span className="Movie__director">{director}</span>
                </div>
            </Link> */}
      </>
   );
}
