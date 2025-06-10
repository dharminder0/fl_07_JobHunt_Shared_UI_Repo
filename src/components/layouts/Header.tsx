import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { getNotificationCounts } from "../sharedService/apiService";

interface HeaderProps {}

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
  const open = Boolean(anchorEl);

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

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
    getNotifyCount();
    // Set the organization list and selected organization
    const currentObj = findRoutesByCodes(role);
    setOrganization(currentObj);
    const activeOrg =
      updatedRoutes.find((route) => route.isActive) || currentObj[0];
    setSelectedOrg(activeOrg);
    if (activeOrg) {
      handleClose(activeOrg);
    }
  }, []); // Run once on component mount

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
      if (result > 0) {
        setNotifyCount(result);
      }
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
        <IconButton
          onClick={() => navigate(`/${activeRole}/account?type=notifications`)}
        >
          <NotificationsOutlined fontSize="inherit" />
          <Badge
            badgeContent={notifyCount}
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
    </div>
  );
};

export default Header;
