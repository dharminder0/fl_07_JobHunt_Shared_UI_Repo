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
import CompanyLayout from "./layouts/CompanyLayout.tsx";
import VendorLayout from "./layouts/VendorLayout.tsx";
import VendorDashboard from "./pages/vendor/VendorDashboard.tsx";
import CompanyDashboard from "./pages/company/CompanyDashboard.tsx";
// import MyApplications from "./pages/company/MyApplications.tsx";
import MyClients from "./pages/company/MyClients.tsx";
import FindClients from "./pages/company/FindClients.tsx";
import Messages from "./pages/company/Messages.tsx";
import FindRequirements from "./pages/company/FindRequirements.tsx";
import MyApplications from "./pages/company/MyApplications.tsx";
import VndMyApplications from "./pages/vendor/VndMyApplications.tsx";
import FindJobs from "./pages/vendor/FindJobs.tsx";
import BrowseCommpany from "./pages/vendor/BrowseCommpany.tsx";
import VndProfile from "./pages/vendor/VndProfile.tsx";
import RequirementDetails from "../pages/dashboard/requirements/RequirementDetails.tsx";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/onboard" element={<OnBoarding />} />
        <Route path="/company" element={<CompanyLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<CompanyDashboard />} />
          <Route path="myapp" element={<MyApplications />} />
          <Route path="findrequirements" element={<FindRequirements />} />
          <Route path="myclients" element={<MyClients />} />
          <Route path="findclients" element={<FindClients />} />
          <Route path="messages" element={<Messages />} />
        </Route>
        <Route path="/vendor" element={<VendorLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<VendorDashboard />} />
          <Route path="messages" element={<Messages />} />
          <Route path="myapp" element={<VndMyApplications />} />
          <Route path="findjobs" element={<FindJobs />} />
          <Route path="browsecompany" element={<BrowseCommpany />} />
          <Route path="myprofile" element={<VndProfile />} />
        </Route>
        <Route path="/dashboard" element={<DashboardNav />} />
        <Route path="/job/:id" element={<RequirementDetails />} />
      </Routes>
    </Router>

  );
}
