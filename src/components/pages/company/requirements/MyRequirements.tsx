import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  InputAdornment,
  Tooltip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { AccessTimeOutlined, LocationOnOutlined } from "@mui/icons-material";
import MenuDrpDwn from "../../../../components/shared/MenuDrpDwn";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import StatusDialog from "../../../../components/shared/StatusDialog";
import { getRequirementsList } from "../../../../components/sharedService/apiService";
import moment from "moment";

const MyRequirements = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = location.state || {};
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isTableLoader, setIsTableLoader] = React.useState(true);
  const [selectedStatus, setSelectedStatus] = React.useState("Open");
  const [requirementData, SetRequirementData] = React.useState<any[]>([]);
  const [filterList, setFilterList] = useState<any>({
    client: [
      "OpsTree Solutions",
      "Creative Solutions Ltd.",
      "Data Insights Group",
    ],
    status: ["Open", "On hold", "Closed"],
    requirementType: ["Remote", "Hybrid", "Onsite"],
  });
  const [searchFilter, setSearchFilter] = useState<any>({
    searchValue: "",
    client: [],
    status: !params?.status ? [] : [params?.status],
    requirementType: [],
    isApplicant: !!params?.status,
  });

  const handleRowClick = (id: number, type: string) => {
    switch (type) {
      case "applicant":
        navigate(`/company/candidates`, {
          state: { previousUrl: location.pathname },
        });
        break;
      case "client":
        navigate(`/company/clients/${id}?type=activeView`, {
          state: { previousUrl: location.pathname },
        });
        break;
      case "myvendors":
        navigate(`/company/myvendors/${id}?type=openView`, {
          state: { previousUrl: location.pathname },
        });
        break;
      default:
        navigate(`${id}`);
        break;
    }
  };

  const handleStatusDialog = (status: string) => {
    setIsDialogOpen(true);
    setSelectedStatus(status);
  };

  const getRequirementsData = () => {
    setIsTableLoader(true);
    getRequirementsList()
      .then((result: any) => {
        if (result && result?.length > 0) {
          SetRequirementData(result);
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

  useEffect(() => {
    getRequirementsData();
  }, []);

  return (
    <>
      <div className="px-2 py-3 h-full">
        <div className="flex flex-row gap-1 justify-end mb-1">
          <div className="flex flex-row gap-1 p-1 overflow-hidden">
            <div className="flex text-center flex-nowrap my-auto">
              <div className="flex grow w-[220px] mr-2">
                <div className="flex-col flex-grow">
                  <TextField
                    size="small"
                    className="w-full"
                    value={searchFilter.searchValue}
                    onChange={(event) =>
                      setSearchFilter({
                        ...searchFilter,
                        searchValue: event.target.value,
                      })
                    }
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
                <MenuDrpDwn
                  menuList={filterList?.client}
                  placeholder="Client"
                  handleSelectedItem={(selectedItems) => {
                    setSearchFilter({ ...searchFilter, client: selectedItems });
                  }}
                />
              </div>
              <div className="max-w-full shrink-0">
                <MenuDrpDwn
                  menuList={filterList?.status}
                  placeholder="Status"
                  handleSelectedItem={(selectedItems) => {
                    setSearchFilter({ ...searchFilter, status: selectedItems });
                  }}
                />
              </div>
              <div className="max-w-full shrink-0">
                <MenuDrpDwn
                  menuList={filterList?.requirementType}
                  placeholder="Requirements"
                  handleSelectedItem={(selectedItems) => {
                    setSearchFilter({
                      ...searchFilter,
                      requirementType: selectedItems,
                    });
                  }}
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
            {!isTableLoader && requirementData?.length === 0 ? (
              <div className="absolute left-[42%] pt-3">
                <p className="text-base">No data available</p>
              </div>
            ) : (
              isTableLoader && (
                <div className="absolute left-[46%] pt-3">
                  <CircularProgress size={24} />
                </div>
              )
            )}
            <tbody>
              {!isTableLoader &&
                requirementData?.length > 0 &&
                requirementData.map((requirement, index) => (
                  <tr key={index}>
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
                            handleRowClick(requirement.uniqueId, "client")
                          }
                        >
                          {requirement?.clientLogo && (
                            <img
                              src={requirement?.clientLogo}
                              style={{ height: 12, width: 12 }}
                              className="me-1"
                            />
                          )}
                          <Tooltip title={requirement?.clientName} arrow>
                            <span className="text-ellipsis overflow-hidden truncate">
                              {requirement?.clientName || "-"}
                            </span>
                          </Tooltip>
                        </div>
                        <div className="flex w-[128px]">
                          <div className="flex items-center ms-1">
                            <LocationOnOutlined
                              fontSize="inherit"
                              className="mr-1"
                            />
                            <span>{requirement?.locationTypeName || "-"}</span>
                          </div>
                          <div className="flex items-center ms-1">
                            <AccessTimeOutlined
                              fontSize="inherit"
                              className="mr-1"
                            />
                            <span>{requirement?.duration || "-"}</span>
                          </div>
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
                        onClick={() =>
                          handleStatusDialog(requirement?.statusName)
                        }
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
                        handleRowClick(requirement?.uniqueId, "myvendors")
                      }
                    >
                      {requirement?.positions || 0} (0)
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
      </div>

      <StatusDialog
        title="Applicant Status"
        statusData={filterList.status}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        selectedStatus={selectedStatus}
      />
    </>
  );
};

export default MyRequirements;
