import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const nombreRef = useRef();
  const imagenRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState("user");
  const navigate = useNavigate();
console.log('Us', roles)
  async function handleSubmit(e) {
    e.preventDefault();
    
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords dont match");
    }
    try {
      setError("");
      setLoading(true);
      console.log("recibidiro", roles);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        roles,
        nombreRef.current.value,
        imagenRef.current.value
      );
      navigate("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Group id="text">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" ref={nombreRef} required />
            </Form.Group>
            <Form.Group id="text">
              <Form.Label>Imagen</Form.Label>
              <Form.Control type="text" ref={imagenRef} required />
            </Form.Group>
            <div className="form-group">
            <select
                defaultValue={"DEFAULT"}
                name="Difficulty"
                onChange={(evt) => setRoles(evt.target.value)}
              >
                <option className="elemSelect" value="DEFAULT" disabled>
                  Seleccionar roles
                </option>
                <option className="elemSelect" value="admin" type="text">
                  Admin
                </option>
                <option className="elemSelect" value="user">
                  User
                </option>
              </select>
            </div>
            <Button className="w-100" disabled={loading} type="submit">
              Sign up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account?
        <Link to="/login">Log in</Link>
      </div>
    </>
  );
}
