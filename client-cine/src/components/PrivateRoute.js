/*import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Dashboard from "./Dashboard";

import CreateActor from "./CreateActor/CreateActor.jsx";
import CreateGenre from "./CreateGenre/CreateGenre.jsx";
import CreateMovies from "./CreateMovies/CreateMovies.js";
import Admin from './AdminPanel/Admin.jsx';



export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return currentUser ? <Component /> : <Navigate to="/login" />;
}*/


import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Dashboard from "./Dashboard";

export default function PrivateRoute({rol: Rol, component: Component, ...rest }) {
  const { user, currentUser } = useAuth();
  console.log('soy user', Rol)

  return <>{user.rol === `${Rol}` ? <Component /> : <Navigate to="/" />}</>;
}
