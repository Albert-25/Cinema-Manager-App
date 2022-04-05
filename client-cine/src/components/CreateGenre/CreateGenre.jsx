import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadGenre } from "../../store/actions";
import { Link } from "react-router-dom";
import { Form, Col, Row, Container, Button } from "react-bootstrap";
import Swal from "sweetalert2";

function CreateGenre() {
   const dispatch = useDispatch();
   const [info, setInfo] = useState({
      genero: "",
   });

   const [error, setError] = useState(true);

   useEffect(() => {
      if (info.genero.length > 0) {
         setError(false);
      } else {
         setError(true);
      }
   }, [info, setError]);

   function handleChange(e) {
      setInfo(() => {
         return { [e.target.name]: e.target.value };
      });
   }

   function handleSubmit(e) {
      e.preventDefault();
      document.getElementById("1").value = "";
      dispatch(uploadGenre(info));
      document.getElementById("HUHU").reset();
      Swal.fire("El genero fue agregado!", "", "success");
   }

   return (
      <Container
         className="justify-content-center align-items-center d-flex flex-column"
         style={{
            color: "var(--text-light-color)",
            width: "90vw",
            maxWidth: "var(--max-width)",
            minHeight: "100vh",
         }}
      >
         <h2
            className="text-center mb-4"
            style={{ color: "var(--text-light-color)" }}
         >
            Crear Genero
         </h2>
         <form id="HUHU" onSubmit={handleSubmit} style={{ width: "90%" }}>
            <Row className="justify-content-center">
               <Col md="6">
                  <Form.Label style={{ letterSpacing: "1px" }}>
                     Genero:
                  </Form.Label>
                  <Form.Control
                     type="text"
                     name="genero"
                     id="1"
                     placeholder="Ingresa el nombre del genero"
                     onChange={handleChange}
                  />
                  {info.genero.length < 1 && (
                     <span
                        style={{
                           color: "#df1313",
                           letterSpacing: "1px",
                           margin: "auto",
                        }}
                     >
                        El campo no puede ser vacio
                     </span>
                  )}
                  <div className="mt-3">
                     <Form.Control
                        type="submit"
                        disabled={error}
                        value="Crear genero"
                     />
                  </div>
                  <div>
                     <Link to="/admin">
                        <Button>Regresar a Admin</Button>
                     </Link>
                  </div>
               </Col>
            </Row>
         </form>
      </Container>
   );
}

export default CreateGenre;
