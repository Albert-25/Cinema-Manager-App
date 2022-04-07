import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetAllCast, GetAllGenres } from "../../store/actions";
import { useParams, useNavigate, useMatch } from "react-router-dom";
import { Form, Col, Row, Container } from "react-bootstrap";
import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;
import { Link } from "react-router-dom";

export function EditItem() {
  const dispatch = useDispatch();
  const [item, setItem] = useState('')
  const params = useParams()
  const objTxt = useMatch('/admin/editactor/:id')
    ? { endpoint: 'actores', tag: 'actor' }
    : { endpoint: 'generos', tag: 'genero' }
  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`${REACT_APP_BASE_URL}/${objTxt.endpoint}`)
      .then(res => {
        const itemDB = res.data.find(a => a.id === parseInt(params.id))
        setItem(objTxt.tag === 'actor' ? itemDB.nombre : itemDB.genero)
      })
      .catch(err => console.log(err.response))
  }, [params]);

  function handleSubmit(e) {
    e.preventDefault()
    const body = objTxt.tag === 'actor'
      ? { Actor: { nombre: item } }
      : { Genre: { genero: item } }
    axios.put(`${REACT_APP_BASE_URL}/${objTxt.endpoint}/${parseInt(params.id)}`, body)
      .then(res => {
        dispatch(objTxt.tag === 'actor' ? GetAllCast() : GetAllGenres())
        navigate('/admin')
      })
      .catch(err => console.log(err.response))
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
        {`Modificar ${objTxt.tag}`}
      </h2>
      <form onSubmit={handleSubmit} style={{ width: "90%" }}>
        <Row className="justify-content-center">
          <Col md="6">
            <Form.Label style={{ letterSpacing: "1px" }}>
              {`${objTxt.tag[0].toUpperCase() + objTxt.tag.slice(1)}:`}
            </Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder={`Ingresa el nombre del ${objTxt.tag}`}
              onChange={(e) => setItem(e.target.value)}
              value={item}
            />
            {item.length < 1 && (
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
                value={`Modificar ${objTxt.tag}`}
              />
            </div>
          </Col>
        </Row>
      </form>
    </Container>
  );
}