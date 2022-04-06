import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import { MdKeyboardBackspace } from "react-icons/md";
import { Image } from "cloudinary-react";
const { REACT_APP_CLOUDINARY_CLOUDNAME } = process.env;

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const nombreRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState("user");
  const navigate = useNavigate();
  const [picProfile, setPicProfile] = useState(
    "https://www.pngplay.com/wp-content/uploads/6/Film-Icon-Background-PNG-Image.png"
  );
  const [selectedImage, setSelectedImage] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      Swal.fire(
        "Contraseñas distintas",
        "Ambas contraseñas deben ser iguales",
        "error"
      );
      return setError("Passwords dont match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        roles,
        nombreRef.current.value,
        picProfile
      );
      navigate("/");
    } catch (e) {
      setError("Error al crear una cuenta");
      if (e.code === "auth/email-already-in-use") {
        Swal.fire(
          "Correo ya registrado",
          "Este correo ya está asociado a una cuenta activa",
          "error"
        );
      }
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
        <Link to="/" style={{ marginTop: "1rem" }} className="position-absolute top-0 start-10">
            <Button>
               <MdKeyboardBackspace className="me-3" />
               <span>Volver a página principal</span>
            </Button>
         </Link>
          <h2 className="text-center mb-4">Registrarse</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Dirección de e-mail</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Group id="text">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" ref={nombreRef} required />
            </Form.Group>
          <Form.Group id="picture">
              <Form.Label>Foto de perfil</Form.Label>
              <Form.Control
                type="file"
                name="profilePic"
                onChange={(event) => {
                  setSelectedImage(event.target.files[0]);
                }}
                placeholder="Leave blank to keep the same"
              />
              <Button
                className="w-20"
                name="profilePic"
                style={{ marginTop: "1rem" }}
                onClick={(event) => uploadImage(event)}
                type="button"
              >
                Subir imágen
              </Button>
              <br />
              {picProfile && <span>Imagen cargada:</span>}
              <br />
              <Image
                style={{ width: 200 }}
                cloudName={REACT_APP_CLOUDINARY_CLOUDNAME}
                publicId={picProfile}
              />
            </Form.Group>
            <Button className="w-100" disabled={loading} type="submit">
              Registrarse
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2" style={{color:"whitesmoke"}}>
        ¿Ya tienes una cuenta?
        <Link to="/login">Ingresar</Link>
      </div>
    </>
  );
}
