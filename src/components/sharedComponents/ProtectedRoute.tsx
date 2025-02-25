import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import DashboardLayoutBasic from "../layouts/DashboardLayoutBasic";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const role = JSON.parse(localStorage.getItem("role") || "[]");

  // Check if user is logged in and has at least one matching role
  const hasAccess =
    userData &&
    userData?.isVerified &&
    isLoggedIn &&
    role.some((r: string) => allowedRoles.includes(r));

  return hasAccess ? <Layout /> : <Navigate to="/login" replace />;
  // return hasAccess ? <DashboardLayoutBasic /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
