import React, { useState } from "react";
import { useSelector } from "react-redux";
import { postFunciones } from "../../store/actions";
import { validate } from "./validate";
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
      pelicula: info.pelicula,
    },
  ]);
  const [errors, setErrors] = useState([
    {
      sala: "",
      fecha: "",
      horario: "",
      asientos: "",
      precio: "",
      detalle: "",
      pelicula: "",
      error: true,
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

    let newErrors = {
      sala: "",
      fecha: "",
      horario: "",
      asientos: "",
      precio: "",
      detalle: "",
      pelicula: "",
      error: true,
    };

    setInputs([...inputs, newfield]);
    setErrors(errors.concat(newErrors));
  };

  const removeFields = (index) => {
    let data = [...inputs];
    data.splice(index, 1);
    setInputs(data);

    let errData = [...errors];
    errData.splice(index, 1);
    setErrors(errData);
  };

  const handleChange = (index, e) => {
    let data = [...inputs];
    data[index][e.target.name] = e.target.value;
    setInputs(data);
    checkInputs();

    errors[index] = validate(
      {
        [e.target.name]: e.target.value,
      },
      errors[index],
      e.target.name
    );
  };

  const handleInfo = (e, index) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
    checkInputs();
    errors[index] = validate(
      { [e.target.name]: e.target.value },
      errors[index],
      e.target.name
    );
  };

  const checkInputs = () => {
    inputs.forEach((element) => {
      element.asientos = info.asientos;
      element.maxAsientos = info.asientos;
      element.sala = info.sala;
    });
  };

  const handleClick = (e) => {
    errors.map((el, index) => {
      el = validate({ ...inputs[index] }, el, "submit");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalCheck = false;
    errors.forEach((e) => {
      if (e.error === true) {
        finalCheck = true;
      }
    });
    if (finalCheck === false) {
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

          document.getElementById("Panaino!").reset();
          window.location.reload();
          // setTimeout(() => {
          //   dispatch(AllMovies());
          // }, 1000);
        } else if (result.isDenied) {
          Swal.fire("Las funciones no fueron agregadas", "", "info");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Porfavor, ingrese correctamente los datos y vuelva a intentar",
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
                        onChange={(e) => handleInfo(e, index)}
                        placeholder="Sala"
                      />
                      {/* {errors.sala ? <span>{errors.sala}</span> : null} */}
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
                    {/* {errors.fecha ? (
                      <span style={{ color: "red" }}>{errors.fecha}</span>
                    ) : null} */}
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
                    {/* {errors.horario ? <span>{errors.horario}</span> : null} */}
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
                          onChange={(e) => handleInfo(e, index)}
                          placeholder="Nro. de asientos"
                        />
                        {/* {errors.asientos ? (
                          <span>{errors.asientos}</span>
                        ) : null} */}
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
                    {/* {errors.detalle ? <span>{errors.detalle}</span> : null} */}
                  </div>
                </Col>
                <Col md="5">
                  {index === 0 && (
                    <div className="input__with__error">
                      <Form.Select
                        name="pelicula"
                        defaultValue={"DEFAULT"}
                        onChange={(e) => {
                          handleInfo(e, index);
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
                      {/* {errors.pelicula ? <span>{errors.pelicula}</span> : null} */}
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
                  onClick={(e) => handleClick(e)}
                  type="submit"
                  value="Crear función(es)"
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
