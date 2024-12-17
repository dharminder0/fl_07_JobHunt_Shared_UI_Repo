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
import FindClients from "./components/pages/company/FindClients";
import Messages from "./components/pages/company/Messages";
import VndRequirements from "./components/pages/vendor/requirements/VndRequirements";
import VndClients from "./components/pages/vendor/clients/VndClients";
import VndProfile from "./components/pages/vendor/settings/VndProfile";
import RequirementDetails from "./components/pages/company/requirements/RequirementDetails";
import Layout from "./components/layouts/Layout";
import NotFound from "./components/pages/NotFound/NotFound";
import VendorCompanyDetails from "./components/pages/company/my-vendors/VendorCompanyDetails";
import VendorDetails from "./components/pages/company/find-vendors/VendorDetails";
import VendorOnboarding from "./components/pages/company/onboarding/VendorOnboarding";
import MyRequirements from "./components/pages/company/requirements/MyRequirements";
import MyVendors from "./components/pages/company/my-vendors/MyVendors";
import FindVendors from "./components/pages/company/find-vendors/FindVendors";
import CompanyProfile from "./components/pages/company/settings/CompanyProfile";
import Settings from "./components/pages/company/settings/Settings";
import VndBench from "./components/pages/vendor/bench/VndBench";
import VndSearchClients from "./components/pages/vendor/clients/VndSearchClients";
import VndSettings from "./components/pages/vendor/VndSettings";
import Subscriptions from "./components/pages/company/settings/Subscriptions";
import Members from "./components/pages/company/settings/Members";
import MyCandidates from "./components/pages/company/candidates/MyCandidates";
import UserDetails from "./components/pages/company/accounts/UserDetails";
import VndRequirementDetails from "./components/pages/vendor/requirements/VndRequirementDetails";
import VndCandidates from "./components/pages/vendor/candidates/VndCandidates";
import ClientOnboarding from "./components/pages/vendor/onboarding/ClientOnboarding";
import VndUserDetails from "./components/pages/vendor/account/VndUserDetails";
import VndClientDetails from "./components/pages/vendor/clients/VndClientDetails";
import VndSubscriptions from "./components/pages/vendor/settings/VndSubscriptions";
import VndMembers from "./components/pages/vendor/settings/VndMembers";
import Clients from "./components/pages/company/clients/Clients";
import ClientDetails from "./components/pages/company/clients/ClientDetails";

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
          <Route path="myrequirements">
            <Route index element={<MyRequirements />} /> {/* List all applications */}
            <Route path=":id" element={<RequirementDetails />} /> {/* View specific application */}
          </Route>
          <Route path="myvendors">
            <Route index element={<MyVendors />} /> {/* List all applications */}
            <Route path=":id" element={<VendorCompanyDetails />} /> {/* View specific application */}
          </Route>
          <Route path="findvendors">
            <Route index element={<FindVendors />} /> {/* List all applications */}
            <Route path=":id" element={<VendorDetails />} /> {/* View specific application */}
          </Route>
          <Route path="findclients" element={<FindClients />} />
          <Route path="clients">
            <Route index element={<Clients />} />
            <Route path=":id" element={<ClientDetails />} /> 
          </Route>
          <Route path="vndonboarding" element={<VendorOnboarding />} />
          <Route path="candidates" element={<MyCandidates />} />
          <Route path="profile" element={<CompanyProfile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="members" element={<Members />} />
          <Route path="account" element={<UserDetails />} />
          <Route path="messages" element={<Messages />} />
        </Route>

        {/* Vendor Layout */}
        <Route path="/vendor" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<VendorDashboard />} />
          <Route path="messages" element={<Messages />} />
          <Route path="requirements">
            <Route index element={<VndRequirements />} /> {/* List all applications */}
            <Route path=":id" element={<VndRequirementDetails />} /> {/* View specific application */}
          </Route>
          <Route path="bench" element={<VndBench />} />
          <Route path="candidate" element={<VndCandidates />} />
          <Route path="clients" >
            <Route index element={<VndClients />} />
            <Route path=":id" element={<VndClientDetails />} /> 
          </Route>
          <Route path="searchclient" >
            <Route index element={<VndSearchClients />} />
            <Route path=":id" element={<VendorCompanyDetails />} />
          </Route>
          <Route path="onboarding" element={<ClientOnboarding />} />
          <Route path="profile" element={<VndProfile />} />
          <Route path="account" element={<VndUserDetails />} />
          <Route path="subscriptions" element={<VndSubscriptions />} />
          <Route path="members" element={<VndMembers />} />
          <Route path="settings" element={<VndSettings />} />
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
