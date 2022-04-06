import React from "react";
import { Image, Dropdown } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import './accountview.css'
import Swal from "sweetalert2"
let iconAuxiliar = "https://png.pngtree.com/element_our/20190522/ourlarge/pngtree-little-yellow-chicken-cartoon-avatar-logo-icon-image_1075898.jpg"
export default function AccountView() {
  let { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      if (!user?.rol) {
        navigate("/");
        setTimeout(() => window.location.reload(), 1000)
      } else if (user?.rol) {
        navigate('/')
        setTimeout(() => window.location.reload(), 1000)
      }
    } catch {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Fallo al desloguear!',
        showConfirmButton: false,
        timer: 1000
      })
    }
  }
  return (
    <>
      <Dropdown className="drop_account_container">
        <Dropdown.Toggle bsPrefix variant="primary" id="dropdown-basic" >
          <Image className="image_account" fluid={true} src={user?.imagen || iconAuxiliar} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => navigate('/update-profile')}>update profile</Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
