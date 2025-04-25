import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  InputAdornment,
  Tooltip,
  IconButton,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {
  AccessTimeOutlined,
  ChevronLeft,
  ChevronRight,
  LocationOnOutlined,
} from "@mui/icons-material";
import MenuDrpDwn from "../../../sharedComponents/MenuDrpDwn";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import StatusDialog from "../../../sharedComponents/StatusDialog";
import { getRequirementsList } from "../../../../components/sharedService/apiService";
import moment from "moment";
import MenuDrpDwnV2 from "../../../sharedComponents/MenuDrpDwnV2";
import {
  LocationTypeStatus,
  RequirementStatus,
} from "../../../../components/sharedService/shareData";
import TablePreLoader from "../../../../components/sharedComponents/TablePreLoader";
import { RoleType } from "../../../../components/sharedService/enums";
import { useClientList } from "../../../../components/hooks/useClientList";
import MenuDrpDwnByValue from "../../../../components/sharedComponents/MenuDrpDwnByValue";
import { useSelector } from "react-redux";

const MyRequirements = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = location.state || {};
  const paramStatus = params?.status;
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const activeRole = localStorage.getItem("activeRole") || "";
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isTableLoader, setIsTableLoader] = React.useState(true);
  const [selectedStatus, setSelectedStatus] = React.useState("Open");
  const [selectedRequirement, setSelectedRequirement] = React.useState({});
  const [searchText, setSearchText] = React.useState("");
  const [pageIndex, setPageIndex] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(15);
  const [status, setStatus] = useState<any[]>(
    !paramStatus ? [] : [paramStatus]
  );
  const [client, setClient] = useState<any[]>([]);
  const [resource, setResource] = useState<any[]>([]);
  const [requirementData, SetRequirementData] = React.useState<any>([]);

  const drawerState = useSelector((state: any) => state.drawer);

  const handleRowClick = (clientCode: number, type: string) => {
    if (clientCode) {
      switch (type) {
        case "applicant":
          navigate(`/company/candidates`, {
            state: { previousUrl: location.pathname },
          });
          break;
        case "client":
          navigate(`/company/clients/${clientCode}?type=activeView`, {
            state: { previousUrl: location.pathname },
          });
          break;
        case "myvendors":
          navigate(`/company/myvendors/${clientCode}?type=openView`, {
            state: { previousUrl: location.pathname },
          });
          break;
        default:
          navigate(`${clientCode}`);
          break;
      }
    }
  };

  const handleStatusDialog = (requirement: any) => {
    setIsDialogOpen(true);
    setSelectedRequirement({
      requirementId: requirement.id,
      status: requirement.statusName,
    });
    setSelectedStatus(requirement.statusName);
  };

  const getRequirementsData = () => {
    setIsTableLoader(true);
    const payload = {
      orgCode: userData.orgCode,
      searchText: searchText,
      page: pageIndex,
      pageSize: pageSize,
      locationType: resource,
      status: status,
      clientCode: client,
      userId: userData.userId,
      roleType: [activeRole === "company" && RoleType.Client],
    };

    getRequirementsList(payload)
      .then((result: any) => {
        if (result && result?.totalPages > 0) {
          SetRequirementData(result);
        } else {
          SetRequirementData([]);
        }
        setTimeout(() => {
          setIsTableLoader(false);
        }, 1000);
      })
      .catch((error: any) => {
        setTimeout(() => {
          setIsTableLoader(false);
        }, 1000);
      });
  };

  const clientList = useClientList(userData?.orgCode);

  useEffect(() => {
    if (searchText?.length > 3 || searchText?.length == 0) {
      getRequirementsData();
    }
  }, [searchText, resource, status, client, pageIndex]);

  useEffect(() => {
    if (!drawerState.isOpen) {
      getRequirementsData();
    }
  }, [drawerState.isOpen]);

  return (
    <>
      <div className="px-2 py-3 h-[calc(100%-20px)]">
        <div className="flex flex-row gap-1 justify-end mb-1">
          <div className="flex flex-row gap-1 p-1 overflow-hidden">
            <div className="flex text-center flex-nowrap my-auto">
              <div className="flex grow w-[220px] mr-2">
                <div className="flex-col flex-grow">
                  <TextField
                    size="small"
                    className="w-full"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                    placeholder="Search"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon fontSize="inherit" />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </div>
              </div>
              <div className="max-w-full shrink-0">
                <MenuDrpDwnByValue
                  menuList={clientList}
                  placeholder="Client"
                  handleSelectedItem={(selectedItems) =>
                    setClient(selectedItems)
                  }
                />
              </div>
              <div className="max-w-full shrink-0">
                <MenuDrpDwnV2
                  menuList={RequirementStatus}
                  placeholder="Status"
                  handleSelectedItem={(selectedItems) =>
                    setStatus(selectedItems)
                  }
                />
              </div>
              <div className="max-w-full shrink-0">
                <MenuDrpDwnV2
                  menuList={LocationTypeStatus}
                  placeholder="Resources"
                  handleSelectedItem={(selectedItems) =>
                    setResource(selectedItems)
                  }
                />
              </div>
            </div>
            <IconButton aria-label="filter">
              <FilterListOutlinedIcon />
            </IconButton>
          </div>
        </div>
        <div className="table-body">
          <table className="relative">
            <thead>
              <tr>
                <th className="add-right-shadow">Role</th>
                <th>Status</th>
                <th>Date Posted</th>
                {/* <th>Requirement Type</th> */}
                <th>Positions (Placed)</th>
                <th>Applicants</th>
                {/* <th>Contract period</th> */}
                <th>Visibility</th>
              </tr>
            </thead>

            <TablePreLoader
              isTableLoader={isTableLoader}
              data={requirementData?.list}
            />

            <tbody>
              {!isTableLoader &&
                requirementData.list?.length > 0 &&
                requirementData.list.map((requirement: any) => (
                  <tr key={requirement.uniqueId}>
                    <th className="add-right-shadow">
                      <div className="flex items-center justify-between">
                        <div
                          onClick={() =>
                            handleRowClick(requirement.uniqueId, "requirement")
                          }
                          className="cursor-pointer hover:text-indigo-700"
                        >
                          {requirement.title}
                        </div>
                        {requirement?.hot && (
                          <div className="text-info text-red-700 border px-2 rounded-full border-red-700">
                            Hot
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-secondary-text text-info mt-1">
                        <div
                          className="flex items-center min-w-[135px] max-w-[150px] cursor-pointer hover:text-indigo-700"
                          onClick={() =>
                            handleRowClick(requirement.clientCode, "client")
                          }
                        >
                          {requirement?.clientFavicon && (
                            // <img
                            //   src={requirement?.clientFavicon}
                            //   style={{ height: 12, width: 12 }}
                            //   className="me-1"
                            // />
                            <Avatar
                              alt={requirement?.clientName}
                              src={requirement?.clientFavicon || undefined}
                              className="rounded-full"
                              sx={{ height: 12, width: 12, fontSize: 10 }}
                            />
                          )}
                          <Tooltip title={requirement?.clientName} arrow>
                            <span className="text-ellipsis overflow-hidden truncate ps-1">
                              {requirement?.clientName || "Self"}
                            </span>
                          </Tooltip>
                        </div>
                        <div className="flex w-[128px]">
                          {requirement?.locationTypeName && (
                            <div className="flex items-center ms-1">
                              <LocationOnOutlined
                                fontSize="inherit"
                                className="mr-1"
                              />
                              <span>
                                {requirement?.locationTypeName || "-"}
                              </span>
                            </div>
                          )}
                          {requirement?.duration && (
                            <div className="flex items-center ms-1">
                              <AccessTimeOutlined
                                fontSize="inherit"
                                className="mr-1"
                              />
                              <span className="truncate w-[70px]">
                                {requirement?.duration || "-"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </th>
                    <td>
                      <Typography
                        className={`inline-block px-3 py-1 !text-base cursor-pointer rounded-full ${
                          requirement?.statusName === "Open"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                        onClick={() => handleStatusDialog(requirement)}
                      >
                        {requirement?.statusName || "-"}
                      </Typography>
                    </td>
                    <td>
                      {moment(requirement?.createdOn).format("DD-MM-YYYY")}
                    </td>
                    <td
                      className="cursor-pointer hover:text-indigo-700"
                      onClick={() =>
                        handleRowClick(requirement?.orgCode, "myvendors")
                      }
                    >
                      {requirement?.positions || 0} ({requirement?.placed || 0})
                    </td>
                    <td
                      className="cursor-pointer  hover:text-indigo-700"
                      onClick={() =>
                        handleRowClick(requirement.uniqueId, "applicant")
                      }
                    >
                      {requirement?.applicants || "-"}
                    </td>
                    <td>{requirement?.visibilityName || "-"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-2 sm:px-4">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-base text-gray-700">
                Showing <span>{(pageIndex - 1) * pageSize + 1}</span> to{" "}
                <span>
                  {Math.min(pageIndex * pageSize, requirementData?.count || 0)}
                </span>{" "}
                of <span>{requirementData?.count || 0}</span> results
              </p>
            </div>
          </div>
          <div className="flex flex-1 justify-end">
            <IconButton
              size="small"
              onClick={() => setPageIndex(pageIndex - 1)}
              disabled={pageIndex <= 1}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => setPageIndex(pageIndex + 1)}
              disabled={
                pageIndex >= Math.ceil((requirementData?.count || 0) / pageSize)
              }
            >
              <ChevronRight />
            </IconButton>
          </div>
        </div>
      </div>

      <StatusDialog
        title="Requirement Status"
        statusData={RequirementStatus}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        selectedStatus={selectedStatus}
        selectedRow={selectedRequirement}
        onFinish={getRequirementsData}
      />
    </>
  );
};

export default MyRequirements;
