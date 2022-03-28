import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Image } from "cloudinary-react";
const { REACT_APP_CLOUDINARY_CLOUDNAME } = process.env;

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
  const [picProfile, setPicProfile] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
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
        picProfile
      );
      navigate("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  const uploadImage = async (event) => {
    const formData = new FormData();

    formData.append("file", selectedImage);
    formData.append("upload_preset", "pyfniocg");
    await Axios.post(
      `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload`,
      formData
    ).then((response) => {
      setPicProfile(response.data.url);
      /*setInputs({
        ...inputs,
        [event.target.name]: response.data.url,
      });*/
    });
  };
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
          <Form.Group id="picture">
              <Form.Label>Cambiar foto de perfil</Form.Label>
              <Form.Control
                type="file"
                name='profilePic'
                onChange={(event) => {
              setSelectedImage(event.target.files[0])
            }}
                placeholder="Leave blank to keep the same"
              />
              <button
            type="button"
            name="profilePic"
            onClick={(event) => uploadImage(event)}
          >
            Subir Imagen
          </button>
          <br/>
          {picProfile && <span>imagen cargada:</span>}
          <br/>
          <Image
            style={{ width: 200 }}
            cloudName={REACT_APP_CLOUDINARY_CLOUDNAME}
            publicId={picProfile}
          />
            </Form.Group>
            <div className="form-group">
            <select
                defaultValue={"DEFAULT"}
                name="Rol"
                onChange={(evt) => setRoles(evt.target.value)}
                required
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
