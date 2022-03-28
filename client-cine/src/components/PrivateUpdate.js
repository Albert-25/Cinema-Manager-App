
import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export default function PrivateUpdate({rol: Rol, component: Component, ...rest }) {
  const { user, currentUser } = useAuth();

  return <>{currentUser ? <Component /> : <Navigate to="/login" />}</>;
}
