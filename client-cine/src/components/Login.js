import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import Swal from "sweetalert2";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login, user } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      let next = new Promise((resolve, rejected) => {
        if ((user && user?.rol === "user") || (user && !user.rol)) {
          resolve("/");
        } else if (user && user?.rol === "admin") {
          resolve("/admin");
        }
      });
      next.then((res) => navigate(res));
    } catch (e) {
      if (e.code === "auth/too-many-requests") {
        Swal.fire(
          "Demasiados intentos",
          "Espera unos minutos o reinicia la contraseña para volver a intentar",
          "error"
        );
      } else if (e.code === "auth/wrong-password") {
        Swal.fire(
          "Contraseña equivocada",
          "¿Has olvidado tu contraseña?",
          "question"
        );
      }
      if (e.code === "auth/user-not-found") {
        Swal.fire(
          "Correo electrónico no encontrado",
          "Si aún no tienes una cuenta prueba a registrarte",
          "question"
        );
      }
      console.log("Failed to sign in", JSON.stringify(e.code));
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
        <Link to="/" style={{ marginTop: "1rem" }} className="position-absolute top-0 start-10">
            <Button>
               <MdKeyboardBackspace className="me-3" />
               <span>Volver a página principal</span>
            </Button>
         </Link>
          <h2 className="text-center mb-4">Ingresar</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Correo</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Button
              className="w-100"
              disabled={loading}
              type="submit"
              style={{ marginTop: "1rem" }}
            >
              Ingresar
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          </div>
          <div className="w-100 text-center mt-2">
            ¿Necesitas una cuenta?
            <Link to="/signup"> Registrarse</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
