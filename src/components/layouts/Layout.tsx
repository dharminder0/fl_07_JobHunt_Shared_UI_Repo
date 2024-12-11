import React from 'react';
import DashboardIcon from "@mui/icons-material/Dashboard";
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import { Button, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Header from './Header.tsx';
import SideMenu from './SideMenu.tsx';


interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {

  return (
    <div className="h-screen">
      <Header />
      <div className="h-[calc(100%-82px)] flex">
        <SideMenu />
        <div className="w-[calc(100%-270px)] h-full overflow-auto">
          <Outlet />      
        </div>
      </div> 
    </div>
  );
};

export default Layout;