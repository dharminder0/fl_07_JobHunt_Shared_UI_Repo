import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useOrganizationType } from "../../contexts/OrganizationTypeContext";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import PhotoCameraFrontOutlinedIcon from "@mui/icons-material/PhotoCameraFrontOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import { NavLink } from "react-router-dom";
import {
  HowToRegOutlined,
  Logout,
  PersonOutlineOutlined,
  Settings,
} from "@mui/icons-material";
import Drawer from "@mui/material/Drawer";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";
import AssuredWorkloadOutlinedIcon from "@mui/icons-material/AssuredWorkloadOutlined";

interface SideMenuProps {}

const SideMenu: React.FC<SideMenuProps> = () => {
  const { organizationType } = useOrganizationType();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove login session data from localStorage
    localStorage.removeItem("isLoggedIn");

    // Optionally, clear other stored user-related data
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("role");

    // Redirect to the login page
    navigate("/login");
  };

  const menuItems: any = {
    company: {
      main: [
        {
          text: "Dashboard",
          icon: <DashboardOutlinedIcon fontSize="inherit" />,
          id: 0,
          path: "/company/dashboard",
        },
        {
          text: "Requirements",
          icon: <WorkOutlineOutlinedIcon fontSize="inherit" />,
          id: 1,
          path: "/company/myrequirements",
        },
        {
          text: "Candidates",
          icon: <GroupAddOutlinedIcon fontSize="inherit" />,
          id: 2,
          path: "/company/candidates",
        },
        {
          text: "Clients",
          icon: <AssuredWorkloadOutlinedIcon fontSize="inherit" />,
          id: 3,
          path: "/company/clients",
        },
        {
          text: "My Vendors",
          icon: <BusinessOutlinedIcon fontSize="inherit" />,
          id: 4,
          path: "/company/myvendors",
        },
        {
          text: "Find Vendors",
          icon: <ScreenSearchDesktopOutlinedIcon fontSize="inherit" />,
          id: 5,
          path: "/company/findvendors",
        },
        {
          text: "Vendor Onboarding",
          icon: <HandshakeOutlinedIcon fontSize="inherit" />,
          id: 6,
          path: "/company/vndonboarding",
        },
        // { text: "Find Clients", icon: <EventIcon />, id: 4, path:'/company/findclients' },
        {
          text: "Messages",
          icon: <ChatOutlinedIcon fontSize="inherit" />,
          id: 7,
          path: "/company/messages",
        },
      ],
      settings: [
        {
          text: "Company Profile",
          icon: <ContactPageOutlinedIcon fontSize="inherit" />,
          id: 0,
          path: "/company/profile",
        },
        {
          text: "Subscriptions",
          icon: <SubscriptionsOutlinedIcon fontSize="inherit" />,
          id: 1,
          path: "/company/subscriptions",
        },
        {
          text: "Members",
          icon: <PeopleOutlinedIcon fontSize="inherit" />,
          id: 2,
          path: "/company/members",
        },
        // {
        //   text: "Settings",
        //   icon: <Settings fontSize="inherit" />,
        //   id: 3,
        //   path: "/company/settings",
        // },
      ],
      account: [
        {
          id: 0,
          path: "/company/account",
        },
      ],
    },
    vendor: {
      main: [
        {
          text: "Dashboard",
          icon: <HomeOutlinedIcon fontSize="inherit" />,
          id: 0,
          path: "/vendor/dashboard",
        },
        {
          text: "Requirements",
          icon: <WorkOutlineOutlinedIcon fontSize="inherit" />,
          id: 1,
          path: "/vendor/requirements",
        },
        {
          text: "Candidates",
          icon: <GroupAddOutlinedIcon fontSize="inherit" />,
          id: 2,
          path: "/vendor/candidate",
        },
        {
          text: "Bench",
          icon: <PersonSearchOutlinedIcon fontSize="inherit" />,
          id: 3,
          path: "/vendor/bench",
        },
        {
          text: "Clients",
          icon: <BusinessOutlinedIcon fontSize="inherit" />,
          id: 4,
          path: "/vendor/clients",
        },
        {
          text: "Search Clients",
          icon: <ScreenSearchDesktopOutlinedIcon fontSize="inherit" />,
          id: 5,
          path: "/vendor/searchclient",
        },
        {
          text: "Client Onboarding",
          icon: <HandshakeOutlinedIcon fontSize="inherit" />,
          id: 6,
          path: "/vendor/onboarding",
        },
        {
          text: "Messages",
          icon: <ChatOutlinedIcon fontSize="inherit" />,
          id: 7,
          path: "/vendor/messages",
        },
      ],
      settings: [
        {
          text: "Vendor Profile",
          icon: <PersonOutlineOutlined fontSize="inherit" />,
          id: 0,
          path: "/vendor/profile",
        },
        {
          text: "Subscriptions",
          icon: <SubscriptionsOutlinedIcon fontSize="inherit" />,
          id: 1,
          path: "/vendor/subscriptions",
        },
        {
          text: "Members",
          icon: <PeopleOutlinedIcon fontSize="inherit" />,
          id: 2,
          path: "/vendor/members",
        },
      ],
      account: [
        {
          id: 0,
          path: "/vendor/account",
        },
      ],
    },
  };
  return (
    <div className="w-[160px] h-full overflow-auto bg-primary-light py-2 shadow-[1px_0_0_0_#D6DDEB]">
      <div className="overflow-auto h-[calc(100%-82px)]">
        <List>
          {menuItems[organizationType].main?.map((item: any, index: number) => (
            <ListItem key={item.id} disablePadding>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex w-full px-1 py-1 gap-1 items-center rounded-md hover:bg-primary-hover ${
                    isActive
                      ? "bg-primary-hover text-primary"
                      : "text-secondary-text"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <ListItemIcon
                      className={`!min-w-[unset] !w-[16px] ${
                        isActive ? "!text-primary" : "!text-secondary-text"
                      }`}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      className="!text-[14px]"
                      primary={item.text}
                      classes={{
                        primary: "!text-base",
                      }}
                    />
                  </>
                )}
              </NavLink>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ marginTop: 1.5, marginBottom: 1.5 }} />
        <div className="text-base text-secondary-text my-2 px-1">SETTINGS</div>
        <List>
          {menuItems[organizationType].settings?.map(
            (item: any, index: number) => (
              <ListItem key={item.id} disablePadding>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex w-full px-1 py-1 gap-1 items-center rounded-md hover:bg-primary-hover ${
                      isActive
                        ? "bg-primary-hover text-primary"
                        : "text-secondary-text"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <ListItemIcon
                        className={`!min-w-[unset] !w-[16px] ${
                          isActive ? "!text-primary" : "!text-secondary-text"
                        }`}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        className="!text-[14px]"
                        primary={item.text}
                        classes={{
                          primary: "!text-base",
                        }}
                      />
                    </>
                  )}
                </NavLink>
              </ListItem>
            )
          )}
        </List>
      </div>
      <div className="flex justify-between items-center px-1 h-[80px]">
        <List>
          {menuItems[organizationType].account?.map(
            (item: any, index: number) => (
              <ListItem key={item.id} disablePadding>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex w-full px-1 py-1 gap-1 items-center rounded-md ${
                      isActive
                        ? "bg-primary-hover text-primary"
                        : "text-secondary-text"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <img
                        src={"/assets/images/Avatar.png"}
                        alt=""
                        className="rounded-full"
                        style={{ height: 32, width: 32 }}
                      />
                      <div className="w-[110px]">
                        <p className="text-base text-secondary-text truncate text-ellipsis">
                          Admin
                        </p>
                        <p className="text-info truncate text-secondary-text text-ellipsis">
                          admin@fleek.com
                        </p>
                      </div>
                    </>
                  )}
                </NavLink>
              </ListItem>
            )
          )}
          <Button startIcon={<Logout />} size="small" onClick={handleLogout}>
            Logout
          </Button>
        </List>
      </div>
    </div>
  );
};

export default SideMenu;
