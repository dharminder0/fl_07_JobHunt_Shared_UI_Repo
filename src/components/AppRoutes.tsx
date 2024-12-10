import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../pages/auth/Login.tsx";
import SignUp from "../pages/auth/SignUp.tsx";
import OnBoarding from "../pages/boarding/OnBoarding.tsx";
import DashboardNav from "../pages/dashboard/DashboardNav.tsx";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/onboard" element={<OnBoarding />} />
        <Route path="/dashboard" element={<DashboardNav />} />
      </Routes>
    </Router>
  );
}
