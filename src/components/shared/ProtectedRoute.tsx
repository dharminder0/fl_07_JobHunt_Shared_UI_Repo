import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../layouts/Layout";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = JSON.parse(localStorage.getItem("role") || "[]");

  // Check if user is logged in and has at least one matching role
  const hasAccess =
    isLoggedIn && role.some((r: string) => allowedRoles.includes(r));

  return hasAccess ? <Layout /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
