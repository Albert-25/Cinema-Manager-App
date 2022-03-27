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
  console.log(user)
  return (
    <>
      <Dropdown>
         <Dropdown.Toggle variant="success" id="dropdown-basic">
           {/* {user.nombre} */}
         </Dropdown.Toggle>
         <Dropdown.Menu>
           <Dropdown.Item onClick={()=>navigate('/update-profile')}>update profile</Dropdown.Item>
           <Dropdown.Item  onClick={handleLogout}>logout</Dropdown.Item>
           </Dropdown.Menu>
      </Dropdown>

      {/*<Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong>
          {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log out
        </Button>
      </div>*/}
    </>
  );
}
