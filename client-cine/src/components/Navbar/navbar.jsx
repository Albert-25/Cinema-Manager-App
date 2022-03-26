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






export default function NavBar(){

  const { user, currentUser } = useAuth();

  let imagen = 'http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png'
  let saludo = ''

  if(user && user.nombre){
    saludo = user.nombre;
  }
  if(user && user.imagen){
    imagen = user.imagen
  }

  return(
    <React.Fragment>
    <Navbar className="navbar_hm" fixed="top">
    <Container>
    <Navbar.Brand >Navbar</Navbar.Brand>
    <Nav className="me-end btn_menu_nav">
    <p>Hola {saludo}</p>
      <Button bsPrefix="btn_navbar_actions account_btn_navbar" >
      <img className='profilePic' src={imagen} alt='' />
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