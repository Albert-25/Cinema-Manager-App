import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import firebaseApp from "../firebase";
import Swal from "sweetalert2";
import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

export default function Example({ show, setShow, pass }) {
  const { currentUser } = useAuth();
  const auth = getAuth(firebaseApp);
  const finales = auth.currentUser;
  const navigate = useNavigate();
  let credential = "";
  const [passAuth, setPassAuth] = useState("");

  const handleClose = () => setShow(false);

  function handleChange(e) {
    setPassAuth(e);
  }
  function handleOnSubmit(e) {
    e.preventDefault();

    credential = EmailAuthProvider.credential(finales.email, passAuth);
    //const result =
    reauthenticateWithCredential(finales, credential)
      .then(() => {
        updatePassword(currentUser, pass)
          .then(() => {
            Swal.fire({
              title: "¿Quieres guardar los cambios?",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Guardar",
              denyButtonText: `No guardar`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                Swal.fire(
                  "Contraseña restablecida correctamente",
                  "",
                  "success"
                );
                navigate("/");
              } else if (result.isDenied) {
                Swal.fire(
                  "Asegurate que los datos sean correctos",
                  "",
                  "error"
                );
              }
            });
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((error) => {
        Swal.fire("Esa contraseña no es correcta", "", "error");
      });
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Card>
          <Card.Body>
            <Modal.Header closeButton>
              <Modal.Title>Actualizar contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>Ingresa la contraseña actual!</Modal.Body>
            <form onSubmit={handleOnSubmit}>
              <Form.Control
                type="password"
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Ingresar contraseña"
              />

              <Button
                className="w-100"
                style={{ marginTop: "1rem" }}
                type="submit"
              >
                Update
              </Button>
            </form>
            <Modal.Footer></Modal.Footer>
          </Card.Body>
        </Card>
      </Modal>
    </>
  );
}
