import React, {  useState } from "react";
import {  Modal } from "react-bootstrap";
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



export default function Example({show, setShow, pass}){
  const { currentUser} = useAuth();
   const auth = getAuth(firebaseApp);
  const finales = auth.currentUser;
    const navigate = useNavigate();
  let credential = '';
      const [passAuth, setPassAuth] = useState('');

     const handleClose = () => setShow(false);


 
  function handleChange(e){
    setPassAuth(e)
}
function handleOnSubmit(e){
  e.preventDefault()

  credential = EmailAuthProvider.credential(finales.email, passAuth)
//const result = 
    reauthenticateWithCredential(finales, credential).then(() => {
            updatePassword(currentUser, pass).then(() => {
               Swal.fire({
            title: "¿Quieres guardar los cambios?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `No guardar`,
         }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              

               Swal.fire("Contraseña restablecida correctamente", "", "success");
               navigate('/')

            } else if (result.isDenied) {
               Swal.fire("Asegurate que los datos sean correctos", "", "error");
            }
         });
      }).catch((e) => {
        console.log('Cielos :C', e)
      })
    }).catch((error) => {
      Swal.fire("Esa contraseña no es correcta", "", "d");
    })
}
  return(
    <>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>Ingresa tu contraseña actual!</Modal.Body>
        <form onSubmit={handleOnSubmit}>

        <input name='passwordAuthInput' type='text' placeholder='Ingresar contraseña' onChange={(e) => handleChange(e.target.value)} />
  
        <button>Submit</button>
        </form>
        <Modal.Footer>
        
        </Modal.Footer>
      </Modal>
    </>
    );
};