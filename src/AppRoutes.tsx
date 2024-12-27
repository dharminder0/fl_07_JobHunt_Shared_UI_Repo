import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import OnBoarding from "./components/pages/boarding/OnBoarding";
import VendorDashboard from "./components/pages/vendor/VendorDashboard";
import CompanyDashboard from "./components/pages/company/CompanyDashboard";
import FindClients from "./components/pages/company/FindClients";
import Messages from "./components/pages/company/Messages";
import VndRequirements from "./components/pages/vendor/requirements/VndRequirements";
import VndClients from "./components/pages/vendor/clients/VndClients";
import RequirementDetails from "./components/pages/company/requirements/RequirementDetails";
import NotFound from "./components/pages/NotFound/NotFound";
import VendorCompanyDetails from "./components/pages/company/my-vendors/VendorCompanyDetails";
import VendorDetails from "./components/pages/company/find-vendors/VendorDetails";
import VendorOnboarding from "./components/pages/company/onboarding/VendorOnboarding";
import MyRequirements from "./components/pages/company/requirements/MyRequirements";
import MyVendors from "./components/pages/company/my-vendors/MyVendors";
import FindVendors from "./components/pages/company/find-vendors/FindVendors";
import VndBench from "./components/pages/vendor/bench/VndBench";
import VndSearchClients from "./components/pages/vendor/clients/VndSearchClients";
import MyCandidates from "./components/pages/company/candidates/MyCandidates";
import UserDetails from "./components/pages/user/UserDetails";
import VndRequirementDetails from "./components/pages/vendor/requirements/VndRequirementDetails";
import VndCandidates from "./components/pages/vendor/candidates/VndCandidates";
import ClientOnboarding from "./components/pages/vendor/onboarding/ClientOnboarding";
import VndClientDetails from "./components/pages/vendor/clients/VndClientDetails";
import Clients from "./components/pages/company/clients/Clients";
import ClientDetails from "./components/pages/company/clients/ClientDetails";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import OrganizationProfile from "./components/pages/settings/OrganizationProfile";
import Subscriptions from "./components/pages/settings/Subscriptions";
import Members from "./components/pages/settings/Members";
import BenchPreview from "./components/pages/vendor/bench/BenchPreview";

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
        <Route
          path="/company"
          element={<ProtectedRoute allowedRoles={["company"]} />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<CompanyDashboard />} />
          <Route path="myrequirements">
            <Route index element={<MyRequirements />} />{" "}
            {/* List all applications */}
            <Route path=":id" element={<RequirementDetails />} />{" "}
            {/* View specific application */}
          </Route>
          <Route path="myvendors">
            <Route index element={<MyVendors />} />{" "}
            {/* List all applications */}
            <Route path=":id" element={<VendorCompanyDetails />} />{" "}
            {/* View specific application */}
          </Route>
          <Route path="findvendors">
            <Route index element={<FindVendors />} />{" "}
            {/* List all applications */}
            <Route path=":id" element={<VendorDetails />} />{" "}
            {/* View specific application */}
          </Route>
          <Route path="findclients" element={<FindClients />} />
          <Route path="clients">
            <Route index element={<Clients />} />
            <Route path=":id" element={<ClientDetails />} />
          </Route>
          <Route path="vndonboarding" element={<VendorOnboarding />} />
          <Route path="candidates" element={<MyCandidates />} />
          <Route path="profile" element={<OrganizationProfile />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="members" element={<Members />} />
          <Route path="account" element={<UserDetails />} />
          <Route path="messages" element={<Messages />} />
        </Route>

        {/* Vendor Layout */}
        <Route
          path="/vendor"
          element={<ProtectedRoute allowedRoles={["vendor"]} />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<VendorDashboard />} />
          <Route path="messages" element={<Messages />} />
          <Route path="requirements">
            <Route index element={<VndRequirements />} />
            {/* List all applications */}
            <Route path=":id" element={<VndRequirementDetails />} />
            {/* View specific application */}
          </Route>
          <Route path="bench">
            <Route index element={<VndBench />} />
            <Route path=":id" element={<BenchPreview />} />
          </Route>
          <Route path="candidate" element={<VndCandidates />} />
          <Route path="clients">
            <Route index element={<VndClients />} />
            <Route path=":id" element={<VndClientDetails />} />
          </Route>
          <Route path="searchclient">
            <Route index element={<VndSearchClients />} />
            <Route path=":id" element={<VendorCompanyDetails />} />
          </Route>
          <Route path="onboarding" element={<ClientOnboarding />} />
          <Route path="profile" element={<OrganizationProfile />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="members" element={<Members />} />
          <Route path="account" element={<UserDetails />} />
        </Route>

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
}
