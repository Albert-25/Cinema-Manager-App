import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";


export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setMessage("");
      setError("");
      setLoading(true);
      // await login(emailRef.current.value, passwordRef.current.value);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
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
          <h2 className="text-center mb-4">Reiniciar contraseña</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Correo: </Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Button
              className="w-100"
              style={{ marginTop: "1rem" }}
              disabled={loading}
              type="submit"
            >
              Reiniciar contraseña
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Ingresar</Link>
          </div>
          <div className="w-100 text-center mt-2">
            ¿Necesitas una cuenta?
            <Link to="/signup">Registrarse</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
