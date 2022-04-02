import React, { useState } from "react";
import { useSelector } from "react-redux";
import { postFunciones } from "../../store/actions";
//import { validate } from "./validate";
import Swal from "sweetalert2";
import { Form, Col, Row, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

const CreateFunciones = () => {
  const Movies = useSelector((state) => state.PelisAll);

  const [info, setInfo] = useState({
    sala: "",
    asientos: "",
    pelicula: "",
  });

  const [inputs, setInputs] = useState([
    {
      sala: info.sala,
      fecha: "",
      horario: "",
      asientos: info.asientos,
      maxAsientos: info.asientos,
      precio: "",
      detalle: "",
    },
  ]);

  const addFields = () => {
    let newfield = {
      sala: info.sala,
      fecha: "",
      horario: "",
      asientos: info.asientos,
      maxAsientos: info.asientos,
      precio: "",
      detalle: "",
    };

    setInputs([...inputs, newfield]);
  };

  const removeFields = (index) => {
    let data = [...inputs];
    data.splice(index, 1);
    setInputs(data);
  };

  const [errors] = useState({
    sala: "",
    fecha: "",
    horario: "",
    asientos: "",
    precio: "",
    detalle: "",
    pelicula: "",
    error: false,
  });

  const handleChange = (index, e) => {
    let data = [...inputs];
    data[index][e.target.name] = e.target.value;
    checkInputs();
    console.log(data);

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

  const handleInfo = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
    console.log(info);
    checkInputs();
  };

  const handleClick = (e) => {
    // setErrors(
    //   validate(
    //     {
    //       ...inputs,
    //     },
    //     errors,
    //     "submit"
    //   )
    // );
  };

  const checkInputs = () => {
    inputs.forEach((element) => {
      element.asientos = info.asientos;
      element.maxAsientos = info.asientos;
      element.sala = info.sala;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.error === false) {
      Swal.fire({
        title: "¿Quieres guardar las funciones?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `No guardar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          postFunciones(inputs, info.pelicula);
          
          //vvv cambiar clase x algo gracioso vvv
          document.getElementById("Panaino!").reset();

          Swal.fire("La pelicula fue agregada!", "", "success");
          // setTimeout(() => {
          //   dispatch(AllMovies());
          // }, 1000);
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

  return (
    <Container
      className="Create__Movies"
      style={{
        backgroundColor: "var(--first-color)",
        position: "relative",
      }}
    >
      <Link to="/admin" className="position-absolute top-0 start-0">
        <Button>
          <MdKeyboardBackspace className="mr-3" />
          <span style={{ marginLeft: "0.75rem" }}>Regresar al Admin</span>
        </Button>
      </Link>
      <h2
        className="text-center mb-4"
        style={{ color: "var(--text-light-color)" }}
      >
        Crear funciones
      </h2>
      {/* EMPIEZA EL FORM */};
      <form id="Panaino!" onSubmit={(e) => handleSubmit(e)}>
        {inputs.map((input, index) => {
          return (
            <div key={index}>
              {index !== 0 && <hr style={{ color: "lightblue" }} />}
              <Row className="justify-content-between mb-4">
                {index === 0 && (
                  <Col md="5">
                    <div className="input__with__error">
                      <Form.Control
                        type="number"
                        name="sala"
                        min="00"
                        onChange={(e) => handleInfo(e)}
                        placeholder="Sala"
                      />
                      {/* {errors.titulo ? <span>{errors.titulo}</span> : null} */}
                    </div>
                  </Col>
                )}
                <Col md="5">
                  <span style={{ color: "white" }}>Fecha:</span>
                  <div>
                    <input
                      type="date"
                      name="fecha"
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Fecha"
                    />
                    {/* {errors.director ? <span>{errors.director}</span> : null} */}
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-between mb-4">
                <Col md="5">
                  <span style={{ color: "white", marginRight: "5px" }}>
                    Hora:
                  </span>
                  <div className="input__with__error">
                    <input
                      type="time"
                      name="horario"
                      onChange={(e) => handleChange(index, e)}
                    />
                    {/* {errors.clasificacion ? (
              <span>{errors.clasificacion}</span>
            ) : null} */}
                  </div>
                </Col>
                {index === 0 && (
                  <Col md="5">
                    {index === 0 && (
                      <div className="input__with__error">
                        <Form.Control
                          type="number"
                          min="0"
                          name="asientos"
                          onChange={(e) => handleInfo(e)}
                          placeholder="Nro. de asientos"
                        />
                        {/* {errors.duracion ? <span>{errors.duracion}</span> : null} */}
                      </div>
                    )}
                  </Col>
                )}
              </Row>
              <Row className="justify-content-between mb-4">
                <Col md="5">
                  <div className="input__with__error">
                    <Form.Control
                      type="number"
                      min="0.00"
                      step="any"
                      name="precio"
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Precio entrada"
                    />
                    {/* {errors.pais ? <span>{errors.pais}</span> : null} */}
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-between mb-4">
                <Col md="5">
                  <div className="input__with__error">
                    <Form.Control
                      type="text"
                      name="detalle"
                      placeholder="Detalles de la función"
                      onChange={(e) => handleChange(index, e)}
                    />
                    {/* {errors.distribuidora ? (
              <span>{errors.distribuidora}</span>
            ) : null} */}
                  </div>
                </Col>
                <Col md="5">
                  {index === 0 && (
                    <div className="input__with__error">
                      <Form.Select
                        name="pelicula"
                        defaultValue={"DEFAULT"}
                        onChange={(e) => {
                          handleInfo(e);
                        }}
                      >
                        <option value="DEFAULT" disabled>
                          Pelicula
                        </option>
                        {Movies.length &&
                          Movies.map((item) => {
                            return (
                              <option
                                key={item.titulo}
                                className="elemSelect"
                                value={item.id}
                              >
                                {item.titulo}
                              </option>
                            );
                          })}
                      </Form.Select>
                      {/* {errors.trailer ? <span>{errors.trailer}</span> : null} */}
                    </div>
                  )}
                </Col>
              </Row>
              <Row>
                {index === inputs.length - 1 && (
                  <Form.Control
                    type="button"
                    value="Agregar otra función"
                    onClick={() => addFields()}
                    style={{
                      width: "15%",
                      margin: "auto",
                      marginBottom: "50px",
                    }}
                  />
                )}
                {index === inputs.length - 1 && index !== 0 && (
                  <Form.Control
                    type="button"
                    value="Remover entrada"
                    style={{
                      width: "15%",
                      margin: "auto",
                      marginBottom: "50px",
                    }}
                    onClick={() => removeFields(index)}
                  />
                )}
              </Row>
              {index === inputs.length - 1 && (
                <Form.Control
                  type="submit"
                  value="Crear función(es)"
                  onClick={(e) => handleClick(e)}
                  style={{ width: "50%", margin: "auto" }}
                />
              )}
            </div>
          );
        })}
      </form>
    </Container>
  );
};

export default CreateFunciones;
