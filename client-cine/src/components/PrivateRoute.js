import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export default function PrivateRoute({
  rol: Rol,
  component: Component,
  ...rest
}) {
  const { user, currentUser } = useAuth();
  console.log("soy user", user);

<<<<<<< HEAD
  return <>{currentUser? <Component /> : <Navigate to="/" />}</>;
=======

  return <>{user && user.rol === `${Rol}` ? <Component /> : <Navigate to="/" />}</>;

>>>>>>> f3da80d639517f3d45f23c651fcafae5fae865d3
}
