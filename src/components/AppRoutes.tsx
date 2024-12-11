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
import VendorDashboard from "./pages/vendor/VendorDashboard.tsx";
import CompanyDashboard from "./pages/company/CompanyDashboard.tsx";
// import MyApplications from "./pages/company/MyApplications.tsx";
import MyClients from "./pages/company/MyClients.tsx";
import FindClients from "./pages/company/FindClients.tsx";
import Messages from "./pages/company/Messages.tsx";
import FindRequirements from "./pages/company/FindRequirements.tsx";
import MyApplications from "./pages/company/requirements/MyApplications.tsx";
import VndMyApplications from "./pages/vendor/VndMyApplications.tsx";
import FindJobs from "./pages/vendor/FindJobs.tsx";
import BrowseCommpany from "./pages/vendor/BrowseCommpany.tsx";
import VndProfile from "./pages/vendor/VndProfile.tsx";
import RequirementDetails from "../pages/dashboard/requirements/RequirementDetails.tsx";
import Layout from "./layouts/Layout.tsx";
import VendorCompanyDetails from "../pages/dashboard/company-vendors/VendorCompanyDetails.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route index element={<Navigate to="/login" replace />} />
        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/onboard" element={<OnBoarding />} />

        {/* Company Layout */}
        <Route path="/company" element={<Layout/>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<CompanyDashboard />} />
          <Route path="myapp">
            <Route index element={<MyApplications />} /> {/* List all applications */}
            <Route path=":id" element={<RequirementDetails />} /> {/* View specific application */}
          </Route>
          <Route path="findrequirements">
            <Route index element={<FindRequirements />} /> {/* List all applications */}
            <Route path=":id" element={<VendorCompanyDetails />} /> {/* View specific application */}
          </Route>
          <Route path="myclients">
            <Route index element={<MyClients />} /> {/* List all applications */}
            <Route path=":id" element={<VendorCompanyDetails />} /> {/* View specific application */}
          </Route>
          <Route path="findclients" element={<FindClients />} />
          <Route path="messages" element={<Messages />} />
        </Route>

        {/* Vendor Layout */}
        <Route path="/vendor" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<VendorDashboard />} />
          <Route path="messages" element={<Messages />} />
          <Route path="myapp" element={<VndMyApplications />} />
          <Route path="findjobs" element={<FindJobs />} />
          <Route path="browsecompany" element={<BrowseCommpany />} />
          <Route path="myprofile" element={<VndProfile />} />
        </Route>

        {/* Shared Routes */}
        <Route path="/dashboard" element={<Navigate to="/company/dashboard" replace />} />
        <Route path="/job/:id" element={<RequirementDetails />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
}
