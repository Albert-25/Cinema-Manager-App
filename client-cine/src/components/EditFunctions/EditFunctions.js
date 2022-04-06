import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFunctionInfo, editFunction } from "../../store/actions";
import "../CreateMovies/CreateMovies.css";
import { GetAllGenres, GetAllCast } from "../../store/actions";

import Swal from "sweetalert2";
import Axios from "axios";
import { useParams } from "react-router";
import { Image } from "cloudinary-react";
import { Form, Col, Row, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
const { REACT_APP_CLOUDINARY_CLOUDNAME } = process.env;

const EditFunctions = () => {
   const dispatch = useDispatch();
   const id = useParams().id;
   useEffect(() => {
      dispatch(getFunctionInfo(id));
   }, [dispatch]);

   const movieData = useSelector((state) => state.editFunctionInfo);
   const Movies = useSelector((state) => state.PelisAll);




   const [inputs, setInputs] = useState([
      {
         sala: "",
         fecha: "",
         horario: "",
         asientos: "",
         maxAsientos: "",
         precio: "",
         detalle: "",
         pelicula: "",
      },
   ]);


   const [errors, setErrors] = useState(
      {
         sala: "",
         fecha: "",
         horario: "",
         asientos: "",
         maxAsientos: "",
         precio: "",
         detalle: "",
         pelicula: "",
         error: false,
      },
   );

   const handleChange = (e) => {
      setInputs({
         ...inputs,
         [e.target.name]: e.target.value.trim(),
      });
      console.log(inputs);
      // setErrors(
      //   validate(
      //     {
      //       [e.target.name]: e.target.value,
      //     },
      //     errors,
      //     e.target.name
      //   )
      // );
   };


   const checkInputs = () => {
      if (inputs.sala === "" && movieData.sala !== undefined) {
         setInputs({
            ...inputs,
            sala: movieData.sala,
         });
      }
      if (inputs.fecha === "" && movieData.fecha !== undefined) {
         setInputs({
            ...inputs,
            fecha: movieData.fecha,
         });
      }
      if (inputs.horario === "" && movieData.horario !== undefined) {
         setInputs({
            ...inputs,
            horario: movieData.horario,
         });
      }
      if (inputs.asientos === "" && movieData.asientos !== undefined) {
         setInputs({
            ...inputs,
            asientos: movieData.asientos,
         });
      } if (inputs.asientos > inputs.maxAsientos) {
         setInputs({
            ...inputs,
            asientos: movieData.asientos,
         });
      }
      if (inputs.maxAsientos === "" && movieData.maxAsientos !== undefined) {
         setInputs({
            ...inputs,
            maxAsientos: movieData.maxAsientos,
         });
      } if (inputs.precio === "" && movieData.precio !== undefined) {
         setInputs({
            ...inputs,
            precio: movieData.precio,
         });
      }
      if (inputs.detalle === "" && movieData.detalle !== undefined) {
         setInputs({
            ...inputs,
            detalle: movieData.detalle,
         });
      }
      if (inputs.pelicula === "" && movieData.pelicula !== undefined) {
         setInputs({
            ...inputs,
            pelicula: movieData.pelicula,
         });
      }
      console.log(inputs);
   };

   const ChangeArrayMovies = (evt) => {
      console.log(evt.target.value);
      setInputs({
         ...inputs,
         [evt.target.name]: evt.target.value,
      });
      document
         .getElementById(evt.target.value)
         .setAttribute("disabled", "disabled");
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setInputs({
            ...inputs,
            pelicula: movieData.pelicula,
         });
      setInputs({
            ...inputs,
            maxAsientos: movieData.maxAsientos,
         });

      console.log('llegando', inputs)
      console.log("hey", errors);
      if (errors.error === false) {
         console.log('Entramos')
         Swal.fire({
            title: "¿Quieres guardar los cambios?",
            icon: "question",
            showDenyButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `No guardar`,
         }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
               dispatch(editFunction(id, inputs));
            } else if (result.isDenied) {
               Swal.fire("No se ha podido editar esta función", "", "info");
            }
         });
      } else {
         Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ingrese correctamente los datos por favor.",
         });
      }
   };

   return (
      <Container
         className="Create__Movies"
         style={{
            backgroundColor: "var(--first-color)",
            position: "relative",
            color: "var(--text-light-color)",
            marginTop: "3rem",
            marginBottom: "5rem",
         }}
      >
         <Link to="/admin" className="position-absolute top-0 start-10">
            <Button>
               <MdKeyboardBackspace className="me-3" />
               <span>Regresar al Admin</span>
            </Button>
         </Link>
         <h2
            className="text-center mb-4"
            style={{ color: "var(--text-light-color)" }}
         >
            Editar función
         </h2>
         <form onSubmit={(e) => handleSubmit(e)}>
            <Row className="justify-content-between mb-4">
               <Col lg={5}>
                  <div className="input__with__error">
                     <Form.Label htmlFor="sala">Sala:</Form.Label>
                     <Form.Control
                        type="number"
                        name="sala"
                        id="sala"
                        min="00"
                        placeholder={movieData.sala}
                        onChange={(evt) => handleChange(evt)}
                     />
                     {errors.sala ? <span>{errors.sala}</span> : null}
                  </div>
               </Col>
               <Col lg={5}>
                  <div className="input__with__error">
                     <Form.Label htmlFor="fecha">Fecha:</Form.Label>
                     <Form.Control
                        type="date"
                        name="fecha"
                        id="fecha"
                        onChange={(evt) => handleChange(evt)}
                        placeholder={movieData.fecha}
                     />
                     {errors.fecha ? <span>{errors.fecha}</span> : null}
                  </div>
               </Col>
            </Row>
            <Row className="justify-content-between mb-4">
               <Col lg={5}>
                  <div className="input__with__error">
                     <Form.Label htmlFor="horario">horario:</Form.Label>
                     <Form.Control
                        type="time"
                        name="horario"
                        id="horario"
                        onChange={(evt) => handleChange(evt)}
                        placeholder={movieData.horario}
                     />
                     {errors.horario ? <span>{errors.horario}</span> : null}
                  </div>
               </Col>
               <Col lg={5}>
                  <div className="input__with__error">
                     <Form.Label htmlFor="asientos">asientos:</Form.Label>
                     <Form.Control
                        type="number"
                        min="0"

                        name="asientos"
                        id="asientos"
                        onChange={(evt) => handleChange(evt)}
                        placeholder={movieData.asientos}
                     />
                     {errors.asientos ? <span>{errors.asientos}</span> : null}
                  </div>
               </Col>

               <Col lg={5}>
                  <div className="input__with__error">
                     <Form.Label htmlFor="precio">precio:</Form.Label>
                     <Form.Control
                        type="number"
                        min="0.00"
                        step="any"
                        name="precio"
                        id="precio"
                        onChange={(evt) => handleChange(evt)}
                        placeholder={movieData.precio}
                     />
                     {errors.precio ? <span>{errors.precio}</span> : null}
                  </div>
               </Col>
               <Col lg={5}>
                  <div className="input__with__error">
                     <Form.Label htmlFor="detalle">detalle:</Form.Label>
                     <Form.Control
                        type="text"
                        name="detalle"
                        id="detalle"
                        onChange={(evt) => handleChange(evt)}
                        placeholder={movieData.detalle}
                     />
                     {errors.detalle ? <span>{errors.detalle}</span> : null}
                  </div>
               </Col>

            </Row>
            <Row className="justify-content-between mb-4">


            </Row>
            <Row className="justify-content-between mb-4">

            </Row>
            <Row className="justify-content-between mb-4">

            </Row>

            <Row className="justify-content-between mb-4">
            </Row>

            <Form.Control
               type="submit"
               value="Editar pelicula"
               style={{ width: "50%", margin: "auto" }}
               onClick={(e) => {
                  checkInputs();
               }}
            />
         </form>
      </Container>
   );
};

export default EditFunctions;
