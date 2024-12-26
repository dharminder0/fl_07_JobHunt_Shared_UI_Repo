import { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  InputAdornment,
  Tooltip,
  IconButton,
  Drawer,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AccessTimeOutlined,
  AccountCircleOutlined,
  LocationOn,
  LocationOnOutlined,
  WorkHistory,
} from "@mui/icons-material";
import MenuDrpDwn from "../../../../components/shared/MenuDrpDwn";
import MatchingSkillsDialog from "../../../../components/shared/MatchingSkillsDialog";
import SuccessDialog from "../../../../components/shared/SuccessDialog";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import SearchIcon from "@mui/icons-material/Search";
import VndBench from "../bench/VndBench";
import StatusDialog from "../../../../components/shared/StatusDialog";
import React from "react";

const VndRequirements = ({ benchDrawerData = {} }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = location.state || {};
  const paramStatus = !params?.status
    ? benchDrawerData?.status
    : params?.status;
  const [drawerObj, setDrawerObj] = useState({ dataObj: {}, isOpen: false });
  const [matchingObj, setMatchingObj] = useState({ isOpen: false, score: 0 });
  const [jobData, setJobData] = useState<any[]>([]);
  const [isSuccessPopup, setIsSuccessPopup] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState("Open");

  const [filterList, setFilterList] = useState<any>({
    client: [
      "Teleperformance",
      "KPIT Technologies",
      "Mphasis",
      "Fidelity Information Services",
      "Coforge",
    ],
    status: ["Open", "On hold", "Closed"],
    requirementType: ["Remote", "Hybrid", "Onsite"],
  });
  const [searchFilter, setSearchFilter] = useState<any>({
    searchValue: "",
    client: "",
    status: !paramStatus ? "" : paramStatus,
    requirementType: "",
  });

  const jobDataOrg = [
    {
      id: 1,
      role: "Social Media Assistant",
      status: "Open",
      datePosted: "20-11-2024",
      applicants: "5",
      client: "Teleperformance",
      requirementType: "Remote",
      noOfPositions: 3,
      placed: 1,
      contractPeriod: "6 months",
      logo: "https://www.teleperformance.com/css/assets/favicon.ico",
      aiScore: 60,
      matchingCandidate: 3,
    },
    {
      id: 2,
      role: "Senior Designer",
      status: "On hold",
      datePosted: "23-09-2024",
      applicants: "2",
      client: "KPIT Technologies",
      requirementType: "Hybrid",
      noOfPositions: 5,
      placed: 0,
      contractPeriod: "12 months",
      logo: "https://d1rz4ui464s6g7.cloudfront.net/wp-content/uploads/2024/05/20122313/kpit-favicon.png",
      aiScore: 70,
      matchingCandidate: 2,
    },
    {
      id: 3,
      role: "Visual Designer",
      status: "Open",
      datePosted: "13-07-2024",
      applicants: "1",
      client: "Mphasis",
      requirementType: "Onsite",
      noOfPositions: 2,
      placed: 0,
      contractPeriod: "3 months",
      logo: "https://www.mphasis.com/content/dam/mphasis-com/common/icons/favicon.ico",
      aiScore: 80,
      matchingCandidate: 1,
    },
    {
      id: 4,
      role: "Data Science",
      status: "Closed",
      datePosted: "06-06-2024",
      applicants: "1",
      client: "Fidelity Information Services",
      requirementType: "Remote",
      noOfPositions: 4,
      placed: 0,
      contractPeriod: "9 months",
      logo: "https://www.fisglobal.com/-/media/fisglobal/images/Main/logos/FISfavicons/favicon-192x192.png",
      aiScore: 66,
      matchingCandidate: 4,
    },
    {
      id: 5,
      role: "Kotlin Developer",
      status: "Closed",
      datePosted: "01-05-2024",
      applicants: "3",
      client: "Coforge",
      requirementType: "Hybrid",
      noOfPositions: 8,
      placed: 1,
      contractPeriod: "18 months",
      logo: "https://careers.coforge.com/coforge/favicon.ico",
      aiScore: 75,
      matchingCandidate: 1,
    },
    {
      id: 5,
      role: "Flutter Developer",
      status: "Open",
      datePosted: "01-05-2024",
      applicants: "2",
      client: "KPIT Technologies",
      requirementType: "Hybrid",
      noOfPositions: 6,
      placed: 1,
      contractPeriod: "18 months",
      logo: "https://d1rz4ui464s6g7.cloudfront.net/wp-content/uploads/2024/05/20122313/kpit-favicon.png",
      aiScore: 80,
      matchingCandidate: 2,
    },
  ];

  const handleRowClick = (id: number) => {
    if (!benchDrawerData.isOpen) {
      navigate(`${id}`);
    } else {
      window.open(
        window.location.origin + `/vendor/requirements/${id}`,
        "_blank"
      );
    }
  };

  const handleClickToClient = (id: number, tab: string) => {
    if (!benchDrawerData.isOpen) {
      if (tab) {
        navigate(`/vendor/clients/${id}?type=${tab}`, {
          state: { previousUrl: location.pathname },
        });
      }
    }
  };

  const handleDrawer = (data: object, isOpen: boolean) => {
    if (benchDrawerData.isOpen) {
      setIsSuccessPopup(true);
    } else {
      setDrawerObj((prev) => ({ ...prev, dataObj: data, isOpen: isOpen }));
    }
  };

  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerObj((prev) => ({ ...prev, isOpen: open }));
  };

  const handleMatchingDialog = (score: number) => {
    setMatchingObj((prev) => ({ ...prev, isOpen: true, score: score }));
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
        searchFilter.status?.length === 0 ||
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

      return clientMatch && statusMatch && requirementTypeMatch && searchMatch;
    });
    setJobData(filtered);
  }, [searchFilter]);

  const handleStatusDialog = (status: string) => {
    setIsDialogOpen(true);
    setSelectedStatus(status);
  };

  return (
    <>
      <div className="px-2 py-3 h-full">
        <div className="flex flex-row gap-1 justify-between items-center mb-1">
          <div>
            {benchDrawerData?.isOpen && (
              <div className="flex items-center">
                <div className="me-2">
                  <AccountCircleOutlined
                    fontSize="large"
                    className="text-secondary-text"
                  />
                </div>
                <div>
                  <p className="text-title">
                    {benchDrawerData?.data?.resource}
                  </p>
                  <div className="flex text-info text-secondary-text">
                    <p>
                      <WorkHistory fontSize="inherit" />{" "}
                      {benchDrawerData?.data?.experience}
                    </p>
                    <p className="ms-1">
                      <LocationOn fontSize="inherit" />{" "}
                      {benchDrawerData?.data?.location}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
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
                <th>Positions (Placed)</th>
                <th>Applicants</th>
              </tr>
            </thead>
            <tbody>
              {jobData.map((job, index) => (
                <tr key={index}>
                  <th className="add-right-shadow">
                    <div className="flex items-center justify-between">
                      <div
                        onClick={() => handleRowClick(job.id)}
                        className="cursor-pointer hover:text-indigo-700"
                      >
                        {job.role}
                      </div>
                      <div className="flex text-secondary-text text-info">
                        <div className="mx-2">
                          {benchDrawerData?.isOpen && (
                            <div
                              className="flex justify-end cursor-pointer hover:text-indigo-700"
                              onClick={() => handleMatchingDialog(job.aiScore)}
                            >
                              <svg
                                width="14px"
                                height="14px"
                                viewBox="0 0 512 512"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g
                                  id="Page-1"
                                  stroke="none"
                                  stroke-width="1"
                                  fill="none"
                                  fill-rule="evenodd"
                                >
                                  <g
                                    id="icon"
                                    fill="#4640DE"
                                    transform="translate(64.000000, 64.000000)"
                                  >
                                    <path
                                      d="M320,64 L320,320 L64,320 L64,64 L320,64 Z M171.749388,128 L146.817842,128 L99.4840387,256 L121.976629,256 L130.913039,230.977 L187.575039,230.977 L196.319607,256 L220.167172,256 L171.749388,128 Z M260.093778,128 L237.691519,128 L237.691519,256 L260.093778,256 L260.093778,128 Z M159.094727,149.47526 L181.409039,213.333 L137.135039,213.333 L159.094727,149.47526 Z M341.333333,256 L384,256 L384,298.666667 L341.333333,298.666667 L341.333333,256 Z M85.3333333,341.333333 L128,341.333333 L128,384 L85.3333333,384 L85.3333333,341.333333 Z M170.666667,341.333333 L213.333333,341.333333 L213.333333,384 L170.666667,384 L170.666667,341.333333 Z M85.3333333,0 L128,0 L128,42.6666667 L85.3333333,42.6666667 L85.3333333,0 Z M256,341.333333 L298.666667,341.333333 L298.666667,384 L256,384 L256,341.333333 Z M170.666667,0 L213.333333,0 L213.333333,42.6666667 L170.666667,42.6666667 L170.666667,0 Z M256,0 L298.666667,0 L298.666667,42.6666667 L256,42.6666667 L256,0 Z M341.333333,170.666667 L384,170.666667 L384,213.333333 L341.333333,213.333333 L341.333333,170.666667 Z M0,256 L42.6666667,256 L42.6666667,298.666667 L0,298.666667 L0,256 Z M341.333333,85.3333333 L384,85.3333333 L384,128 L341.333333,128 L341.333333,85.3333333 Z M0,170.666667 L42.6666667,170.666667 L42.6666667,213.333333 L0,213.333333 L0,170.666667 Z M0,85.3333333 L42.6666667,85.3333333 L42.6666667,128 L0,128 L0,85.3333333 Z"
                                      id="Combined-Shape"
                                    ></path>
                                  </g>
                                </g>
                              </svg>
                              <span> {job.aiScore}%</span>
                            </div>
                          )}
                        </div>
                        <div
                          className="cursor-pointer hover:text-indigo-700"
                          onClick={() =>
                            handleDrawer(
                              {
                                role: job.role,
                                client: job.client,
                                clientLogo: job.logo,
                              },
                              true
                            )
                          }
                        >
                          {job.matchingCandidate} Matching Candidates
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-secondary-text text-info mt-1">
                      <div
                        className="flex items-center min-w-[135px] max-w-[150px] cursor-pointer hover:text-indigo-700"
                        onClick={() =>
                          handleClickToClient(job.id, "activeView")
                        }
                      >
                        <img
                          src={job.logo}
                          style={{ height: 12, width: 12 }}
                          className="me-1"
                        />
                        <Tooltip title={job.client} arrow>
                          <span className="text-ellipsis overflow-hidden truncate">
                            {job.client}
                          </span>
                        </Tooltip>
                      </div>
                      <div className="flex w-[128px]">
                        <div className="flex items-center ms-1">
                          <LocationOnOutlined
                            fontSize="inherit"
                            className="mr-1"
                          />
                          <span>{job.requirementType}</span>
                        </div>
                        <div className="flex items-center ms-1">
                          <AccessTimeOutlined
                            fontSize="inherit"
                            className="mr-1"
                          />
                          <span>{job.contractPeriod}</span>
                        </div>
                      </div>
                    </div>
                  </th>
                  <td>
                    <Typography
                      className={`inline-block cursor-pointer px-3 py-1 !text-base rounded-full ${
                        job.status === "Open"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                      onClick={() => handleStatusDialog(job.status)}
                    >
                      {job.status}
                    </Typography>
                  </td>
                  <td>{job.datePosted}</td>
                  <td
                    className="cursor-pointer hover:text-indigo-700"
                    onClick={() => handleClickToClient(job.id, "openView")}
                  >
                    {job.noOfPositions} ({job.placed})
                  </td>
                  <td>{job.applicants}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Drawer
          anchor="right"
          open={drawerObj.isOpen}
          onClose={toggleDrawer(false)}
        >
          <div style={{ width: "calc(100vw - 250px)" }}>
            <VndBench drawerData={drawerObj} />
          </div>
        </Drawer>

        {benchDrawerData?.isOpen && (
          <MatchingSkillsDialog
            title="Matching Score Analysis"
            isMatchOpen={matchingObj.isOpen}
            setIsMatchOpen={(e: any) =>
              setMatchingObj((prev) => ({ ...prev, isOpen: e }))
            }
            aiScore={matchingObj?.score}
          />
        )}

        {isSuccessPopup && (
          <SuccessDialog
            isOpenModal={isSuccessPopup}
            setIsOpenModal={setIsSuccessPopup}
          />
        )}
      </div>

      <StatusDialog
        title="Applicant Status"
        statusData={filterList.status}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        selectedStatus={selectedStatus}
        isVendor={true}
      />
    </>
  );
};

export default VndRequirements;
