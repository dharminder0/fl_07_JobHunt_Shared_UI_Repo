import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Chip,
  Tooltip,
} from "@mui/material";
import { Edit, Download, CorporateFareOutlined } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import MatchingSkillsDialog from "../../../sharedComponents/MatchingSkillsDialog";
import StatusDialog from "../../../sharedComponents/StatusDialog";
import {
  getRequirementsListById,
  getRequirementApplicants,
  getRequirementsList,
} from "../../../../components/sharedService/apiService";
import moment from "moment";
import { ApplicantsStatus } from "../../../../components/sharedService/shareData";
import { RoleType } from "../../../../components/sharedService/enums";

const VndRequirementDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const activeRole = localStorage.getItem("activeRole") || "";
  const [activeTab, setActiveTab] = useState(0);
  const [matchingScore, setMatchingScore] = React.useState(0);
  const [isMatchOpen, setIsMatchOpen] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState("New");
  const [searchText, setSearchText] = React.useState("");
  const [requirementData, setRequirementData] = useState<any>(null);
  const [similiarData, SetSimiliarData] = useState<any>(null);
  const [applicantData, setApplicantData] = useState<any[]>([]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleStatusDialog = (status: string) => {
    setIsDialogOpen(true);
    setSelectedStatus(status);
  };

  const handleMatchingDialog = (score: number) => {
    setIsMatchOpen(true);
    setMatchingScore(score);
  };

  const getRequirementDetails = (id: number) => {
    navigate(`/vendor/requirements/${id}`);
  };

  const pathSegments = document.location.pathname.split("/");
  const uniqueId = pathSegments.pop();
  useEffect(() => {
    getRequirementsData(uniqueId);
    getRequirementApplicant(uniqueId);
    getRequirementsSimiliarData();
  }, [uniqueId]);

  const getRequirementsData = (uniqueId: any) => {
    getRequirementsListById(uniqueId).then((result: any) => {
      if (result) {
        setRequirementData(result);
      }
    });
  };
  const getRequirementApplicant = (uniqueId: any) => {
    const payload = {
      requirementUniqueId: uniqueId,
      page: 1,
      pageSize: 10,
    };
    getRequirementApplicants(payload).then((result: any) => {
      if (result.count >= 0) {
        setApplicantData(result.list);
      }
    });
  };

  const getRequirementsSimiliarData = () => {
    const payload = {
      orgCode: userData.orgCode,
      searchText: searchText,
      page: 1,
      pageSize: 5,
      status: [1],
      userId: userData.userId,
      roleType: [activeRole === "vendor" && RoleType.Vendor],
    };

    getRequirementsList(payload).then((result: any) => {
      if (result && result?.totalPages > 0) {
        SetSimiliarData(result.list);
      } else {
        SetSimiliarData([]);
      }
    });
  };

  return (
    <div className="flex">
      {/* Header */}

      <div className="w-[70%] min-h-screen p-3">
        <Box className="flex justify-between items-center">
          <div className="flex flex-row gap-3">
            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              className="!w-[50px] !h-[50px]"
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <h5 className="text-heading group/item flex items-center">
                {requirementData?.title}
                <div className="group/edit invisible group-hover/item:visible">
                  <span className="group-hover/edit:text-gray-700 ">
                    <IconButton aria-label="edit" sx={{ marginLeft: 2 }}>
                      <Edit fontSize="small" />
                    </IconButton>
                  </span>
                </div>
              </h5>
              <div className="flex items-center">
                {requirementData?.clientLogo && (
                  <img
                    src={requirementData?.clientLogo}
                    alt=""
                    style={{ width: 16, height: 16 }}
                  />
                )}
                <p className="text-title mx-2">
                  {" "}
                  {requirementData?.clientName}
                </p>

                <div>
                  {requirementData?.locationTypeName && (
                    <Chip
                      label={requirementData?.locationTypeName}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: 10 }}
                      className="my-1 me-1"
                    />
                  )}
                  {requirementData?.clientName && (
                    <Chip
                      label={`Positions: ${requirementData?.positions}`}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: 10 }}
                      className="my-1 me-1"
                    />
                  )}
                  {requirementData?.experience && (
                    <Chip
                      label={requirementData?.experience}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: 10 }}
                      className="my-1 me-1"
                    />
                  )}

                  {requirementData?.visibilityName && (
                    <Chip
                      label={requirementData?.visibilityName}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: 10 }}
                      className="my-1 me-1"
                    />
                  )}
                </div>
              </div>
            </Box>
          </div>
        </Box>
        <div>
          {/* Description */}
          <div className="mb-4 mt-2">
            <p className="text-gray-600 text-base">
              {requirementData?.description}
            </p>
          </div>

          {/* Responsibilities */}
          <Box>
            <p className="text-title mb-2">Responsibilities</p>
            <p className="text-gray-600 text-base">
              {requirementData?.remarks}
            </p>
          </Box>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Applicants" />
          <Tab label="Analytics" />
        </Tabs>

        {activeTab == 0 && (
          <>
            <div className="table-body mt-3">
              <table>
                <thead>
                  <tr>
                    <th className="add-right-shadow">Name</th>
                    <th>Status</th>
                    <th>Application Date</th>
                  </tr>
                </thead>
                <tbody>
                  {applicantData.map((applicant, index) => (
                    <tr
                      key={index}
                      // onClick={() => handleRowClick(applicant.id)}
                    >
                      <th className="add-right-shadow">
                        <div className="flex items-center justify-between text-info mt-1">
                          <div className="text-base">
                            {applicant?.firstName + " " + applicant?.lastName}
                          </div>
                          <div className="flex text-info items-center text-secondary-text">
                            <div
                              className="flex cursor-pointer"
                              onClick={() =>
                                handleMatchingDialog(applicant?.ai || 74)
                              }
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
                              <span> {applicant?.ai || 74}%</span>
                            </div>
                            <div className="ms-2 text-indigo-500 cursor-pointer hover:text-indigo-700 ">
                              <Download fontSize="inherit" />
                              <span className="text-info">CV</span>
                            </div>
                          </div>
                        </div>
                      </th>
                      <td>
                        <Typography
                          className={`inline-block px-3 py-1 !text-base rounded-full cursor-pointer ${
                            applicant.statusName === "Placed"
                              ? "bg-green-100 text-green-700"
                              : applicant.statusName === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : applicant.statusName === "New"
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-indigo-100 text-indigo-700"
                          }`}
                          onClick={() =>
                            handleStatusDialog(applicant.statusName)
                          }
                        >
                          {applicant.statusName}
                        </Typography>
                      </td>
                      <td>
                        {moment(applicant.applicationDate).format("DD-MM-YYYY")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <div className="w-[30%] border-s p-3">
        <div className="text-title mb-3 mt-1">Similar Requirements</div>
        {similiarData?.length > 0 ? (
          similiarData.map((item: any) => (
            <div
              className="mb-2 border rounded-md p-2 cursor-pointer hover:border-indigo-700 hover:bg-primary-hover"
              onClick={() => getRequirementDetails(item?.uniqueId)}
            >
              <div className="flex items-center justify-between">
                <div className="text-base text-ellipsis overflow-hidden truncate">
                  {item.title}
                </div>
                <div className="flex text-secondary-text text-info">
                  <div>{item?.matchingCandidate || 2} Matching Candidates</div>
                </div>
              </div>
              <div className="flex items-center justify-between flex-wrap text-secondary-text text-info mt-1">
                <div className="flex items-center w-full">
                  {!item.clientLogo ? (
                    <CorporateFareOutlined fontSize="medium" />
                  ) : (
                    <img
                      src={item.clientLogo}
                      style={{ height: 12, width: 12 }}
                      className="me-1"
                    />
                  )}
                  <Tooltip title={item.clientName} arrow>
                    <span className="text-ellipsis overflow-hidden truncate">
                      {item.clientName}
                    </span>
                  </Tooltip>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <p className="text-base text-center">No Data Available</p>
          </>
        )}
      </div>

      <MatchingSkillsDialog
        title="Matching Score Analysis"
        isMatchOpen={isMatchOpen}
        setIsMatchOpen={setIsMatchOpen}
        aiScore={matchingScore}
      />

      <StatusDialog
        title="Applicant Status"
        statusData={ApplicantsStatus}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        selectedStatus={selectedStatus}
        isVendor={true}
      />
    </div>
  );
};

export default VndRequirementDetails;
