import { Button, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrganizationType } from "../../contexts/OrganizationTypeContext";
import RequirementForm from "../pages/company/requirements/RequirementForm";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const role = JSON.parse(localStorage.getItem("role") || "[]");
  const routesData = [
    {
      title: "Company",
      code: "company",
      redirectTo: "/company",
    },
    {
      title: "Vendor",
      code: "vendor",
      redirectTo: "/vendor",
    },
  ];

  const findRoutesByCodes = (codesToMatch: string[]) => {
    return routesData.filter((route) => codesToMatch.includes(route.code));
  };

  useEffect(() => {
    const currentObj = findRoutesByCodes(role);
    setOrganization(currentObj);
    setSelectedOrg(currentObj[0]);
    handleClose(currentObj[0]);
  }, []);

  const { organizationType, setOrganizationType } = useOrganizationType();
  const [organizationList, setOrganization] = useState<any[]>([]);

  const [selectedOrg, setSelectedOrg] = useState<any>(organizationList[0]);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (orgObj?: any) => {
    if (orgObj && orgObj?.code !== selectedOrg?.code) {
      setSelectedOrg(orgObj);
      setOrganizationType(orgObj?.code);
      navigate(orgObj.redirectTo);
    }
    setAnchorEl(null);
  };

  return (
    <div className="h-[52px] px-5 py-2 shadow-[0px_-1px_0px_0px_#D6DDEB_inset] flex justify-between">
      <div className="flex gap-3">
        <div className="icon my-auto">
          <svg
            width="37"
            height="33"
            viewBox="0 0 37 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.5 11.1201V32.4538L18.8241 43.471L19.2494 42.7861L18.8241 22.0811L1.13004 11.1328L0.5 11.1201Z"
              fill="#449B82"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M36.9501 11.02V32.6542L18.8242 43.4713V22.0812L36.2862 11.0363L36.9501 11.02Z"
              fill="#9BDB9C"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.725 0.402832L36.95 11.0196L18.8241 22.4377L0.5 11.1198L18.725 0.402832Z"
              fill="#56CDAD"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M27.8783 8.91113L21.7143 12.5597V19.9238L15.5383 16.2154L9.59961 19.7306V35.1226L15.7636 31.3002V23.015L22.3473 27.2177L27.8783 23.7879V8.91113Z"
              fill="white"
            />
          </svg>
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
            <MenuItem className="w-[160px]" onClick={() => handleClose(item)}>
              {item.title}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <div className="flex flex-row gap-8">
        <svg
          className="my-auto"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.9824 20.2365C11.5004 20.8144 12.1654 21.132 12.8554 21.132H12.8564C13.5494 21.132 14.2174 20.8144 14.7364 20.2355C15.0144 19.928 15.4884 19.9029 15.7954 20.1804C16.1034 20.4579 16.1284 20.9336 15.8514 21.2411C15.0434 22.1396 13.9804 22.6344 12.8564 22.6344H12.8544C11.7334 22.6334 10.6724 22.1386 9.86743 21.2401C9.59043 20.9326 9.61543 20.4569 9.92343 20.1804C10.2314 19.9019 10.7054 19.927 10.9824 20.2365ZM12.9052 1.09912C17.3502 1.09912 20.3362 4.56681 20.3362 7.80511C20.3362 9.47084 20.7592 10.177 21.2082 10.9262C21.6522 11.6654 22.1552 12.5048 22.1552 14.0914C21.8062 18.1451 17.5812 18.4756 12.9052 18.4756C8.22923 18.4756 4.00323 18.1451 3.65822 14.1555C3.65523 12.5048 4.15823 11.6654 4.60223 10.9262L4.75897 10.662C5.1449 9.99757 5.47423 9.27488 5.47423 7.80511C5.47423 4.56681 8.46023 1.09912 12.9052 1.09912ZM12.9052 2.60158C9.41023 2.60158 6.97423 5.34408 6.97423 7.80511C6.97423 9.88753 6.39723 10.8501 5.88723 11.6995C5.47823 12.3816 5.15523 12.9205 5.15523 14.0914C5.32223 15.9805 6.56723 16.9731 12.9052 16.9731C19.2082 16.9731 20.4922 15.9364 20.6582 14.0263C20.6552 12.9205 20.3322 12.3816 19.9232 11.6995C19.4132 10.8501 18.8362 9.88753 18.8362 7.80511C18.8362 5.34408 16.4002 2.60158 12.9052 2.60158Z"
            fill="#25324B"
          />
          <path
            d="M18.5 9.58065C20.4338 9.58065 22 8.01067 22 6.07573C22 4.14078 20.4338 2.5708 18.5 2.5708C16.5662 2.5708 15 4.14078 15 6.07573C15 8.01067 16.5662 9.58065 18.5 9.58065Z"
            fill="#FF6550"
            stroke="white"
          />
        </svg>
        {organizationType === "company" && <RequirementForm />}
      </div>
    </div>
  );
};

export default Header;
