import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import DashboardPage from "./DashboardPage";
import Messages from "./Messages";
import DashboardTopNav from "../../components/DashboardTopNav";
import MyApplications from "./MyApplications";
import FindRequirements from "./FindRequirements";
import MyClients from "./MyClients";
import FindClients from "./FindClients";
import MyRequirements from "./requirements/MyRequirements";
import MyVendors from "./company-vendors/MyVendors";
import FindVendors from "./company-vendors/FindVendors";
import VendorCompanyDetails from "./company-vendors/VendorCompanyDetails";

export default function DashboardNav() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  const vendorItems = [
    { id: 0, text: "Dashboard", icon: <DashboardIcon />, isVendor: true },
    { id: 1, text: "My Applications", icon: <WorkIcon />, isVendor: true },
    { id: 2, text: "Find requirements", icon: <PersonIcon />, isVendor: true },
    { id: 3, text: "My Clients", icon: <WorkIcon />, isVendor: true },
    { id: 4, text: "Find Clients", icon: <EventIcon />, isVendor: true },
    { id: 5, text: "Messages", icon: <MessageIcon />, isVendor: true },
    { id: 6, text: "Dashboard", icon: <DashboardIcon />, isVendor: false },
    { id: 7, text: "My Requirements", icon: <WorkIcon />, isVendor: false },
    { id: 8, text: "My vendors", icon: <PersonIcon />, isVendor: false },
    { id: 9, text: "Find vendors", icon: <WorkIcon />, isVendor: false },
    { id: 10, text: "Messages", icon: <MessageIcon />, isVendor: false },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 6:
        return <DashboardPage />;
      case 7:
        return <MyRequirements />;
      case 8:
        return <MyVendors />;
      case 9:
        return <VendorCompanyDetails />;
      case 10:
        return <FindClients />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-gray-50 p-4 h-screen w-80">
        <List>
          {vendorItems.map(
            (item) =>
              item.isVendor === false && (
                <ListItem
                  key={item.id}
                  onClick={() => setActiveTab(item.id)} // Update active tab state
                  className={`rounded-lg cursor-pointer ${activeTab === item.id ? "bg-blue-200" : "hover:bg-blue-100"
                    }`}
                >
                  <ListItemIcon className="text-blue-500">
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              )
          )}
        </List>
      </div>

      {/* Main Content */}
      <div className="w-full">
        <DashboardTopNav />
        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
}
