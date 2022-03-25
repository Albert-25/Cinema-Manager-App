import * as React from 'react';
import {Navbar,Container,Dropdown} from 'react-bootstrap'
import {FaUserAlt} from 'react-icons/fa'
import 'bootstrap/dist/css/bootstrap.min.css';
import './navAdmin.css'


//const settings = ['Profile', 'Account', 'Logout'];

const NavAdmin = () => {

  return (
    <Navbar fixed="top" className="nav_admin">
  <Container>
    <Navbar.Brand className="nav_admin_title" >Welcome  Admin</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
              <FaUserAlt/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
           </Dropdown.Menu>
        </Dropdown>
      </Navbar.Text>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
};
export default NavAdmin;