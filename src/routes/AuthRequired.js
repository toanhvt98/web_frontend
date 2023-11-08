import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function AuthRequired({ children }) {
  const { isAuthenticated, isInitialize } = useAuth();
  if (isInitialize) {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
  }
  return children;
}
