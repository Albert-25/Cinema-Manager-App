import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { createUser } from "../../store/actions";

import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import { MdKeyboardBackspace } from "react-icons/md";

import { Image } from "cloudinary-react";
import { useDispatch } from "react-redux";

const { REACT_APP_CLOUDINARY_CLOUDNAME } = process.env;


export default function CreateUser() {
   const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const nombreRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState("user");
  const navigate = useNavigate();
  const [picProfile, setPicProfile] = useState("https://www.pngplay.com/wp-content/uploads/6/Film-Icon-Background-PNG-Image.png");
  const [selectedImage, setSelectedImage] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords dont match");
    }
    try {
      setError("");
      setLoading(true);
      Swal.fire("Espera mientras el usuario es creado", "", "success");
      await dispatch(createUser(
       { correo: emailRef.current.value,
               password: passwordRef.current.value,
               rol: roles,
               nombre: nombreRef.current.value,
               imagen: picProfile}
      )).then((result) => {



      Swal.fire("Usuario creado correctamente!", "", "success");
      navigate("/admin");
              
            
         });

        
      navigate("/admin");
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
        <Link to="/admin" className="position-absolute top-0 start-10">
            <Button>
               <MdKeyboardBackspace className="me-3" />
               <span>Regresar al Admin</span>
            </Button>
         </Link>
          <h2 className="text-center mb-4">Crear Usuario</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Dirección de e-mail:</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirmar contraseña:</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Group id="text">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control type="text" ref={nombreRef} required />
            </Form.Group>
          <Form.Group id="picture">
              <Form.Label>Cambiar foto de perfil:</Form.Label>
              <Form.Control
                type="file"
                name='profilePic'
                onChange={(event) => {
              setSelectedImage(event.target.files[0])
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
          <br/>
          {picProfile && <span>Imágen actual::</span>}
          <br/>
          <Image
            style={{ width: 200 }}
            cloudName={REACT_APP_CLOUDINARY_CLOUDNAME}
            publicId={picProfile}
          />
            </Form.Group>
            <div className="form-group">
            <Form.Select
                defaultValue={"DEFAULT"}
                style={{ marginTop: "1rem" }}
                name="Rol"
                onChange={(evt) => setRoles(evt.target.value)}
                required
              >
                <option className="elemSelect" value="DEFAULT" disabled>
                  Seleccionar rol:
                </option>
                <option className="elemSelect" value="admin" type="text">
                  Administrador
                </option>
                <option className="elemSelect" value="user">
                  Usuario
                </option>
              </Form.Select>
            </div>
            <Button style={{ marginTop: "1rem" }} className="w-100" disabled={loading} type="submit">
              Crear Usuario
            </Button>
          </Form>
        </Card.Body>
      </Card>

    </>
  );
}
