import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AllMovies, postReview } from "../../store/actions";
import styles from "./Review.module.css";
import { DivStar } from "./styled";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { Button, Container, Form } from "react-bootstrap";


const Review = () => {
   let navigate = useNavigate();
   const id = useParams().id;
   const dispatch = useDispatch();
   const [comentario, setComentario] = useState("");
   const [puntuación, setPuntuación] = useState();
   const [calificacion, setCalificacion] = useState("");
   const [errorPuntuacion, setErrorPuntuacion] = useState("");
   const [errorComentario, setErrorComentario] = useState("");
   const [error2Comentario, setError2Comentario] = useState("");
   // const nombre = "Anonimo";
   const { user } = useAuth();
   let nombre = user && user.nombre ? user.nombre : "Anonimo";

   const onChange = (e) => {
      setComentario(e.target.value);
      setError2Comentario("");
   };
   const onClick = (number) => {
      setPuntuación(number);
      switch (number) {
         case 1: {
            setCalificacion("Mala");
            break;
         }
         case 2: {
            setCalificacion("Aceptable");
            break;
         }
         case 3: {
            setCalificacion("Normal");
            break;
         }
         case 4: {
            setCalificacion("Buena");
            break;
         }
         case 5: {
            setCalificacion("Excelente");
            break;
         }
         default: {
         }
      }
      setErrorPuntuacion("");
   };
  
    const handleSubmit = (e) => {
        e.preventDefault()
        if (puntuación == null) setErrorPuntuacion("es necesario calificar esta pelicula")
        if (!comentario.trim()) setError2Comentario("es necesario rellenar este campo")
        dispatch(postReview({ nombre, comentario, puntuación, id }))
        dispatch(AllMovies())
        navigate(-1)
    }

     useEffect(() => {
        if (comentario.length >= 601) {
            setErrorComentario("se permiten como maximo 600 carácteres")
        }
        else {
            setErrorComentario("")
        }
    })


   /*useEffect(() => {
        if (comentario.length >= 601) {
            setErrorComentario("se permiten como maximo 600 carácteres")
        }
        else {
            setErrorComentario("")
        }
    },[comentario.length])*/

   return (
      <Container
         className="d-flex justify-content-center align-items-center"
         style={{ minHeight: "100vh" }}
      >
         <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className="mb-4">
               Tu opinión nos importa, ¡Evalúa esta pelicula!
            </h3>
            <span className="mb-3">
               ¿Cuántas estrellas le das a esta pelicula?
            </span>
            <div className={styles.star_div}>
               <DivStar
                  value="1"
                  puntuacion={puntuación}
                  className={styles.star}
                  onClick={() => onClick(1)}
               >
                  ★
               </DivStar>
               <DivStar
                  value="2"
                  puntuacion={puntuación}
                  className={styles.star}
                  onClick={() => onClick(2)}
               >
                  ★
               </DivStar>
               <DivStar
                  value="3"
                  puntuacion={puntuación}
                  className={styles.star}
                  onClick={() => onClick(3)}
               >
                  ★
               </DivStar>
               <DivStar
                  value="4"
                  puntuacion={puntuación}
                  className={styles.star}
                  onClick={() => onClick(4)}
               >
                  ★
               </DivStar>
               <DivStar
                  value="5"
                  puntuacion={puntuación}
                  className={styles.star}
                  onClick={() => onClick(5)}
               >
                  ★
               </DivStar>
               <span className={styles.calificacion}>{calificacion}</span>
            </div>
            <div className={styles.error}>{errorPuntuacion}</div>
            <div>
               <h4 className="mt-4 mb-3">
                  ¡Cuéntanos que te pareció la pelicula!
               </h4>
               <Form.Control
                  as="textarea"
                  cols="20"
                  rows="10"
                  onChange={(e) => onChange(e)}
               ></Form.Control>
            </div>
            <div className={styles.error}>{errorComentario}</div>
            <div className={styles.error}>{error2Comentario}</div>
            <Button className="mx-auto">Publicar comentario</Button>
         </form>
      </Container>
   );
};

export default Review;
