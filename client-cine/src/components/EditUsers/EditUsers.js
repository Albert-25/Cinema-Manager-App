import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailedUser, updateUser } from "../../store/actions";
import "../CreateMovies/CreateMovies.css";
//import { validate } from "../CreateMovies/validate";
import Swal from "sweetalert2";
import Axios from "axios";
import { useParams } from "react-router";
import { Form, Col, Row, Container, Button } from "react-bootstrap";
import { Image } from "cloudinary-react";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
const { REACT_APP_CLOUDINARY_CLOUDNAME } = process.env;

const EditUsers = () => {
   const dispatch = useDispatch();
   const id = useParams().id;

   useEffect(() => {
      dispatch(detailedUser(id));
   }, [dispatch]);

   /*useEffect(() => {
    dispatch(detailedUser(id));
  }, [dispatch, id]);*/

   const userDetails = useSelector((state) => state.DetailedUser);
   console.log('detalles', userDetails)

   const [imagesSelected, setImagesSelected] = useState({
      imagen: "",
   });

   const [inputs, setInputs] = useState({
      imagen: userDetails.imagen,
      rol: userDetails.rol,
      nombre: userDetails.nombre,
   });

   const [errors] = useState({
      nombre: "",
      imagen: "",
      correo: "",

      error: false,
   });

   const handleChange = (e) => {
      setInputs({
         ...inputs,
         [e.target.name]: e.target.value.trim(),
      });
   };

   const checkInputs = () => {
      if (inputs.nombre === "" && userDetails.nombre !== undefined) {

         setInputs({
            ...inputs,
            nombre: userDetails.nombre,
         });

      }
      if (inputs.rol === "" && userDetails.rol !== undefined) {


         setInputs({
            ...inputs,
            rol: userDetails.rol,
         });
      }
      if (inputs.imagen === "" && userDetails.imagen !== undefined) {
      

         setInputs({
            ...inputs,
            imagen: userDetails.imagen,
         });
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (errors.error === false) {
         Swal.fire({
            title: "¿Quieres guardar los cambios?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `No guardar`,
         }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
               dispatch(updateUser(id, inputs));
               Swal.fire("Usuario actualizado correctamente!", "", "success");
            } else if (result.isDenied) {
               Swal.fire("No se pudo actualizar al usuario", "", "info");
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
            imagen: response.data.url,
         });
      });
   };

   return (
      <Container
         className="Update_Movie"
         style={{
            backgroundColor: "var(--first-color)",
            position: "relative",
            color: "var(--text-light-color)",
            marginTop: "3rem",
            marginBottom: "5rem",
            width: "70%",
         }}
      >
         <Link to="/admin" className="position-absolute top-0 start-10">
            <Button>
               <MdKeyboardBackspace className="me-3" />
               <span>Regresar al Admin</span>
            </Button>
         </Link>
         <h2
            className="text-center mb-5 mt-4 fw-bolder"
            style={{ color: "var(--text-light-color)" }}
         >
            Actualiza el usuario
         </h2>
         <form onSubmit={(e) => handleSubmit(e)}>
            <Form.Label htmlFor="nombre">Nombre:</Form.Label>
            <div className="input__with__error mb-4">
               <Form.Control
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder={userDetails.nombre}
                  onChange={(evt) => handleChange(evt)}
               />
               {errors.nombre ? <span>{errors.nombre}</span> : null}
            </div>
            /*<Form.Label htmlFor="correo">Correo:</Form.Label>
            <div className="input__with__error mb-4">
               <Form.Control
                  type="text"
                  name="correo"
                  id="correo"
                  onChange={(evt) => handleChange(evt)}
                  placeholder={userDetails.correo}
               />
               {errors.correo ? <span>{errors.correo}</span> : null}
            </div>*/
            <div className="image_upload_profile">
               <Form.Label>Foto de perfil:</Form.Label>
               <Form.Control
                  type="file"
                  name="imagen"
                  onChange={(event) => {
                     setImagesSelected({
                        ...imagesSelected,
                        [event.target.name]: event.target.files[0],
                     });
                  }}
               />
               <Button
                  type="button"
                  name="imagen"
                  onClick={(event) => uploadImage(event)}
               >
                  Subir Imagen
               </Button>
               {inputs.imagen && <span>imagen cargada:</span>}
               <Image
                  style={{ width: 200 }}
                  cloudName={REACT_APP_CLOUDINARY_CLOUDNAME}
                  publicId={inputs.imagen}
               />
            </div>
            {detailedUser?.imagen ? (
               <>
                  <p>Actual imágen de perfil:</p>
                  <img
                     src={detailedUser.imagen}
                     style={{ width: 200 }}
                     alt="UserImage"
                  />
               </>
            ) : (
               <p>Actualmente no tiene imagen de perfil</p>
            )}

            <div className="input__with__error mb-5" style={{ width: "30%" }}>
               <Form.Select
                  id="roles"
                  name="rol"
                  defaultValue={"DEFAULT"}
                  onChange={(evt) => handleChange(evt)}
               >
                  <option value="DEFAULT" disabled>
                     Rol
                  </option>

                  <option name="admin" className="elemSelect" value="admin">
                     Admin
                  </option>
                  <option name="user" className="elemSelect" value="user">
                     User
                  </option>
               </Form.Select>

               {errors.rol ? <span>{errors.rol}</span> : null}
            </div>
            <Form.Control
               type="submit"
               value="Actualizar usuario"
               className="mb-4"
               onClick={(e) => {
                  checkInputs();
               }}
               style={{ width: "50%", margin: "auto" }}
            />
         </form>
      </Container>
   );
};

export default EditUsers;
