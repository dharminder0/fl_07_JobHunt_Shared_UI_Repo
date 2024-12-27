import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useOrganizationType } from "../../contexts/OrganizationTypeContext";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import { NavLink } from "react-router-dom";
import { Logout, PersonOutlineOutlined } from "@mui/icons-material";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";
import AssuredWorkloadOutlinedIcon from "@mui/icons-material/AssuredWorkloadOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
interface SideMenuProps {}

const SideMenu: React.FC<SideMenuProps> = () => {
  const { organizationType } = useOrganizationType();
  const navigate = useNavigate();
  const location = useLocation();
  const activeRole = localStorage.getItem("activeRole") || "";
  const handleLogout = () => {
    // Remove login session data from localStorage
    localStorage.removeItem("isLoggedIn"); // Optionally, clear other stored user-related data

    localStorage.removeItem("email");
    localStorage.removeItem("password");  
    localStorage.removeItem("activeRole");
    localStorage.removeItem("role"); // Redirect to the login page

    navigate("/login");
  };

  useEffect(() => {
    if (!location.pathname.includes(`/${activeRole}`)) {
      navigate(`/${activeRole}`);
    }
  }, [activeRole]);

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
          text: "Applicants",
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
          text: "Vendors",
          icon: <BusinessOutlinedIcon fontSize="inherit" />,
          id: 4,
          child: [
            {
              text: "Empaneled",
              icon: <BusinessOutlinedIcon fontSize="inherit" />,
              id: 1,
              path: "/company/myvendors",
            },
            {
              text: "Search",
              icon: <ScreenSearchDesktopOutlinedIcon fontSize="inherit" />,
              id: 2,
              path: "/company/findvendors",
            },
            {
              text: "Onboarding",
              icon: <HandshakeOutlinedIcon fontSize="inherit" />,
              id: 3,
              path: "/company/vndonboarding",
            },
          ],
        }, // { text: "Find Clients", icon: <EventIcon />, id: 4, path:'/company/findclients' },
        {
          text: "Messages",
          icon: <ChatOutlinedIcon fontSize="inherit" />,
          id: 7,
          path: "/company/messages",
        },
      ],
      settings: [
        {
          text: "Organization Profile",
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
          text: "Applicants",
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
          child: [
            {
              text: "Empaneled",
              icon: <BusinessOutlinedIcon fontSize="inherit" />,
              id: 11,
              path: "/vendor/clients",
            },
            {
              text: "Search",
              icon: <ScreenSearchDesktopOutlinedIcon fontSize="inherit" />,
              id: 22,
              path: "/vendor/searchclient",
            },
            {
              text: "Onboarding",
              icon: <HandshakeOutlinedIcon fontSize="inherit" />,
              id: 33,
              path: "/vendor/onboarding",
            },
          ],
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
          text: "Organization Profile",
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
  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleToggle = (path: string) => {
    setOpenItem((prev) => (prev === path ? null : path));
  };

  return (
    <div className="w-[180px] h-full overflow-auto bg-primary-light py-2 shadow-[1px_0_0_0_#D6DDEB]">
      <div className="overflow-auto h-[calc(100%-75px)]">
        <List disablePadding>
          {menuItems[organizationType]?.main?.map((item: any, index: number) =>
            item?.child ? (
              <SidebarItemCollapse
                key={item.path}
                item={item}
                isOpen={openItem === item.path}
                onToggle={() => handleToggle(item.path)}
              />
            ) : (
              <SidebarItem route={item} />
            )
          )}
        </List>
        <Divider
          sx={{
            marginTop: 1.5,
            marginBottom: 1.5,
          }}
        />
        <div className="text-base text-secondary-text my-2 px-1">SETTINGS</div>
        <List disablePadding>
          {menuItems[organizationType]?.settings?.map(
            (item: any, index: number) =>
              item?.child ? (
                <SidebarItemCollapse
                  key={item.path}
                  item={item}
                  isOpen={openItem === item.path}
                  onToggle={() => handleToggle(item.path)}
                />
              ) : (
                <SidebarItem route={item} />
              )
          )}
        </List>
      </div>
      <List disablePadding>
        {menuItems[organizationType]?.account?.map(
          (item: any, index: number) => (
            <ListItemButton
              key={item.path}
              sx={{
                padding: 0,
              }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex w-full p-1 pl-2 gap-1 items-center rounded-md ${
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
                      style={{
                        height: 32,
                        width: 32,
                      }}
                    />
                    <div
                      className={`w-[110px] ${
                        isActive ? "!text-primary" : "!text-secondary-text"
                      }`}
                    >
                      <p className="text-base truncate text-ellipsis">Admin</p>
                      <p className="text-info truncate text-ellipsis">
                        admin@fleek.com
                      </p>
                    </div>
                  </>
                )}
              </NavLink>
            </ListItemButton>
          )
        )}
        <Divider
          sx={{
            marginTop: 1.5,
            marginBottom: 1,
          }}
        />
        <div
          onClick={handleLogout}
          className="text-info flex items-center justify-end text-indigo-500 cursor-pointer px-2 hover:text-indigo-700"
        >
          <Logout
            fontSize="inherit"
            sx={{
              mr: 0.5,
            }}
          />
          Logout
        </div>
      </List>
    </div>
  );
};

export default SideMenu;
interface SidebarItemCollapseProps {
  item: any;
  isOpen: boolean;
  onToggle: () => void;
}

const SidebarItemCollapse: React.FC<SidebarItemCollapseProps> = ({
  item,
  isOpen,
  onToggle,
}) => {
  return (
    <>
      <ListItemButton
        classes={{
          root: "!text-secondary-text",
        }}
        onClick={onToggle}
        sx={{
          padding: 0,
        }}
      >
        <div className="flex w-full p-1 pl-2 gap-1 items-center rounded-md hover:bg-primary-hover text-secondary-text">
          <ListItemIcon
            className={`!min-w-[unset] !w-[16px] ${
              false ? "!text-primary" : "!text-secondary-text"
            }`}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.text}
            classes={{
              primary: "!text-base",
            }}
          />
        </div>
        {isOpen ? (
          <ExpandLessOutlinedIcon color="inherit" fontSize="small" />
        ) : (
          <ExpandMoreOutlinedIcon color="inherit" fontSize="small" />
        )}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto">
        <List
          disablePadding
          sx={{
            "& .MuiListItemButton-root": {
              "& a": {
                paddingLeft: "24px",
              },
            },
          }}
        >
          {item.child?.map((route: any, index: number) => (
            <SidebarItem route={route} key={route.text} />
          ))}
        </List>
      </Collapse>
    </>
  );
};

interface SidebarItemProps {
  route: any;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ route }) => {
  return (
    <ListItemButton
      sx={{
        padding: 0,
      }}
    >
      <NavLink
        to={route.path}
        className={({ isActive }) =>
          `flex w-full p-1 pl-2 gap-1 items-center rounded-md hover:bg-primary-hover ${
            isActive ? "bg-primary-hover text-primary" : "text-secondary-text"
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
              {route.icon}
            </ListItemIcon>
            <ListItemText
              primary={route.text}
              classes={{
                primary: "!text-base",
              }}
            />
          </>
        )}
      </NavLink>
    </ListItemButton>
  );
};
