import * as React from 'react';
//import CallFormCtrl from './../signInForm/formOpenControll.jsx'
import AccountView from './../accountview.js'
import { useAuth } from "../../contexts/AuthContext";
import {FaUserAlt} from 'react-icons/fa';
import {IoMenuSharp} from 'react-icons/io5';
import {useNavigate} from 'react-router-dom';
import {Navbar,Container,Nav,NavDropdown,Button,Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css'





export default function NavBar(){
  let {currentUser}= useAuth()
  let navigate= useNavigate()
  console.log(currentUser)
  return(
    <React.Fragment>
    <Navbar className="navbar_hm" fixed="top">
    <Container>
    <Navbar.Brand >Navbar</Navbar.Brand>
    <Nav className="me-end btn_menu_nav">
      {currentUser? <AccountView/>:
        <Button bsPrefix="btn_navbar_actions account_btn_navbar" onClick={(e)=>navigate('/login')}>
           <FaUserAlt/>
         </Button>
      }
      <Button bsPrefix="btn_navbar_actions menu_btn" >
        <IoMenuSharp />
      </Button>
    </Nav>
    </Container>
  </Navbar>
    </React.Fragment>)

}