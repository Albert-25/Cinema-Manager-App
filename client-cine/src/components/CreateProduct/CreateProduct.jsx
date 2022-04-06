import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Image } from "cloudinary-react";
import Axios from "axios";
import { uploadProduct } from "../../store/actions";
import { validate } from "./validate";
import { Link } from "react-router-dom";
import { Form, Col, Row, Container, Button } from "react-bootstrap";
import { MdKeyboardBackspace } from "react-icons/md";
import Swal from "sweetalert2";

const { REACT_APP_CLOUDINARY_CLOUDNAME } = process.env;

function CreateProduct() {
   const dispatch = useDispatch();
   const [info, setInfo] = useState({
      nombreProducto: "",
      imagenProducto: "",
      descripcion: "",
      precio: 0,
      stock: 0,
      isCombo: false,
   });

   const [errors, setErrors] = useState({
      nombreProducto: "",
      descripcion: "",
      precio: "",
      stock: "",
      error: false,
   });

   const formRef = useRef(null);
   const [imageSelected, setImageSelected] = useState("");

   // useEffect(() => {
   //   if (info.nombreProducto.length > 0) {
   //     setErrors(false);
   //   } else {
   //     setError(true);
   //   }
   // }, [info, error]);

   function handleChange(e) {
      if (e.target.name === "isCombo")
         setInfo({ ...info, isCombo: !info.isCombo });

      setInfo((prevInfo) => {
         return {
            ...prevInfo,
            [e.target.name]: e.target.value,
            isCombo: info.isCombo,
         };
      });

      setErrors(
         validate(
            {
               [e.target.name]: e.target.value,
            },
            errors,
            e.target.name
         )
      );
   }

   const handleClick = (e) => {
      setErrors(
         validate(
            {
               ...info,
            },
            errors,
            "submit"
         )
      );
   };

   function handleSubmit(e) {
      e.preventDefault();
      if (errors.error === false) {
         Swal.fire({
            title: "¿Quieres guardar el producto?",
            icon: "question",
            showDenyButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `No guardar`,
         }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
               dispatch(uploadProduct(info));
               formRef.current.reset();
            } else if (result.isDenied) {
               Swal.fire("El producto no fue agregada", "", "info");
            }
         });
      } else {
         Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ingrese correctamente los datos por favor.",
         });
      }
   }

   const uploadImage = async () => {
      const formData = new FormData();
      formData.append("file", imageSelected);
      formData.append("upload_preset", "pyfniocg");
      await Axios.post(
         `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload`,
         formData
      ).then((response) => {
         setInfo({
            ...info,
            imagenProducto: response.data.url,
         });
      });
   };

   return (
      <Container
         className="mt-5"
         style={{
            backgroundColor: "var(--first-color)",
            position: "relative",
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
            Crear Producto
         </h2>

         <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mx-auto"
            style={{ width: "80%" }}
         >
            <Row className="mb-4">
               <Col>
                  <div className="input__with__error">
                     <Form.Label
                        htmlFor="1"
                        style={{ color: "var(--text-light-color)" }}
                     >
                        Nombre del producto:
                     </Form.Label>
                     <Form.Control
                        type="text"
                        name="nombreProducto"
                        placeholder="Ingrese el nombre aquí..."
                        id="1"
                        onChange={handleChange}
                     />
                     {errors.nombreProducto ? (
                        <span>{errors.nombreProducto}</span>
                     ) : null}
                     {/* {info.nombreProducto.length < 1 && <span>no puede ser vacio</span>} */}
                  </div>
               </Col>
            </Row>
            <Row className="mb-4">
               <Col>
                  <div className="image_upload_product">
                     <Form.Label style={{ color: "var(--text-light-color)" }}>
                        Imagen del producto:
                     </Form.Label>
                     <Form.Control
                        type="file"
                        name="imagenProducto"
                        onChange={(event) => {
                           setImageSelected(event.target.files[0]);
                        }}
                     />
                     <Button
                        type="button"
                        name="imagenProducto"
                        onClick={(event) => uploadImage(event)}
                     >
                        Subir Imagen
                     </Button>
                     {info.imagenProducto && <span>imagen cargada:</span>}
                     <Image
                        style={{ width: 200 }}
                        cloudName={REACT_APP_CLOUDINARY_CLOUDNAME}
                        publicId={info.imagenProducto}
                     />
                  </div>
               </Col>
            </Row>
            <Row className="mb-4">
               <Col>
                  <div className="input__with__error">
                     <Form.Label
                        htmlFor="4"
                        style={{ color: "var(--text-light-color)" }}
                     >
                        Precio:
                     </Form.Label>
                     <Form.Control
                        type="number"
                        name="precio"
                        id="4"
                        min="0.00"
                        step="any"
                        onChange={handleChange}
                     />
                     {errors.precio ? <span>{errors.precio}</span> : null}
                  </div>
               </Col>
            </Row>
            <Row className="mb-4">
               <Col>
                  <div className="input__with__error">
                     <Form.Label
                        htmlFor="5"
                        style={{ color: "var(--text-light-color)" }}
                     >
                        Stock:
                     </Form.Label>
                     <Form.Control
                        type="number"
                        name="stock"
                        id="5"
                        min="0"
                        onChange={handleChange}
                     />
                     {errors.stock ? <span>{errors.stock}</span> : null}
                  </div>
               </Col>
            </Row>
            <Row className="mb-4">
               <Col>
                  <div className="input__with__error">
                     <Form.Label
                        htmlFor="3"
                        style={{ color: "var(--text-light-color)" }}
                     >
                        Descripcion del producto:
                     </Form.Label>
                     <Form.Control
                        as="textarea"
                        name="descripcion"
                        id="3"
                        placeholder="Ingrese una descripción para el producto..."
                        onChange={handleChange}
                        style={{ resize: "none" }}
                     />
                     {errors.descripcion ? (
                        <span>{errors.descripcion}</span>
                     ) : null}
                  </div>
               </Col>
            </Row>
            <Row className="mb-4">
               <Col>
                  <div className="input__with__error">
                     <Form.Label
                        htmlFor="6"
                        style={{
                           color: "var(--text-light-color)",
                           display: "inline-block",
                           marginRight: "1rem",
                        }}
                     >
                        Es combo?{"   "}
                     </Form.Label>
                     <Form.Check
                        type="checkbox"
                        name="isCombo"
                        id="6"
                        onChange={handleChange}
                        style={{
                           display: "inline-block",
                        }}
                     />
                     <Form.Control
                        type="submit"
                        value="Crear pelicula"
                        onClick={(e) => handleClick(e)}
                        style={{ width: "40%", margin: "auto" }}
                     />
                  </div>
               </Col>
            </Row>
         </form>
      </Container>
   );
}

export default CreateProduct;
