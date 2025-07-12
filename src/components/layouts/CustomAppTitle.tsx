import React, { useState, useEffect, useMemo, useRef, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, Menu, MenuItem, Stack } from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useOrganizationType } from "../../contexts/OrganizationTypeContext";

const CustomAppTitle = memo(({ activeType }: any) => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const navigate = useNavigate();
  const location = useLocation();
  const role = useMemo(
    () => JSON.parse(localStorage.getItem("role") || "[]"),
    []
  );
  const activeRole = useMemo(
    () => localStorage.getItem("activeRole") || "",
    []
  );

  // Initialize routesData without triggering re-renders inside useEffect
  const [routesData] = useState([
    {
      title: "Company",
      code: "company",
      redirectTo: "/company",
      isActive: false,
    },
    { title: "Vendor", code: "vendor", redirectTo: "/vendor", isActive: false },
  ]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedOrg, setSelectedOrg] = useState<any>(null);
  const { setOrganizationType } = useOrganizationType();

  // Memoized function to find routes
  const findRoutesByCodes = useMemo(() => {
    return (codesToMatch: string[]) =>
      routesData.filter((route) => codesToMatch.includes(route.code));
  }, [routesData]);

  // Memoized organization list
  const organizationList = useMemo(
    () => findRoutesByCodes(role),
    [findRoutesByCodes, role]
  );

  // Prevent infinite loops using useRef
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return; // Prevent running again after first render

    const updatedRoutes = routesData.map((route) => ({
      ...route,
      isActive: route.code === activeRole,
    }));

    const activeOrg =
      updatedRoutes.find((route) => route.isActive) || organizationList[0];

    if (activeOrg) {
      setSelectedOrg(activeOrg);
    }
    handleClose();
    effectRan.current = true; // Mark effect as run
  }, [activeRole, organizationList]); // Runs only when activeRole or organizationList changes

  const handleClick = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (orgObj?: any) => {
    if (orgObj && orgObj?.code !== selectedOrg?.code) {
      setSelectedOrg(orgObj);
      setOrganizationType(orgObj?.code);
      localStorage.setItem("activeRole", orgObj?.code);
      navigate(
        location.pathname.includes("/dashboard")
          ? orgObj.redirectTo
          : location.pathname
      );
    }
    setAnchorEl(null);
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar alt="You" src={userData.companyIcon} className="rounded-full !h-8 !w-8" />
      <div className="flex gap-3">
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
          {role.length > 1 && (
            <KeyboardArrowDownOutlinedIcon className="my-auto" />
          )}
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose()}
          MenuListProps={{ "aria-labelledby": "basic-button" }}
        >
          {organizationList.map((item) => (
            <MenuItem
              key={item.code}
              className="w-[160px]"
              onClick={() => handleClose(item)}
              selected={item.code === selectedOrg?.code}
            >
              {item.title}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Stack>
  );
});

export default CustomAppTitle;
