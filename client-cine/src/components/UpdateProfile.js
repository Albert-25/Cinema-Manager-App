import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Image } from "cloudinary-react";
import firebaseApp from "../firebase";
import {
  getAuth,
  EmailAuthProvider,
reauthenticateWithCredential,
reauthenticateWithPopup,
  updatePassword,
  GoogleAuthProvider,

} from "firebase/auth";
const { REACT_APP_CLOUDINARY_CLOUDNAME } = process.env;

export default function UpdateProfile() {
  const auth = getAuth(firebaseApp);
  const finales = auth.currentUser;
  const credential = EmailAuthProvider.credential(finales.email, '123123')
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef()
  const imagenRef = useRef()
  const passwordConfirmRef = useRef();
  const { user, currentUser, upPassword, updateEmail, updateName } = useAuth();
  const [error, setError] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");


  const [picProfile, setPicProfile] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState("");


  function handleSubmit(e) {
    console.log(pass)
    e.preventDefault();
    if (pass !== passConfirm) {
      return setError("Passwords dont match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (pass) {
      console.log('Iniciamos')
    const result = reauthenticateWithCredential(finales, credential).then(() => {
      console.log('lool')
      console.log('soy yo nwn', pass)
            promises.push(updatePassword(currentUser, pass).then(() => {
        console.log('listo uwu')
      }).catch((e) => {
        console.log('Cielos :C', e)
      })


        )
      console.log('terminamos nwn')
    }).catch((error) => {
      console.log('errorsD:', error)
    })



    }
    if(nameRef.current.value !== user.nombre || picProfile !== user.imagen){

      promises.push(updateName(nameRef.current.value, picProfile, user))
    }
    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        console.log('error', e)
        setError("Failed to update account");
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
          <h2 className="text-center mb-4">Update profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={e => {
                  setPass(e.target.value)
                }}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                onChange={e => {
                  setPassConfirm(e.target.value)
                }}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
             <Form.Group id="name">
              <Form.Label>Cambio de nombre</Form.Label>
              <Form.Control
                type="text"
                ref={nameRef}
                placeholder="Leave blank to keep the same"
              />
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
            <Button className="w-100" disabled={loading} type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}
