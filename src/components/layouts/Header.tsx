import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useOrganizationType } from "../../contexts/OrganizationTypeContext";
import RequirementForm from "../pages/company/requirements/RequirementForm";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Add, CorporateFareOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { openDrawer } from "../features/drawerSlice";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch: AppDispatch = useDispatch();
  const role = JSON.parse(localStorage.getItem("role") || "[]");
  const activeRole = localStorage.getItem("activeRole") || ""; // Active role from localStorage
  const [organizationList, setOrganization] = useState<any[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<any>(null);
  const { organizationType, setOrganizationType } = useOrganizationType();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const [routesData, setRoutesData] = useState([
    {
      title: "Company",
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
        <svg
          className="my-auto"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.9824 20.2365C11.5004 20.8144 12.1654 21.132 12.8554 21.132H12.8564C13.5494 21.132 14.2174 20.8144 14.7364 20.2355C15.0144 19.928 15.4884 19.9029 15.7954 20.1804C16.1034 20.4579 16.1284 20.9336 15.8514 21.2411C15.0434 22.1396 13.9804 22.6344 12.8564 22.6344H12.8544C11.7334 22.6334 10.6724 22.1386 9.86743 21.2401C9.59043 20.9326 9.61543 20.4569 9.92343 20.1804C10.2314 19.9019 10.7054 19.927 10.9824 20.2365ZM12.9052 1.09912C17.3502 1.09912 20.3362 4.56681 20.3362 7.80511C20.3362 9.47084 20.7592 10.177 21.2082 10.9262C21.6522 11.6654 22.1552 12.5048 22.1552 14.0914C21.8062 18.1451 17.5812 18.4756 12.9052 18.4756C8.22923 18.4756 4.00323 18.1451 3.65822 14.1555C3.65523 12.5048 4.15823 11.6654 4.60223 10.9262L4.75897 10.662C5.1449 9.99757 5.47423 9.27488 5.47423 7.80511C5.47423 4.56681 8.46023 1.09912 12.9052 1.09912ZM12.9052 2.60158C9.41023 2.60158 6.97423 5.34408 6.97423 7.80511C6.97423 9.88753 6.39723 10.8501 5.88723 11.6995C5.47823 12.3816 5.15523 12.9205 5.15523 14.0914C5.32223 15.9805 6.56723 16.9731 12.9052 16.9731C19.2082 16.9731 20.4922 15.9364 20.6582 14.0263C20.6552 12.9205 20.3322 12.3816 19.9232 11.6995C19.4132 10.8501 18.8362 9.88753 18.8362 7.80511C18.8362 5.34408 16.4002 2.60158 12.9052 2.60158Z"
            fill="#25324B"
          />
          <path
            d="M18.5 9.58065C20.4338 9.58065 22 8.01067 22 6.07573C22 4.14078 20.4338 2.5708 18.5 2.5708C16.5662 2.5708 15 4.14078 15 6.07573C15 8.01067 16.5662 9.58065 18.5 9.58065Z"
            fill="#FF6550"
            stroke="white"
          />
        </svg>
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
