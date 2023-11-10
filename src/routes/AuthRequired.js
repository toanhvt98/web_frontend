import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRequired({ children, ...rest }) {
  const { isAuthenticated, isInitialize } = useAuth();
  if (isInitialize) {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  }
  return children;
}
