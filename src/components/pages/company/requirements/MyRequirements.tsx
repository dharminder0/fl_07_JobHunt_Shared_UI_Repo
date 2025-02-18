import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  InputAdornment,
  Tooltip,
  IconButton,
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

  const [jobData, setJobData] = useState<any[]>([]);
  const jobDataOrg = [
    {
      id: 1,
      role: "Social Media Assistant",
      status: "Open",
      datePosted: "20-05-2024",
      applicants: 19,
      client: "OpsTree Solutions",
      requirementType: "Remote",
      noOfPositions: 3,
      placed: 1,
      contractPeriod: "6 months",
      visibility: "Global",
      logo: "https://opstree.com/wp-content/uploads/2024/10/FavIcon-OpsTree-100x100.png",
      type: "Hot",
    },
    {
      id: 2,
      role: "Senior Designer",
      status: "On hold",
      datePosted: "16-05-2024",
      applicants: 0,
      client: "Creative Solutions Ltd.",
      requirementType: "Hybrid",
      noOfPositions: 5,
      placed: 2,
      contractPeriod: "12 months",
      visibility: "Empaneled",
      logo: "https://cdn.creative-sols.com/assets/img/favicon-32x32.png",
    },
    {
      id: 3,
      role: "Visual Designer",
      status: "Open",
      datePosted: "15-05-2024",
      applicants: 4,
      client: "Design Pros Inc.",
      requirementType: "Onsite",
      noOfPositions: 2,
      placed: 1,
      contractPeriod: "3 months",
      visibility: "Limited",
      logo: "https://www.prototypehouse.com/favicon.ico",
      type: "Hot",
    },
    {
      id: 4,
      role: "Data Science",
      status: "Closed",
      datePosted: "13-05-2024",
      applicants: 6,
      client: "OpsTree Solutions",
      requirementType: "Remote",
      noOfPositions: 1,
      placed: 1,
      contractPeriod: "9 months",
      visibility: "Global",
      logo: "https://opstree.com/wp-content/uploads/2024/10/FavIcon-OpsTree-100x100.png",
    },
    {
      id: 5,
      role: "Kotlin Developer",
      status: "Closed",
      datePosted: "12-06-2024",
      applicants: 12,
      client: "Tech Innovators LLC",
      requirementType: "Hybrid",
      noOfPositions: 1,
      placed: 0,
      contractPeriod: "18 months",
      visibility: "Empaneled",
      logo: "https://techinnovators.dev/icon_dark.ico",
    },
    {
      id: 6,
      role: "React Developer",
      status: "Open",
      datePosted: "11-05-2024",
      applicants: 14,
      client: "Code Crafters Co.",
      requirementType: "Onsite",
      noOfPositions: 3,
      placed: 1,
      contractPeriod: "12 months",
      visibility: "Limited",
      logo: "https://codecrafters.io/favicon.ico",
      type: "Hot",
    },
    {
      id: 7,
      role: "Social Media Assistant",
      status: "On hold",
      datePosted: "20-05-2024",
      applicants: 19,
      client: "OpsTree Solutions",
      requirementType: "Remote",
      noOfPositions: 3,
      placed: 2,
      contractPeriod: "6 months",
      visibility: "Global",
      logo: "https://opstree.com/wp-content/uploads/2024/10/FavIcon-OpsTree-100x100.png",
    },
    {
      id: 8,
      role: "Senior Designer",
      status: "Open",
      datePosted: "16-05-2024",
      applicants: 0,
      client: "OpsTree Solutions",
      requirementType: "Remote",
      noOfPositions: 3,
      placed: 0,
      contractPeriod: "6 months",
      visibility: "Global",
      logo: "https://opstree.com/wp-content/uploads/2024/10/FavIcon-OpsTree-100x100.png",
    },
    {
      id: 9,
      role: "Visual Designer",
      status: "On hold",
      datePosted: "15-05-2024",
      applicants: 2,
      client: "Creative Solutions Ltd.",
      requirementType: "Onsite",
      noOfPositions: 2,
      placed: 0,
      contractPeriod: "3 months",
      visibility: "Limited",
      logo: "https://cdn.creative-sols.com/assets/img/favicon-32x32.png",
    },
    {
      id: 10,
      role: "Data Science",
      status: "Closed",
      datePosted: "13-05-2024",
      applicants: 4,
      client: "Data Insights Group",
      requirementType: "Remote",
      noOfPositions: 10,
      placed: 1,
      contractPeriod: "9 months",
      visibility: "Global",
      logo: "https://data-insights.com/wp-content/uploads/2018/01/DataInsights_favicon-01.png",
    },
    {
      id: 7,
      role: "Social Media Assistant",
      status: "On hold",
      datePosted: "20-05-2024",
      applicants: 19,
      client: "OpsTree Solutions",
      requirementType: "Remote",
      noOfPositions: 3,
      placed: 3,
      contractPeriod: "6 months",
      visibility: "Global",
      logo: "https://opstree.com/wp-content/uploads/2024/10/FavIcon-OpsTree-100x100.png",
    },
    {
      id: 8,
      role: "Senior Designer",
      status: "Open",
      datePosted: "16-05-2024",
      applicants: 4,
      client: "Visionary Designs Ltd.",
      requirementType: "Hybrid",
      noOfPositions: 5,
      placed: 2,
      contractPeriod: "12 months",
      visibility: "Empaneled",
      logo: "https://www.visionarydesign.co.in/wp-content/uploads/2019/09/favicon.png",
    },
    {
      id: 9,
      role: "Visual Designer",
      status: "On hold",
      datePosted: "15-05-2024",
      applicants: 5,
      client: "Creative Solutions Ltd.",
      requirementType: "Onsite",
      noOfPositions: 2,
      placed: 1,
      contractPeriod: "3 months",
      visibility: "Limited",
      logo: "https://cdn.creative-sols.com/assets/img/favicon-32x32.png",
    },
    {
      id: 10,
      role: "Data Science",
      status: "Open",
      datePosted: "13-05-2024",
      applicants: 0,
      client: "Data Insights Group",
      requirementType: "Remote",
      noOfPositions: 10,
      placed: 0,
      contractPeriod: "9 months",
      visibility: "Global",
      logo: "https://data-insights.com/wp-content/uploads/2018/01/DataInsights_favicon-01.png",
    },
    {
      id: 7,
      role: "Social Media Assistant",
      status: "On hold",
      datePosted: "20-05-2024",
      applicants: 9,
      client: "OpsTree Solutions",
      requirementType: "Remote",
      noOfPositions: 3,
      placed: 2,
      contractPeriod: "6 months",
      visibility: "Global",
      logo: "https://opstree.com/wp-content/uploads/2024/10/FavIcon-OpsTree-100x100.png",
    },
    {
      id: 8,
      role: "Senior Designer",
      status: "Open",
      datePosted: "16-05-2024",
      applicants: 4,
      client: "Visionary Designs Ltd.",
      requirementType: "Hybrid",
      noOfPositions: 5,
      placed: 1,
      contractPeriod: "12 months",
      visibility: "Empaneled",
      logo: "https://www.visionarydesign.co.in/wp-content/uploads/2019/09/favicon.png",
    },
    {
      id: 9,
      role: "Visual Designer",
      status: "Open",
      datePosted: "15-05-2024",
      applicants: 2,
      client: "Creative Solutions Ltd.",
      requirementType: "Onsite",
      noOfPositions: 2,
      placed: 0,
      contractPeriod: "3 months",
      visibility: "Limited",
      logo: "https://cdn.creative-sols.com/assets/img/favicon-32x32.png",
    },
    {
      id: 10,
      role: "Data Science",
      status: "Closed",
      datePosted: "13-05-2024",
      applicants: 6,
      client: "Data Insights Group",
      requirementType: "Remote",
      noOfPositions: 10,
      placed: 3,
      contractPeriod: "9 months",
      visibility: "Global",
      logo: "https://data-insights.com/wp-content/uploads/2018/01/DataInsights_favicon-01.png",
    },
    {
      id: 7,
      role: "Social Media Assistant",
      status: "On hold",
      datePosted: "20-05-2024",
      applicants: 1,
      client: "OpsTree Solutions",
      requirementType: "Remote",
      noOfPositions: 3,
      placed: 0,
      contractPeriod: "6 months",
      visibility: "Global",
      logo: "https://opstree.com/wp-content/uploads/2024/10/FavIcon-OpsTree-100x100.png",
    },
    {
      id: 8,
      role: "Senior Designer",
      status: "Open",
      datePosted: "16-05-2024",
      applicants: 4,
      client: "Visionary Designs Ltd.",
      requirementType: "Hybrid",
      noOfPositions: 5,
      placed: 1,
      contractPeriod: "12 months",
      visibility: "Empaneled",
      logo: "https://www.visionarydesign.co.in/wp-content/uploads/2019/09/favicon.png",
    },
    {
      id: 9,
      role: "Visual Designer",
      status: "On hold",
      datePosted: "15-05-2024",
      applicants: 2,
      client: "Creative Solutions Ltd.",
      requirementType: "Onsite",
      noOfPositions: 2,
      placed: 0,
      contractPeriod: "3 months",
      visibility: "Limited",
      logo: "https://cdn.creative-sols.com/assets/img/favicon-32x32.png",
    },
    {
      id: 10,
      role: "Data Science",
      status: "Closed",
      datePosted: "13-05-2024",
      applicants: 7,
      client: "Data Insights Group",
      requirementType: "Remote",
      noOfPositions: 10,
      placed: 4,
      contractPeriod: "9 months",
      visibility: "Global",
      logo: "https://data-insights.com/wp-content/uploads/2018/01/DataInsights_favicon-01.png",
    },
  ];

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

  useEffect(() => {
    // Filtering logic
    const filtered = jobDataOrg.filter((item) => {
      // Check client filter
      const clientMatch =
        searchFilter.client.length === 0 ||
        searchFilter.client.includes(item.client);
      // Check status filter
      const statusMatch =
        searchFilter.status.length === 0 ||
        searchFilter.status.includes(item.status);
      // Check requirement type filter
      const requirementTypeMatch =
        searchFilter.requirementType.length === 0 ||
        searchFilter.requirementType.includes(item.requirementType);
      // Check search input
      const searchMatch =
        searchFilter.searchValue === "" ||
        item.role
          .toLowerCase()
          .includes(searchFilter.searchValue.toLowerCase());
      const applicantMatch = !searchFilter.isApplicant || item.applicants <= 0;
      return (
        clientMatch &&
        statusMatch &&
        requirementTypeMatch &&
        searchMatch &&
        applicantMatch
      );
    });
    setJobData(filtered);
  }, [searchFilter]);

  const handleStatusDialog = (status: string) => {
    setIsDialogOpen(true);
    setSelectedStatus(status);
  };

  const getRequirementsData = () => {
    getRequirementsList().then((result: any) => {
      if (result) {
        SetRequirementData(result);
      }
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
          <table>
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
            <tbody>
              {requirementData.map((requirement, index) => (
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
                        onClick={() => handleRowClick(requirement.uniqueId, "client")}
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
                            {requirement?.clientName || '-'}
                          </span>
                        </Tooltip>
                      </div>
                      <div className="flex w-[128px]">
                        <div className="flex items-center ms-1">
                          <LocationOnOutlined
                            fontSize="inherit"
                            className="mr-1"
                          />
                          <span>{requirement?.locationTypeName || '-'}</span>
                        </div>
                        <div className="flex items-center ms-1">
                          <AccessTimeOutlined
                            fontSize="inherit"
                            className="mr-1"
                          />
                          <span>{requirement?.duration || '-'}</span>
                        </div>
                      </div>
                    </div>
                  </th>
                  <td>
                    <Typography
                      className={`inline-block px-3 py-1 !text-base cursor-pointer rounded-full ${
                        requirement?.status === "Open"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                      onClick={() => handleStatusDialog(requirement?.status)}
                    >
                      {requirement?.status || '-'}
                    </Typography>
                  </td>
                  <td>{moment(requirement?.createdOn).format("DD-MM-YYYY")}</td>
                  <td
                    className="cursor-pointer hover:text-indigo-700"
                    onClick={() => handleRowClick(requirement?.uniqueId, "myvendors")}
                  >
                    {requirement?.positions || 0} (0)
                  </td>
                  <td
                    className="cursor-pointer  hover:text-indigo-700"
                    onClick={() => handleRowClick(requirement.uniqueId, "applicant")}
                  >
                    {requirement?.applicants || '-'}
                  </td>
                  <td>{requirement?.visibilityName || '-'}</td>
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
