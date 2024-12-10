import React from 'react';
import DashboardIcon from "@mui/icons-material/Dashboard";
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link, Outlet } from 'react-router-dom';

interface VendorLayoutProps {}

const VendorLayout: React.FC<VendorLayoutProps> = () => {
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, id: 0, path:'/vendor/dashboard' },
    { text: "Messages", icon: <MessageIcon />, id: 5, path:'/vendor/messages' },
    { text: "My Applications", icon: <WorkIcon />, id: 1, path:'/vendor/myapp' },
    { text: "Find Jobs", icon: <PersonIcon />, id: 2, path:'/vendor/findjobs' },
    { text: "Browse Companies", icon: <WorkIcon />, id: 3, path:'/vendor/browsecompany' },
    { text: "My Public Profile", icon: <EventIcon />, id: 4, path:'/vendor/myprofile' },
  ];

  return (
    <div className="h-screen flex">
      <div className="w-[270px] h-full overflow-auto bg-gray-50 p-4">
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.id}
              >
                <Link className='flex' to={item.path}>
                  <ListItemIcon className="text-blue-500">{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </Link>
              </ListItem>
            ))}
          </List>
      </div>
      <div className="w-[calc(100%-270px)]">
        <div className="h-[82px]">
          header
        </div>
        <div className="h-[calc(100%-82px)] overflow-auto">
          <Outlet />
        </div>            
      </div>
    </div>
  );
};

export default VendorLayout;