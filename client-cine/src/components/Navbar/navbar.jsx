import * as React from 'react';
//import CallFormCtrl from './../signInForm/formOpenControll.jsx'
//import {Link} from 'react-router-dom';
// imports react-bootstrap
import { useAuth } from "../../contexts/AuthContext";
import {FaUserAlt} from 'react-icons/fa'
import {IoMenuSharp} from 'react-icons/io5'
import {Navbar,Container,Nav,NavDropdown,Button,Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css'

let Invitado = {
  uid: 9999999,
  nombre: "Invitado",
  email: "aaaaaaaaaaa@gmail.com",
  password: "abcdefgh",
  rol: "user",
}



export default function NavBar(){

  const { user, currentUser } = useAuth();
    console.log(user)
    if (user === null){
      user = Invitado
    }
  return(
    <React.Fragment>
    <Navbar className="navbar_hm" fixed="top">
    <Container>
    <Navbar.Brand >Navbar</Navbar.Brand>
    <Nav className="me-end btn_menu_nav">
    <p>Hola {user.nombre || "invitado"}</p>
      <Button bsPrefix="btn_navbar_actions account_btn_navbar" >
      <img className='profilePic' src={user.imagen} alt='' />
        <FaUserAlt/>
      </Button>
      <Button bsPrefix="btn_navbar_actions menu_btn" >
        <IoMenuSharp />
      </Button>
    </Nav>
    </Container>
  </Navbar>
    </React.Fragment>)

}