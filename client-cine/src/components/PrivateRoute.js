import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export default function PrivateRoute({
  rol: Rol,
  component: Component,
  ...rest
}) {
  const { user, currentUser } = useAuth();
  console.log("soy user", user.role,currentUser.role);

  return <>{currentUser?.role? <Component /> : <Navigate to="/" />}</>;
}
