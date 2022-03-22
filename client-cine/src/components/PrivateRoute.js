import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Dashboard from "./Dashboard";
import CreateActor from "./CreateActor/CreateActor.jsx";


export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return currentUser ? <Dashboard/> : <Navigate to="/login" />;
}
