import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Dashboard from "./Dashboard";

export default function PrivateRoute({
  rol: Rol,
  component: Component,
  ...rest
}) {
  const { user, currentUser } = useAuth();
  console.log("soy user", Rol);

  return <>{user.rol === `${Rol}` ? <Component /> : <Navigate to="/" />}</>;
}
