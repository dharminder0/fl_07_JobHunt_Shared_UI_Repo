import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import OnBoarding from "./pages/boarding/OnBoarding";
import VendorDashboard from "./components/pages/vendor/VendorDashboard";
import CompanyDashboard from "./components/pages/company/CompanyDashboard";
// import MyApplications from "./pages/company/MyApplications";
import MyClients from "./components/pages/company/MyClients";
import FindClients from "./components/pages/company/FindClients";
import Messages from "./components/pages/company/Messages";
import FindRequirements from "./components/pages/company/FindRequirements";
import MyApplications from "./components/pages/company/requirements/MyApplications";
import VndMyApplications from "./components/pages/vendor/VndMyApplications";
import FindJobs from "./components/pages/vendor/FindJobs";
import BrowseCommpany from "./components/pages/vendor/BrowseCommpany";
import VndProfile from "./components/pages/vendor/VndProfile";
import RequirementDetails from "./pages/dashboard/requirements/RequirementDetails";
import Layout from "./components/layouts/Layout";
import VendorCompanyDetails from "./pages/dashboard/company-vendors/VendorCompanyDetails";
import NotFound from "./components/pages/NotFound/NotFound";

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
        <Route path="/company" element={<Layout />}>
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
