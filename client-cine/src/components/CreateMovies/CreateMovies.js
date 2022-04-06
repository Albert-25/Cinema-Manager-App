import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postMovies } from "../../store/actions";
import "./CreateMovies.css";
import { AllMovies } from "../../store/actions";
import { validate } from "./validate";
import Swal from "sweetalert2";
import Axios from "axios";
import { Image } from "cloudinary-react";
import { Form, Col, Row, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
const { REACT_APP_CLOUDINARY_CLOUDNAME } = process.env;

const CreateMovies = () => {
   const Genres = useSelector((state) => state.GenresAll);
   const Cast = useSelector((state) => state.CastAll);
   let dispatch = useDispatch();
   const [inputs, setInputs] = useState({
      titulo: "",
      sinopsis: "",
      poster: "",
      background: "",
      duracion: "",
      clasificacion: "",
      director: "",
      pais: "",
      puntuación: 0,
      distribuidora: "",
      trailer: "",
      proximoEstreno: false,
      genders: [],
      actors: [],
   });

   const [imagesSelected, setImagesSelected] = useState({
      poster: "",
      background: "",
   });

   const [errors, setErrors] = useState({
      titulo: "",
      sinopsis: "",
      poster: "",
      duracion: "",
      clasificacion: "",
      director: "",
      pais: "",
      distribuidora: "",
      puntuación: "",
      trailer: "",
      genders: "",
      actors: "",
      error: false,
   });

   const handleChange = (e) => {
      if (e.target.name !== "proximoEstreno") {
         setInputs({
            ...inputs,
            [e.target.name]: e.target.value.trim(),
         });
      } else {
         setInputs((prevInputs) => {
            return {
               ...prevInputs,
               [e.target.name]: !inputs[e.target.name],
            };
         });
      }

      setErrors(
         validate(
            {
               [e.target.name]: e.target.value,
            },
            errors,
            e.target.name
         )
      );
   };

   const changeArrayGenders = (evt) => {
      setInputs({
         ...inputs,
         [evt.target.name]: inputs.genders.concat(evt.target.value),
      });
      setErrors(
         validate(
            {
               ...inputs,
            },
            errors,
            "genders"
         )
      );
      document
         .getElementById(evt.target.value)
         .setAttribute("disabled", "disabled");
   };

   const changeArrayCast = (evt) => {
      setInputs({
         ...inputs,
         [evt.target.name]: inputs.actors.concat(evt.target.value),
      });
      setErrors(
         validate(
            {
               ...inputs,
            },
            errors,
            "actors"
         )
      );
      document
         .getElementsByName(evt.target.value)[0]
         .setAttribute("disabled", "disabled");
   };

   const handleOnClickGenres = (item) => {
      let index = inputs.genders.indexOf(item);
      let newArr = inputs.genders.filter(
         (e) => inputs.genders.indexOf(e) !== index
      );
      setInputs({ ...inputs, genders: newArr });

      document.getElementById(item).removeAttribute("disabled");
      document.getElementById("defaultGenres").selectedIndex = 0;
   };

   const handleOnClickCast = (item) => {
      let index = inputs.actors.indexOf(item);
      let newArr = inputs.actors.filter(
         (e) => inputs.actors.indexOf(e) !== index
      );
      setInputs({ ...inputs, actors: newArr });

      document.getElementsByName(item)[0].removeAttribute("disabled");
      document.getElementById("defaultGenres").selectedIndex = 0;
   };

   const handleClick = (e) => {
      setErrors(
         validate(
            {
               ...inputs,
            },
            errors,
            "submit"
         )
      );
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (errors.error === false) {
         Swal.fire({
            title: "¿Quieres guardar la pelicula?",
            icon: "info",
            showDenyButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `No guardar`,
         }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
               dispatch(postMovies(inputs));
               document.getElementById("ChupaUnLimon").reset();

               Swal.fire("La pelicula fue agregada!", "", "success");
               setTimeout(() => {
                  dispatch(AllMovies());
               }, 1000);
            } else if (result.isDenied) {
               Swal.fire("La pelicula no fue agregada", "", "info");
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

   const uploadImage = async (event) => {
      const formData = new FormData();
      formData.append("file", imagesSelected[event.target.name]);
      formData.append("upload_preset", "pyfniocg");
      await Axios.post(
         `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload`,
         formData
      )
         .then((response) => {
            setInputs({
               ...inputs,
               [event.target.name]: response.data.url,
            });
         })
         .catch((err) => console.log(err.message));
   };

   return (
      <Container
         className="Create__Movies"
         style={{ backgroundColor: "var(--first-color)", position: "relative" }}
      >
         <Link to="/admin" className="position-absolute top-0 start-0">
            <Button>
               <MdKeyboardBackspace className="me-3" />
               <span>Regresar al Admin</span>
            </Button>
         </Link>
         <h2
            className="text-center mb-4"
            style={{ color: "var(--text-light-color)" }}
         >
            Crea una pelicula
         </h2>
         <form id="ChupaUnLimon" onSubmit={(e) => handleSubmit(e)}>
            <Row className="justify-content-between mb-4">
               <Col md="5">
                  <div className="input__with__error">
                     <Form.Control
                        type="text"
                        name="titulo"
                        onChange={(evt) => handleChange(evt)}
                        placeholder="Título"
                     />
                     {errors.titulo ? <span>{errors.titulo}</span> : null}
                  </div>
               </Col>
               <Col md="5">
                  <div className="input__with__error">
                     <Form.Control
                        type="text"
                        name="director"
                        onChange={(evt) => handleChange(evt)}
                        placeholder="Director"
                     />
                     {errors.director ? <span>{errors.director}</span> : null}
                  </div>
               </Col>
            </Row>
            <Row className="justify-content-between mb-4">
               <Col md="5">
                  <div className="image_upload_poster">
                     <Form.Label column sm="2">
                        Poster:
                     </Form.Label>
                     <Form.Control
                        type="file"
                        name="poster"
                        onChange={(event) => {
                           setImagesSelected({
                              ...imagesSelected,
                              [event.target.name]: event.target.files[0],
                           });
                        }}
                     />
                     <Button
                        type="button"
                        name="poster"
                        onClick={(event) => uploadImage(event)}
                     >
                        Subir Imagen
                     </Button>
                     {inputs.poster && <span>imagen cargada:</span>}
                     <Image
                        style={{ width: 200 }}
                        cloudName={REACT_APP_CLOUDINARY_CLOUDNAME}
                        publicId={inputs.poster}
                     />
                  </div>
               </Col>
               <Col md="5">
                  <div className="image_upload_background">
                     <Form.Label column sm="2">
                        Fondo:
                     </Form.Label>
                     <Form.Control
                        type="file"
                        name="background"
                        onChange={(event) => {
                           setImagesSelected({
                              ...imagesSelected,
                              [event.target.name]: event.target.files[0],
                           });
                        }}
                     />
                     <Button
                        type="button"
                        name="background"
                        onClick={(event) => uploadImage(event)}
                     >
                        Subir Imagen
                     </Button>
                     {inputs.background && <span>imagen cargada:</span>}
                     <Image
                        style={{ width: 400 }}
                        cloudName={REACT_APP_CLOUDINARY_CLOUDNAME}
                        publicId={inputs.background}
                     />
                  </div>
               </Col>
            </Row>
            <Row className="justify-content-between mb-4">
               <Col md="5">
                  <div className="input__with__error">
                     <Form.Control
                        type="text"
                        name="clasificacion"
                        placeholder="Clasificacion"
                        onChange={(evt) => handleChange(evt)}
                     />
                     {errors.clasificacion ? (
                        <span>{errors.clasificacion}</span>
                     ) : null}
                  </div>
               </Col>
               <Col md="5">
                  <div className="input__with__error">
                     <Form.Control
                        type="number"
                        min="0"
                        name="duracion"
                        onChange={(evt) => handleChange(evt)}
                        placeholder="Duración"
                     />
                     {errors.duracion ? <span>{errors.duracion}</span> : null}
                  </div>
               </Col>
            </Row>
            <Row className="justify-content-between mb-4">
               <Col md="5">
                  <div className="form-check">
                     <Form.Check
                        class="form-check-input"
                        id="flexCheckDefault"
                        type="checkbox"
                        name="proximoEstreno"
                        onChange={(evt) => handleChange(evt)}
                        placeholder="proximoEstreno"
                     />
                     <label class="form-check-label" for="flexCheckDefault">
                        ¿Es próximo estreno?
                     </label>
                  </div>
               </Col>
               <Col md="5">
                  <div className="input__with__error">
                     <Form.Control
                        type="text"
                        name="pais"
                        onChange={(evt) => handleChange(evt)}
                        placeholder="Pais"
                     />
                     {errors.pais ? <span>{errors.pais}</span> : null}
                  </div>
               </Col>
            </Row>
            <Row className="justify-content-between mb-4">
               <Col md="5">
                  <div className="input__with__error">
                     <Form.Control
                        type="text"
                        name="distribuidora"
                        placeholder="Distribuidora"
                        onChange={(evt) => handleChange(evt)}
                     />
                     {errors.distribuidora ? (
                        <span>{errors.distribuidora}</span>
                     ) : null}
                  </div>
               </Col>
               <Col md="5">
                  <div className="input__with__error">
                     <Form.Control
                        type="text"
                        name="trailer"
                        onChange={(evt) => handleChange(evt)}
                        placeholder="Trailer"
                     />
                     {errors.trailer ? <span>{errors.trailer}</span> : null}
                  </div>
               </Col>
            </Row>
            <Row className="justify-content-between mb-4">
               <Col md="5">
                  <div className="input__with__error">
                     <Form.Select
                        id="defaultGenres"
                        name="genders"
                        defaultValue={"DEFAULT"}
                        onChange={(evt) => changeArrayGenders(evt)}
                     >
                        <option value="DEFAULT" disabled>
                           Géneros
                        </option>
                        {Genres.length &&
                           Genres.map((item, index) => {
                              return (
                                 <option
                                    id={item.id}
                                    className="elemSelect"
                                    key={`${item.genero}${index}`}
                                    value={item.id}
                                 >
                                    {item.genero}
                                 </option>
                              );
                           })}
                     </Form.Select>
                     {errors.genders ? <span>{errors.genders}</span> : null}
                  </div>
               </Col>
               <Col md="5">
                  <div className="input__with__error">
                     <Form.Select
                        id="defaultCast"
                        name="actors"
                        defaultValue={"DEFAULT"}
                        onChange={(evt) => changeArrayCast(evt)}
                     >
                        <option value="DEFAULT" disabled>
                           Reparto
                        </option>
                        {Cast.length &&
                           Cast.map((item) => {
                              return (
                                 <option
                                    name={item.id}
                                    className="elemSelect"
                                    key={item.nombre}
                                    value={item.id}
                                 >
                                    {item.nombre}
                                 </option>
                              );
                           })}
                     </Form.Select>

                     {errors.actors ? <span>{errors.actors}</span> : null}
                  </div>
               </Col>
            </Row>
            <Row className="justify-content-between mb-4">
               <Col md="12">
                  <div className="input__with__error">
                     <Form.Control
                        type="text"
                        name="sinopsis"
                        onChange={(evt) => handleChange(evt)}
                        placeholder="Sipnosis"
                     />
                     {errors.sinopsis ? <span>{errors.sinopsis}</span> : null}
                  </div>
               </Col>
            </Row>
            <Form.Control
               type="submit"
               value="Crear pelicula"
               onClick={(e) => handleClick(e)}
               style={{ width: "50%", margin: "auto" }}
            />
         </form>

         <Container className="SelectedFilters justify-content-between mt-4">
            <Row className="justify-content-between ">
               <Col md="6">
                  {inputs.genders &&
                     inputs.genders.length !== 0 &&
                     inputs.genders.map((item, index) => {
                        return (
                           <div
                              className="d-inline-block mr-2 mb-3"
                              key={index}
                           >
                              <span
                                 className="mr-1"
                                 id="selectedG"
                                 style={{
                                    color: "var(--text-light-color)",
                                    letterSpacing: "1px",
                                 }}
                              >
                                 {Genres[item - 1]?.genero}
                              </span>
                              <Button onClick={() => handleOnClickGenres(item)}>
                                 X
                              </Button>
                           </div>
                        );
                     })}
               </Col>
               <Col md="6">
                  {inputs.actors &&
                     inputs.actors.length !== 0 &&
                     inputs.actors.map((item, index) => {
                        return (
                           <div
                              className="d-inline-block mr-2 mb-3"
                              key={index}
                           >
                              <span
                                 className="mr-1"
                                 id="selectedC"
                                 style={{
                                    color: "var(--text-light-color)",
                                    letterSpacing: "1px",
                                 }}
                              >
                                 {Cast[item - 1]?.nombre}
                              </span>
                              <Button onClick={() => handleOnClickCast(item)}>
                                 X
                              </Button>
                           </div>
                        );
                     })}
               </Col>
            </Row>
         </Container>
      </Container>
   );
};

export default CreateMovies;
