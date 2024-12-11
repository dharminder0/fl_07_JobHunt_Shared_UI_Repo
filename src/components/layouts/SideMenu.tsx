import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardIcon from "@mui/icons-material/Dashboard";
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import { useOrganizationType } from '../../contexts/OrganizationTypeContext';

interface SideMenuProps { }

const SideMenu: React.FC<SideMenuProps> = () => {
  const { organizationType } = useOrganizationType();

  const menuItems: any = {
    company: [
      { text: "Dashboard", icon: <DashboardIcon />, id: 0, path: '/company/dashboard' },
      { text: "My Requirements", icon: <WorkIcon />, id: 1, path: '/company/myapp' },
      { text: "My Vendors", icon: <PersonIcon />, id: 2, path: '/company/findrequirements' },
      { text: "Find Vendors", icon: <WorkIcon />, id: 3, path: '/company/myclients' },
      // { text: "Find Clients", icon: <EventIcon />, id: 4, path:'/company/findclients' },
      { text: "Messages", icon: <MessageIcon />, id: 5, path: '/company/messages' },
    ],
    vendor: [
      { text: "Dashboard", icon: <DashboardIcon />, id: 0, path: '/vendor/dashboard' },
      { text: "Messages", icon: <MessageIcon />, id: 5, path: '/vendor/messages' },
      { text: "My Applications", icon: <WorkIcon />, id: 1, path: '/vendor/myapp' },
      { text: "Find Jobs", icon: <PersonIcon />, id: 2, path: '/vendor/findjobs' },
      { text: "Browse Companies", icon: <WorkIcon />, id: 3, path: '/vendor/browsecompany' },
      { text: "My Public Profile", icon: <EventIcon />, id: 4, path: '/vendor/myprofile' },
    ]
  };
  return (
    <div className="w-[270px] overflow-auto h-full overflow-auto bg-gray-50 p-4 shadow-[1px_0_0_0_#D6DDEB]">
      <List>
        {menuItems[organizationType]?.map((item: any) => (
          <ListItem key={item.id} >
            <Link className='flex' to={item.path}>
              <ListItemIcon className="text-blue-500">{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SideMenu;