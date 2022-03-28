import * as React from 'react';
import AccountView from './../accountview.js'
import { useAuth } from "../../contexts/AuthContext";
import { FaUserAlt } from 'react-icons/fa';
import { IoMenuSharp } from 'react-icons/io5';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar, Container, Nav, Button, Breadcrumb } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css'


export default function NavBar() {
  let [open, setOpen] = React.useState(false)
  let navigate = useNavigate()


  const { user, currentUser } = useAuth();

  return (
    <React.Fragment>
      <Navbar className="navbar_hm" fixed="top" >
        <Container>
          <Navbar.Brand ><Link style={{ textDecoration: "none", color: "white" }} to="/">{currentUser && user?.rol === "admin" ? `Admin: @${user.nombre}` : "Y el logo?"}</Link></Navbar.Brand>
          <Nav className="me-end btn_menu_nav">
            {currentUser ? <AccountView /> :
              <Button bsPrefix="btn_navbar_actions account_btn_navbar" onClick={(e) => navigate('/login')}>
                <FaUserAlt />
              </Button>
            }
            <Button bsPrefix="btn_navbar_actions menu_btn" onClick={(e) => setOpen(!open)}  >
              <IoMenuSharp />
            </Button>
          </Nav>
        </Container>
        {open ? <Breadcrumb className="nav_link_bar_bottom" >
          <Breadcrumb.Item active ><Link className="link_nav_items" to="/">Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item active ><Link className="link_nav_items" to="/productpage">Products</Link></Breadcrumb.Item>
          <Breadcrumb.Item active ><Link className="link_nav_items" to="/about">About Us</Link></Breadcrumb.Item>
          {user?.rol === "admin" && <Breadcrumb.Item active ><Link className="link_nav_items" to="/admin">Admin</Link></Breadcrumb.Item>}
        </Breadcrumb> : null}
      </Navbar>
    </React.Fragment>)

}