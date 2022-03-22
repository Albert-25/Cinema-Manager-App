import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import UpdateProfile from "./UpdateProfile";

export default function PrivateUpdate({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return currentUser ? <UpdateProfile /> : <Navigate to="/login" />;
}
