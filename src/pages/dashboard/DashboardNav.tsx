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
import DashboardPage from "./DashboardPage.tsx";
import Messages from "./Messages.tsx";
import DashboardTopNav from "../../components/DashboardTopNav.tsx";
import MyApplications from "./MyApplications.tsx";
import FindRequirements from "./FindRequirements.tsx";
import MyClients from "./MyClients.tsx";
import FindClients from "./FindClients.tsx";

export default function DashboardNav() {
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

  const menuItem = [
    { text: "Dashboard", icon: <DashboardIcon />, id: 0 },
    { text: "My Requirements", icon: <WorkIcon />, id: 1 },
    { text: "My vendors", icon: <PersonIcon />, id: 2 },
    { text: "Find vendors", icon: <WorkIcon />, id: 3 },
    { text: "Messages", icon: <MessageIcon />, id: 4 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <DashboardPage />;
      case 1:
        return <MyApplications />;
      case 2:
        return <FindRequirements />;
      case 3:
        return <MyClients />;
      case 4:
        return <FindClients />;
      case 5:
        return <Messages />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-gray-50 p-4 h-screen w-80">
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.id}
              onClick={() => setActiveTab(item.id)} // Update active tab state
              className={`rounded-lg cursor-pointer ${
                activeTab === item.id ? "bg-blue-200" : "hover:bg-blue-100"
              }`}
            >
              <ListItemIcon className="text-blue-500">{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
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
