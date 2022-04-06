import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Image } from "cloudinary-react";
import Example from './PasswordVerification';
const { REACT_APP_CLOUDINARY_CLOUDNAME } = process.env;



export default function UpdateProfile() {
    const navigate = useNavigate();
  const emailRef = useRef();
  const nameRef = useRef();
  const { user, currentUser, updateEmail, updateName } = useAuth();
  const [error, setError] = useState("");
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);


  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");

  const [picProfile, setPicProfile] = useState("");
  const [loading, setLoading] = useState(false);



  const [selectedImage, setSelectedImage] = useState("");

  const [show, setShow] = useState(false);



  function handleSubmit(e) {

    e.preventDefault();
    if (pass !== passConfirm) {
      return setError("Passwords dont match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    if (pass) {
      setShow(true)


    }
    if (user && nameRef && nameRef.current && nameRef.current.value !== user.nombre || user && picProfile !== user.imagen) {
      promises.push(updateName(name, picProfile, user));
    }
    Promise.all(promises)
      .then(() => {
        if(pass === '' && passConfirm === ''){
          Swal.fire({
            title: "¿Quieres guardar los cambios?",
            icon: "info",
            showDenyButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `No guardar`,
         }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {


               Swal.fire("Cambio guardado correctamente!", "", "success");
      navigate("/");
              
            } else if (result.isDenied) {
               Swal.fire("El cambio no se ha guardado", "", "info");
            }
         });

        }
      })
      .catch((e) => {
        setError("Failed to update account");
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocurrio un problema al actualizar los datos...',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .finally(() => {
        setLoading(false);
      });
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
    });
  };

  return (
    <>
    <Example show={show} setShow={setShow} pass={pass} />
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Actualizar perfil</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Dirección de e-mail</Form.Label>
              <Form.Control
                type="email"
                 
                disabled
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                placeholder="Deja en blanco para mantener sin cambios"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => {
                  setPassConfirm(e.target.value);
                }}
                placeholder="Deja en blanco para mantener sin cambios"
              />
            </Form.Group>
            <Form.Group id="name">
              <Form.Label>Cambio de nombre</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Deja en blanco para mantener sin cambios"
              />
            </Form.Group>
            <Form.Group id="picture">
              <Form.Label>Cambiar foto de perfil</Form.Label>
              <Form.Control
                type="file"
                name="profilePic"
                onChange={(event) => {
                  setSelectedImage(event.target.files[0]);
                }}
                placeholder="Deja en blanco para mantener sin cambios"
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
              {picProfile && <span>imagen cargada:</span>}
              <br />
              <Image
                style={{ width: 200 }}
                cloudName={REACT_APP_CLOUDINARY_CLOUDNAME}
                publicId={picProfile}
              />
            </Form.Group>
            <Button className="w-100" disabled={loading} type='submit'>
              Actualizar
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Volver a Inicio</Link>
      </div>
    </>
  );
}
