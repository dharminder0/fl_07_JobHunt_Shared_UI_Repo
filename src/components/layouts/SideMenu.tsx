import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useOrganizationType } from '../../contexts/OrganizationTypeContext';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import PhotoCameraFrontOutlinedIcon from '@mui/icons-material/PhotoCameraFrontOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { NavLink } from 'react-router-dom';

interface SideMenuProps { }

const SideMenu: React.FC<SideMenuProps> = () => {
  const { organizationType } = useOrganizationType();

  const menuItems: any = {
    company: [
      { text: "Dashboard", icon: <HomeOutlinedIcon fontSize='small' />, id: 0, path: '/company/dashboard' },
      { text: "My Requirements", icon: <WorkOutlineOutlinedIcon fontSize='small' />, id: 1, path: '/company/myapp' },
      { text: "My Vendors", icon: <GroupAddOutlinedIcon fontSize='small'/>, id: 2, path: '/company/findrequirements' },
      { text: "Find Vendors", icon: <PersonSearchOutlinedIcon fontSize='small' />, id: 3, path: '/company/myclients' },
      // { text: "Find Clients", icon: <EventIcon />, id: 4, path:'/company/findclients' },
      { text: "Messages", icon: <ChatOutlinedIcon fontSize='small' />, id: 5, path: '/company/messages' },
    ],
    vendor: [
      { text: "Dashboard", icon: <HomeOutlinedIcon fontSize='small' />, id: 0, path: '/vendor/dashboard' },
      { text: "Messages", icon: <ChatOutlinedIcon fontSize='small'/>, id: 5, path: '/vendor/messages' },
      { text: "My Applications", icon: <WorkOutlineOutlinedIcon fontSize='small'/>, id: 1, path: '/vendor/myapp' },
      { text: "Find Jobs", icon: <PersonSearchOutlinedIcon fontSize='small'/>, id: 2, path: '/vendor/findjobs' },
      { text: "Browse Companies", icon: <WorkOutlineOutlinedIcon fontSize='small'/>, id: 3, path: '/vendor/browsecompany' },
      { text: "My Public Profile", icon: <PhotoCameraFrontOutlinedIcon fontSize='small'/>, id: 4, path: '/vendor/myprofile' },
    ]
  };
  return (
    <div className="w-[200px] overflow-auto h-full overflow-auto bg-primary-light py-4 shadow-[1px_0_0_0_#D6DDEB]">
<List>
        {menuItems[organizationType]?.map((item: any, index: number) => (
          <ListItem key={item.id} disablePadding>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex w-full px-1 py-2 gap-2 items-center rounded-md ${
                  isActive ? "bg-primary-hover text-primary" : "text-secondary-text"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <ListItemIcon
                    className={`!min-w-[unset] !w-[20px] ${
                      isActive ? "!text-primary" : "!text-secondary-text"
                    }`}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    className="!text-[14px]"
                    primary={item.text}
                    classes={{
                      primary: "!text-title",
                    }}
                  />
                </>
              )}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SideMenu;