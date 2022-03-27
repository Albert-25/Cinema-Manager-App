import React, { useState } from "react";
import { Card, Button, Alert,Dropdown } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

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
      }else if(user.rol){
        navigate('/login')
      }
    } catch {
      setError("Failed to Log out");
    }
  }
  return (
    <>
      <Dropdown>
         <Dropdown.Toggle variant="success" id="dropdown-basic">
         </Dropdown.Toggle>
         <Dropdown.Menu>
           <Dropdown.Item onClick={()=>navigate('/update-profile')}>update profile</Dropdown.Item>
           <Dropdown.Item  onClick={handleLogout}>logout</Dropdown.Item>
           </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
