import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadActor } from "../../store/actions";
import { Link } from "react-router-dom";
import { Form, Col, Row, Container, Button } from "react-bootstrap";
import Swal from "sweetalert2";

function CreateActor() {
   const dispatch = useDispatch();
   const [actor, setActor] = useState({
      nombre: "",
   });

   const [error, setError] = useState(true);

   useEffect(() => {
      if (actor.nombre.length > 0) {
         setError(false);
      } else {
         setError(true);
      }
   }, [actor, setError]);

   function handleChange(e) {
      setActor(() => {
         return { [e.target.name]: e.target.value };
      });
   }

   function handleSubmit(e) {
      e.preventDefault();
      document.getElementById("1").value = "";
      dispatch(uploadActor(actor));
      document.getElementById("HAHA").reset();
      Swal.fire("El actor fue agregado!", "", "success");
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
            Crear Actor
         </h2>
         <form id="HAHA" onSubmit={handleSubmit} style={{ width: "90%" }}>
            <Row className="justify-content-center">
               <Col md="6">
                  <Form.Label style={{ letterSpacing: "1px" }}>
                     Actor:
                  </Form.Label>
                  <Form.Control
                     type="text"
                     name="nombre"
                     id="1"
                     placeholder="Ingresa el nombre del actor"
                     onChange={handleChange}
                  />
                  {actor.nombre.length < 1 && (
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
                        value="Crear actor"
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

export default CreateActor;
