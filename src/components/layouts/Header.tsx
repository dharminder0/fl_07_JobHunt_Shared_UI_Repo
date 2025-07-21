import {
  Avatar,
  Badge,
  Box,
  Button,
  ClickAwayListener,
  IconButton,
  Menu,
  MenuItem,
  Popper,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useOrganizationType } from "../../contexts/OrganizationTypeContext";
import RequirementForm from "../pages/company/requirements/RequirementForm";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
  Add,
  CorporateFareOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { openDrawer } from "../features/drawerSlice";
import {
  getNotificationCounts,
  getNotificationsList,
} from "../sharedService/apiService";
import {
  addCountListener,
  removeCountListener,
  signalREmitter,
  startNotificationConnection,
  stopNotificationConnection,
} from "../sharedService/signalRService";

interface HeaderProps {}

let notifyCallCount = 0;

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch: AppDispatch = useDispatch();
  const role = JSON.parse(localStorage.getItem("role") || "[]");
  const activeRole = localStorage.getItem("activeRole") || ""; // Active role from localStorage
  const [organizationList, setOrganization] = useState<any[]>([]);
  const [notifyCount, setNotifyCount] = useState<any>(null);
  const [selectedOrg, setSelectedOrg] = useState<any>(null);
  const { organizationType, setOrganizationType } = useOrganizationType();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationList, setNotificationList] = useState<any[]>([]);
  const [notifyAnchorEl, setNotifyAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isNotifyOpen = Boolean(notifyAnchorEl);

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const isMounted = useRef(false);

  const [routesData, setRoutesData] = useState([
    {
      title: "Partner",
      code: "company",
      redirectTo: "/company",
      isActive: false,
    },
    {
      title: "Vendor",
      code: "vendor",
      redirectTo: "/vendor",
      isActive: false,
    },
  ]);

  const findRoutesByCodes = (codesToMatch: string[]) => {
    return routesData.filter((route) => codesToMatch.includes(route.code));
  };

  useEffect(() => {
    // Update routesData with isActive based on activeRole
    const updatedRoutes = routesData.map((route) => ({
      ...route,
      isActive: route.code === activeRole,
    }));
    setRoutesData(updatedRoutes);
    // Set the organization list and selected organization
    const currentObj = findRoutesByCodes(role);
    setOrganization(currentObj);
    const activeOrg =
      updatedRoutes.find((route) => route.isActive) || currentObj[0];
    setSelectedOrg(activeOrg);
    if (activeOrg) {
      handleClose(activeOrg);
    }
    getNotifyCount();
    getNotificationsListData();
  }, []); // Run once on component mount

  useEffect(() => {
    const onCountUpdate = (count: number) => {
      console.log("📡 Component received count:", count);
      getNotifyCount();
    };

    addCountListener(onCountUpdate);

    // Cleanup to prevent memory leak and duplicate logs
    return () => {
      removeCountListener(onCountUpdate);
    };
  }, []);

  const handleClick = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (orgObj?: any) => {
    if (orgObj && orgObj?.code !== selectedOrg?.code) {
      setSelectedOrg(orgObj);
      setOrganizationType(orgObj?.code);
      localStorage.setItem("activeRole", orgObj?.code);
      if (location.pathname.includes("/dashboard")) {
        navigate(orgObj.redirectTo);
      } else {
        navigate(location.pathname);
      }
    }
    setAnchorEl(null);
  };

  const handleReqDrawer = () => {
    dispatch(openDrawer({ drawerName: "CmpPostRequirement" }));
  };

  const getNotifyCount = () => {
    getNotificationCounts(userData.orgCode).then((result: any) => {
      if (result >= 0) {
        setNotifyCount(result);
      }
    });
    notifyCallCount++;
    console.log(`🔁 getNotifyCount called: ${notifyCallCount} times`);
  };

  const handleNotifyClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotifyAnchorEl(notifyAnchorEl ? null : event.currentTarget);
  };

  const getNotificationsListData = () => {
    const payload = {
      orgCode: userData?.orgCode,
      page: 1,
      pageSize: 10,
    };
    getNotificationsList(payload)
      .then((result: any) => {
        if (result.count >= 0) {
          setNotificationList(result.notifications);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="h-[52px] px-5 shadow-[0px_-1px_0px_0px_#D6DDEB_inset] flex justify-between">
      <div className="flex gap-3">
        <div className="icon my-auto">
          <Avatar
            alt="Org Icon"
            src={userData.companyIcon || undefined}
            className="rounded-full !h-8 !w-8"
          >
            {!userData.companyIcon && (
              <CorporateFareOutlined fontSize="small" />
            )}
          </Avatar>
        </div>
        <div
          className="cursor-pointer flex flex-row gap-2"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <div className="font-semibold text-title my-auto">
            {selectedOrg?.title}
          </div>
          {role && role.length > 1 && (
            <KeyboardArrowDownOutlinedIcon className="my-auto" />
          )}
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose()}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {organizationList.map((item) => (
            <MenuItem
              key={item.code}
              className="w-[160px]"
              onClick={() => handleClose(item)}
              selected={item.code === selectedOrg?.code} // Highlight the selected item
            >
              {item.title}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <div className="flex flex-row gap-8 items-center">
        <IconButton onClick={handleNotifyClick}>
          <NotificationsOutlined fontSize="inherit" />
          <Badge
            badgeContent={notifyCount > 0 ? notifyCount : null}
            color="primary"
            overlap="circular"
          />
        </IconButton>

        {organizationType === "company" && (
          <div className="flex flex-col my-auto mr-2">
            <Button
              variant="contained"
              onClick={handleReqDrawer}
              startIcon={<Add />}
            >
              Post a requirement
            </Button>
          </div>
        )}
      </div>
      <Popper
        id="simple-popper"
        open={isNotifyOpen}
        anchorEl={notifyAnchorEl}
        sx={{ marginRight: "20px", zIndex: 9 }}
      >
        <ClickAwayListener onClickAway={() => setNotifyAnchorEl(null)}>
          <div className="bg-white rounded-md shadow-sm max-w-[370px] border">
            <div className="p-2 border-b flex items-center justify-between">
              <p className="text-base font-semibold">Notifications</p>
              <Button
                size="small"
                onClick={() => {
                  navigate(`/${activeRole}/account?type=notifications`);
                  setNotifyAnchorEl(null);
                }}
              >
                View all
              </Button>
            </div>
            <div className="text-base px-1">
              {notificationList?.length > 0
                ? notificationList.map((item: any) => (
                    <div className="border-b p-2  cursor-pointer hover:border-0 hover:bg-indigo-100 hover:rounded-md">
                      <p style={{ fontWeight: "500" }}>{item.title}</p>
                      <p className="text-info truncate text-ellipsis">
                        {item.message}
                      </p>
                    </div>
                  ))
                : "no data"}
            </div>
          </div>
        </ClickAwayListener>
      </Popper>
    </div>
  );
};

export default Header;
