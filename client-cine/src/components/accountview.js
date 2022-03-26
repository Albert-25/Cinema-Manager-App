import React, { useState } from "react";
import { Image,Dropdown } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import './accountview.css'
let iconAuxiliar="https://png.pngtree.com/element_our/20190522/ourlarge/pngtree-little-yellow-chicken-cartoon-avatar-logo-icon-image_1075898.jpg"
export default function AccountView() {
  const [error, setError] = useState("");
  let { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      if(!user?.rol){
        navigate("/");
      }else if(user?.rol){
        navigate('/login')
      }
    } catch {
      setError("Failed to Log out");
    }
  }
  console.log(user)
  return (
    <>
      <Dropdown className="drop_account_container">
         <Dropdown.Toggle bsPrefix  variant="primary" id="dropdown-basic" >
           <Image  className="image_account" fluid={true} src={user?.imagen||iconAuxiliar}/>
         </Dropdown.Toggle>
         <Dropdown.Menu>
           <Dropdown.Item onClick={()=>navigate('/update-profile')}>update profile</Dropdown.Item>
           <Dropdown.Item  onClick={handleLogout}>logout</Dropdown.Item>
           </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
