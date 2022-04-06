import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductInfo, editProduct } from "../../store/actions";
import "../CreateMovies/CreateMovies.css";
import Swal from "sweetalert2";
import Axios from "axios";
import { useParams } from "react-router";
import { Image } from "cloudinary-react";
import { Form, Col, Row, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
const { REACT_APP_CLOUDINARY_CLOUDNAME } = process.env;

const EditProducts = () => {
  const dispatch = useDispatch();
  const id = useParams().id;

  useEffect(() => {
    dispatch(getProductInfo(id));
  }, [dispatch]);

  const productData = useSelector((state) => state.editInfo);

  console.log(productData);

  const [inputs, setInputs] = useState({
    isCombo: "",
  });

  const [imagesSelected, setImagesSelected] = useState({
    imagenProducto: "",
  });


  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleClick = (e) => {};

  const checkInputs = () => {
    if (
      inputs.nombreProducto === "" &&
      productData.nombreProducto !== undefined
    ) {
      setInputs({
        ...inputs,
        nombreProducto: productData.nombreProducto,
      });
    }
    if (
      inputs.imagenProducto === "" &&
      productData.imagenProducto !== undefined
    ) {
      setInputs({
        ...inputs,
        imagenProducto: productData.imagenProducto,
      });
    }
    if (inputs.descripcion === "" && productData.descripcion !== undefined) {
      setInputs({
        ...inputs,
        descripcion: productData.descripcion,
      });
    }
    if (inputs.precio === "" && productData.precio !== undefined) {
      setInputs({
        ...inputs,
        precio: productData.precio,
      });
    }
    if (inputs.stock === "" && productData.stock !== undefined) {
      setInputs({
        ...inputs,
        stock: productData.stock,
      });
    }
    if (inputs.isCombo === "" && productData.isCombo !== undefined) {
      setInputs({
        ...inputs,
        isCombo: productData.isCombo,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (true) {
      Swal.fire({
        title: "¿Quieres guardar los cambios?",
        icon: "question",
        showDenyButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `No guardar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          console.log(inputs);
          dispatch(editProduct(id, inputs));
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
        Editar Producto
      </h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Row className="justify-content-between mb-4">
          <Col lg={5}>
            <div className="input__with__error">
              <Form.Label htmlFor="titulo">Título:</Form.Label>
              <Form.Control
                type="text"
                name="nombreProducto"
                id="nombreProducto"
                placeholder={productData.nombreProducto}
                onChange={(evt) => handleChange(evt)}
              />
            </div>
          </Col>
          <Col lg={5}>
            <div className="input__with__error">
              <Form.Label htmlFor="director">Descripción:</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                id="descripcion"
                onChange={(evt) => handleChange(evt)}
                placeholder={productData.descripcion}
              />
            </div>
          </Col>
        </Row>
        <Row className="justify-content-between mb-4">
          <Col lg={5}>
            <div className="image_upload_poster">
              <Form.Label>Imagen del Producto:</Form.Label>
              <Form.Control
                type="file"
                name="imagenProducto"
                id="imagenProducto"
                onChange={(event) => {
                  setImagesSelected({
                    ...imagesSelected,
                    [event.target.name]: event.target.files[0],
                  });
                }}
              />
              <Button
                type="button"
                name="imagenProducto"
                onClick={(event) => uploadImage(event)}
              >
                Subir Imagen
              </Button>
              {inputs.imagenProducto && <span>imagen cargada:</span>}
              <Image
                style={{ width: 200 }}
                cloudName={REACT_APP_CLOUDINARY_CLOUDNAME}
                publicId={inputs.imagenProducto}
              />
            </div>
          </Col>
        </Row>
        <Row className="justify-content-between mb-4">
          <Col lg={5}>
            <div className="input__with__error">
              <Form.Label htmlFor="duracion">Precio:</Form.Label>
              <Form.Control
                type="number"
                min="0"
                name="precio"
                id="precio"
                onChange={(evt) => handleChange(evt)}
                placeholder={productData.precio}
              />
            </div>
          </Col>
        </Row>
        <Row className="justify-content-between mb-4">
          <Col lg={5}>
            <div className="input__with__error">
              <Form.Label htmlFor="pais">Stock:</Form.Label>
              <Form.Control
                type="number"
                min="0"
                name="stock"
                id="stock"
                onChange={(evt) => handleChange(evt)}
                placeholder={productData.stock}
              />
            </div>
          </Col>
        </Row>
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
          <Form.Select
            name="isCombo"
            id="6"
            defaultChecked={productData.isCombo}
            onChange={handleChange}
            style={{
              display: "inline-block",
              marginBottom: "10px"
            }}
          >
            <option selected disabled={true}>
              Es Combo?
            </option>
            <option value={true}>Si</option>
            <option value={false}>No</option>
          </Form.Select>
          <Form.Control
            type="submit"
            value="Editar producto"
            style={{ width: "50%", margin: "auto" }}
            onClick={(e) => {
              checkInputs();
              handleClick(e);
            }}
          />
        </div>
      </form>
    </Container>
  );
};

export default EditProducts;
