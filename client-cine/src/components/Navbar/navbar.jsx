import * as React from "react";
import AccountView from "./../accountview.js";
import { useAuth } from "../../contexts/AuthContext";
import { FaUserAlt } from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";

export default function NavBar() {
   let [open, setOpen] = React.useState(false);
   let navigate = useNavigate();

   const { user, currentUser } = useAuth();

   return (
      <React.Fragment>
         <Navbar className="navbar_hm" fixed="top">
            <Container>
               <Navbar.Brand>
                  <Link
                     style={{ textDecoration: "none", color: "white" }}
                     to="/"
                  >
                     {currentUser && user?.rol === "admin"
                        ? `Admin: @${user.nombre}`
                        : <img src='https://cdn-icons-png.flaticon.com/512/2809/2809590.png' alt='' style={{width: '2vw'}} /> }
                  </Link>
               </Navbar.Brand>
               <Nav className="me-end btn_menu_nav">
                  {currentUser ? (
                     <AccountView />
                  ) : (
                     <Button
                        bsPrefix="btn_navbar_actions account_btn_navbar"
                        onClick={(e) => navigate("/login")}
                     >
                        <FaUserAlt />
                     </Button>
                  )}
                  <Button
                     bsPrefix="btn_navbar_actions menu_btn"
                     onClick={(e) => setOpen(!open)}
                  >
                     <IoMenuSharp />
                  </Button>
               </Nav>
            </Container>
            {open ? (
               <Nav
                  defaultActiveKey="/home"
                  as="ul"
                  className="nav_link_bar_bottom"
               >
                  <Nav.Item as="li">
                     <Link className="link_nav_items" to="/">
                        Home
                     </Link>
                  </Nav.Item>
                  /
                  <Nav.Item as="li">
                     <Link className="link_nav_items" to="/productpage">
                        Products
                     </Link>
                  </Nav.Item>
                  /
                  {user?.rol === "admin" && (
                     <Nav.Item as="li">
                        <Link className="link_nav_items" to="/admin">
                           Admin
                        </Link>
                     </Nav.Item>
                  )}
                  {user?.rol === "admin" && "/"}
                  <Nav.Item as="li">
                     <Link className="link_nav_items" to="/about">
                        About
                     </Link>
                  </Nav.Item>
                  /
                  <Nav.Item as="li">
                     <Link className="link_nav_items" to="/cart">
                        Cart
                     </Link>
                  </Nav.Item>
               </Nav>
            ) : null}
         </Navbar>
      </React.Fragment>
   );

   return (
      <React.Fragment>
         <Navbar className="navbar_hm" fixed="top">
            <Container>
               <Navbar.Brand>
                  <Link
                     style={{ textDecoration: "none", color: "white" }}
                     to="/"
                  >
                     {currentUser && user?.rol === "admin"
                        ? `Admin: @${user.nombre}`
                        : "Y el logo?"}
                  </Link>
               </Navbar.Brand>
               {open ? (
                  <Nav
                     defaultActiveKey="/home"
                     as="ul"
                     className="nav_link_bar_bottom"
                  >
                     <Nav.Item as="li">
                        <Link className="link_nav_items" to="/">
                           Home
                        </Link>
                     </Nav.Item>
                     /
                     <Nav.Item as="li">
                        <Link className="link_nav_items" to="/productpage">
                           Products
                        </Link>
                     </Nav.Item>
                     /
                     {user?.rol === "admin" && (
                        <Nav.Item as="li">
                           <Link className="link_nav_items" to="/admin">
                              Admin
                           </Link>
                        </Nav.Item>
                     )}
                     {user?.rol === "admin" && "/"}
                     <Nav.Item as="li">
                        <Link className="link_nav_items" to="/about">
                           About
                        </Link>
                     </Nav.Item>
                     /
                     <Nav.Item as="li">
                        <Link className="link_nav_items" to="/cart">
                           Cart
                        </Link>
                     </Nav.Item>
                  </Nav>
               ) : null}
               <Nav className="me-end btn_menu_nav">
                  {currentUser ? (
                     <AccountView />
                  ) : (
                     <Button
                        bsPrefix="btn_navbar_actions account_btn_navbar"
                        onClick={(e) => navigate("/login")}
                     >
                        <FaUserAlt />
                     </Button>
                  )}
                  <Button
                     bsPrefix="btn_navbar_actions menu_btn"
                     onClick={(e) => setOpen(!open)}
                  >
                     <IoMenuSharp />
                  </Button>
               </Nav>
            </Container>
         </Navbar>
      </React.Fragment>
   );

   /* return (
      <React.Fragment>
         <Navbar className="navbar_hm" fixed="top">
            <Container style={{ height: "100%" }}>
               <Navbar.Brand>
                  <Link
                     style={{ textDecoration: "none", color: "white" }}
                     to="/"
                  >
                     {currentUser && user?.rol === "admin"
                        ? `Admin: @${user.nombre}`
                        : "Y el logo?"}
                  </Link>
               </Navbar.Brand>
               {open ? (
                  <Nav
                     defaultActiveKey="/home"
                     as="ul"
                     className="nav_link_bar_bottom"
                  >
                     <Nav.Item as="li">
                        <Link className="link_nav_items" to="/">
                           Home
                        </Link>
                     </Nav.Item>
                     /
                     <Nav.Item as="li">
                        <Link className="link_nav_items" to="/productpage">
                           Products
                        </Link>
                     </Nav.Item>
                     /
                     {user?.rol === "admin" && (
                        <Nav.Item as="li">
                           <Link className="link_nav_items" to="/admin">
                              Admin
                           </Link>
                        </Nav.Item>
                     )}
                     {user?.rol === "admin" && "/"}
                     <Nav.Item as="li">
                        <Link className="link_nav_items" to="/about">
                           About
                        </Link>
                     </Nav.Item>
                  </Nav>
               ) : null}
               <Nav className="me-end btn_menu_nav">
                  {currentUser ? (
                     <AccountView />
                  ) : (
                     <Button
                        bsPrefix="btn_navbar_actions account_btn_navbar"
                        onClick={(e) => navigate("/login")}
                     >
                        <FaUserAlt />
                     </Button>
                  )}
                  <Button
                     bsPrefix="btn_navbar_actions menu_btn"
                     onClick={(e) => setOpen(!open)}
                  >
                     <IoMenuSharp />
                  </Button>
               </Nav>
            </Container>
         </Navbar>
      </React.Fragment>
   ); */
}
