import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import DashboardPage from "../pages/dashboard/DashboardPage";
import FindClients from "../pages/dashboard/FindClients";
import MyRequirements from "./pages/company/requirements/MyRequirements";
import MyVendors from "./pages/company/my-vendors/MyVendors";
import FindVendors from "./pages/company/find-vendors/FindVendors";

const Sidebar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, id: 0 },
    { text: "My Applications", icon: <WorkIcon />, id: 1 },
    { text: "Find requirements", icon: <PersonIcon />, id: 2 },
    { text: "My Clients", icon: <WorkIcon />, id: 3 },
    { text: "Find Clients", icon: <EventIcon />, id: 4 },
    { text: "Messages", icon: <MessageIcon />, id: 5 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <DashboardPage />;
      case 1:
        return <MyRequirements />;
      case 2:
        return <MyVendors />;
      case 3:
        return <FindVendors />;
      case 4:
        return <FindClients />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4">
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.id}
              onClick={() => setActiveTab(item.id)} // Update active tab state
              className={`rounded-lg ${activeTab === item.id ? "bg-blue-200" : "hover:bg-blue-100"
                }`}
            >
              <ListItemIcon className="text-blue-500">{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">{renderContent()}</div>
    </div>
  );
};

export default Sidebar;
