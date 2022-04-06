import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export default function PrivateRoute({
  rol: Rol,
  component: Component,
  ...rest
}) {
  const { user } = useAuth();

  return <>{user && user.rol === `${Rol}` ? <Component /> : <Navigate to="/" />}</>;


}
