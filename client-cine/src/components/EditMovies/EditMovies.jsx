import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieInfo, editMovie } from "../../store/actions";
import "../CreateMovies/CreateMovies.css";
import { GetAllGenres, GetAllCast } from "../../store/actions";
//import { validate } from "../CreateMovies/validate";
import Swal from "sweetalert2";
import Axios from "axios";
import { useParams } from "react-router";
import { Image } from "cloudinary-react";
import { Form, Col, Row, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
const { REACT_APP_CLOUDINARY_CLOUDNAME } = process.env;

const EditMovies = () => {
   const dispatch = useDispatch();
   const id = useParams().id;
   useEffect(() => {
      dispatch(GetAllGenres());
      dispatch(GetAllCast());
      dispatch(getMovieInfo(id));
   }, [dispatch]);

   const Genres = useSelector((state) => state.GenresAll);
   const Cast = useSelector((state) => state.CastAll);
   const movieData = useSelector((state) => state.editInfo);


   const [inputs, setInputs] = useState({
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
      //puntuación: "",
      pais: "",
      distribuidora: "",
      trailer: "",
      genders: "",
      actors: "",
      error: false,
   });

   const handleChange = (e) => {
      setInputs({
         ...inputs,
         [e.target.name]: e.target.value.trim(),
      });
   };

   const changeArrayGenders = (evt) => {
      setInputs({
         ...inputs,
         [evt.target.name]: inputs.genders.concat(evt.target.value),
      });
      document
         .getElementById(evt.target.value)
         .setAttribute("disabled", "disabled");
   };

   const changeArrayCast = (evt) => {
      setInputs({
         ...inputs,
         [evt.target.name]: inputs.actors.concat(evt.target.value),
      });
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
   };

   const checkInputs = () => {
      if (inputs.titulo === "" && movieData.titulo !== undefined) {
         setInputs({
            ...inputs,
            titulo: movieData.titulo,
         });
      }
      if (inputs.sinopsis === "" && movieData.sinopsis !== undefined) {
         setInputs({
            ...inputs,
            sinopsis: movieData.sinopsis,
         });
      }
      if (inputs.poster === "" && movieData.poster !== undefined) {
         setInputs({
            ...inputs,
            poster: movieData.poster,
         });
      }
      if (inputs.background === "" && movieData.background !== undefined) {
         setInputs({
            ...inputs,
            background: movieData.background,
         });
      }
      if (inputs.duracion === "" && movieData.duracion !== undefined) {
         setInputs({
            ...inputs,
            duracion: movieData.duracion,
         });
      }
      if (
         inputs.clasificacion === "" &&
         movieData.clasificacion !== undefined
      ) {
         setInputs({
            ...inputs,
            clasificacion: movieData.clasificacion,
         });
      }
      if (inputs.director === "" && movieData.director !== undefined) {
         setInputs({
            ...inputs,
            director: movieData.director,
         });
      }
      if (inputs.puntuación === "" && movieData.puntuación !== undefined) {
         setInputs({
            ...inputs,
            puntuación: movieData.puntuación,
         });
      }
      if (inputs.pais === "" && movieData.pais !== undefined) {
         setInputs({
            ...inputs,
            pais: movieData.pais,
         });
      }
      if (
         inputs.distribuidora === "" &&
         movieData.distribuidora !== undefined
      ) {
         setInputs({
            ...inputs,
            distribuidora: movieData.distribuidora,
         });
      }
      if (inputs.trailer === "" && movieData.trailer !== undefined) {
         setInputs({
            ...inputs,
            trailer: movieData.trailer,
         });
      }
      if (inputs.genders.length === 0 && movieData.Genres !== undefined) {
         setInputs({
            ...inputs,
            genders: movieData.Genres,
         });
      }
      if (inputs.actors.length === 0 && movieData.Actors !== undefined) {
         setInputs({
            ...inputs,
            actors: movieData.Actors,
         });
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (errors.error === false) {
         Swal.fire({
            title: "¿Quieres guardar los cambios?",
            icon: "question",
            showDenyButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `No guardar`,
         }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
               dispatch(editMovie(id, inputs));
            } else if (result.isDenied) {
               Swal.fire("La pelicula no fue editada", "", "info");
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
      ).then((response) => {
         setInputs({
            ...inputs,
            [event.target.name]: response.data.url,
         });
      });
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
            Editar la pelicula
         </h2>
         <form onSubmit={(e) => handleSubmit(e)}>
            <Row className="justify-content-between mb-4">
               <Col lg={5}>
                  <div className="input__with__error">
                     <Form.Label htmlFor="titulo">Título:</Form.Label>
                     <Form.Control
                        type="text"
                        name="titulo"
                        id="titulo"
                        placeholder={movieData.titulo}
                        onChange={(evt) => handleChange(evt)}
                     />
                     {errors.titulo ? <span>{errors.titulo}</span> : null}
                  </div>
               </Col>
               <Col lg={5}>
                  <div className="input__with__error">
                     <Form.Label htmlFor="director">Director:</Form.Label>
                     <Form.Control
                        type="text"
                        name="director"
                        id="director"
                        onChange={(evt) => handleChange(evt)}
                        placeholder={movieData.director}
                     />
                     {errors.director ? <span>{errors.director}</span> : null}
                  </div>
               </Col>
            </Row>
            <Row className="justify-content-between mb-4">
               <Col lg={5}>
                  <div className="image_upload_poster">
                     <Form.Label>Poster:</Form.Label>
                     <Form.Control
                        type="file"
                        name="poster"
                        id="poster"
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
               <Col lg={5}>
                  <div className="image_upload_background">
                     <Form.Label htmlFor="background">Background:</Form.Label>
                     <Form.Control
                        type="file"
                        name="background"
                        id="background"
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
               <Col lg={5}>
                  <div className="input__with__error">
                     <Form.Label htmlFor="duracion">Duración:</Form.Label>
                     <Form.Control
                        type="number"
                        min="0"
                        name="duracion"
                        id="duracion"
                        onChange={(evt) => handleChange(evt)}
                        placeholder={movieData.duracion}
                     />
                     {errors.duracion ? <span>{errors.duracion}</span> : null}
                  </div>
               </Col>
               <Col lg={5}>
                  <div className="input__with__error">
                     <Form.Label htmlFor="clasificacion">
                        Clasificación:
                     </Form.Label>
                     <Form.Control
                        type="text"
                        name="clasificacion"
                        id="clasificacion"
                        placeholder={movieData.clasificacion}
                        onChange={(evt) => handleChange(evt)}
                     />
                     {errors.clasificacion ? (
                        <span>{errors.clasificacion}</span>
                     ) : null}
                  </div>
               </Col>
            </Row>
            <Row className="justify-content-between mb-4">
               <Col lg={5}>
                  <div className="input__with__error">
                     <Form.Label htmlFor="trailer">Trailer:</Form.Label>
                     <Form.Control
                        type="text"
                        name="trailer"
                        id="trailer"
                        onChange={(evt) => handleChange(evt)}
                        placeholder={movieData.trailer}
                     />
                     {errors.trailer ? <span>{errors.trailer}</span> : null}
                  </div>
               </Col>
               <Col lg={5}></Col>
            </Row>
            <Row className="justify-content-between mb-4">
               <Col lg={5}>
                  <div className="input__with__error">
                     <Form.Label htmlFor="pais">País:</Form.Label>
                     <Form.Control
                        type="text"
                        name="pais"
                        id="pais"
                        onChange={(evt) => handleChange(evt)}
                        placeholder={movieData.pais}
                     />
                     {errors.pais ? <span>{errors.pais}</span> : null}
                  </div>
               </Col>
               <Col lg={5}>
                  <div className="input__with__error">
                     <Form.Label htmlFor="distribuidora">
                        Distribuidora:
                     </Form.Label>
                     <Form.Control
                        type="text"
                        name="distribuidora"
                        id="distribuidora"
                        placeholder={movieData.distribuidora}
                        onChange={(evt) => handleChange(evt)}
                     />
                     {errors.distribuidora ? (
                        <span>{errors.distribuidora}</span>
                     ) : null}
                  </div>
               </Col>
            </Row>

            <Row className="justify-content-between mb-4">
               <Col lg={5}>
                  <div className="input__with__error">
                     <Form.Select
                        id="defaultGenres"
                        name="genders"
                        defaultValue={"DEFAULT"}
                        onChange={(evt) => changeArrayGenders(evt)}
                     >
                        <option value="DEFAULT" disabled>
                           Generos
                        </option>
                        {Genres &&
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
               <Col lg={5}>
                  <div className="input__with__error">
                     <Form.Select
                        id="defaultCast"
                        name="actors"
                        defaultValue={"DEFAULT"}
                        onChange={(evt) => changeArrayCast(evt)}
                     >
                        <option value="DEFAULT" disabled>
                           Cast
                        </option>
                        {Cast &&
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
               <Col lg={12}>
                  <div className="input__with__error">
                     <Form.Label htmlFor="sinopsis">Sinópsis:</Form.Label>
                     <Form.Control
                        type="text"
                        name="sinopsis"
                        id="sinopsis"
                        onChange={(evt) => handleChange(evt)}
                        placeholder={movieData.sinopsis}
                     />
                     {errors.sinopsis ? <span>{errors.sinopsis}</span> : null}
                  </div>
               </Col>
            </Row>
            <Form.Control
               type="submit"
               value="Editar pelicula"
               style={{ width: "50%", margin: "auto" }}
               onClick={(e) => {
                  checkInputs();
                  handleClick(e);
               }}
            />
         </form>

         <div className="SelectedFilters">
            <div className="gendersChoosenContainer">
               {inputs.genders &&
                  inputs.genders.length !== 0 &&
                  inputs.genders.map((item, index) => {
                     return (
                        <div key={index}>
                           <p id="selectedG">{Genres[item - 1].genero}</p>

                           <Button
                              className="close"
                              onClick={() => handleOnClickGenres(item)}
                           >
                              X
                           </Button>
                        </div>
                     );
                  })}
            </div>
            <div className="castChoosenContainer">
               {inputs.actors &&
                  inputs.actors.length !== 0 &&
                  inputs.actors.map((item, index) => {
                     return (
                        <div key={index}>
                           <p id="selectedC">{Cast[item - 1].nombre}</p>
                           <Button
                              className="close"
                              onClick={() => handleOnClickCast(item)}
                           >
                              X
                           </Button>
                        </div>
                     );
                  })}
            </div>
         </div>
      </Container>
   );
};

export default EditMovies;
