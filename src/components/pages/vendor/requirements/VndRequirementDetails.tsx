import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Chip,
  Tooltip,
} from "@mui/material";
import { Edit, Download } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import MatchingSkillsDialog from "../../../../components/shared/MatchingSkillsDialog";
import StatusDialog from "../../../../components/shared/StatusDialog";

const jobDataOrg = [
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
    status: "Hot",
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
const status = [
  "New",
  "In Review",
  "Shortlisted",
  "Technical Assessment",
  "Interview Round I",
  "Interview Round II",
  "Rejected",
  "Placed",
];
const VndRequirementDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const [matchingScore, setMatchingScore] = React.useState(0);
  const [isMatchOpen, setIsMatchOpen] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState("New");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const applicantData = [
    {
      vendor: "Fleek IT Solutions",
      name: "Harshit Tandon",
      stage: "In Review",
      date: "13-07-2024",
      ai: 60,
      logo: "https://fleekitsolutions.com/wp-content/uploads/2023/09/favicon-32x32-1.png",
    },
    {
      vendor: "DevStringX Technologies",
      name: "Raj Pathar",
      stage: "Shortlisted",
      date: "12-06-2024",
      ai: 70,
      logo: "https://www.devstringx.com/wp-content/uploads/2018/03/favicon.ico",
    },
    {
      vendor: "Binemiles Technologies",
      name: "Sajid Sarkar",
      stage: "Rejected",
      date: "18-05-2024",
      ai: 80,
      logo: "https://binmile.com/wp-content/uploads/2022/07/bmt-favicon.png",
    },
    {
      vendor: "SDET Tech Pvt. Ltd",
      name: "Amit Kumar",
      stage: "Placed",
      date: "11-04-2024",
      ai: 90,
      logo: "https://sdettech.com/wp-content/themes/sdetech/assets/images/favicon.png",
    },
  ];

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

  return (
    <div className="flex">
      {/* Header */}

      <div className="w-[70%]  p-3">
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
                Social Media Assistant
                <div className="group/edit invisible group-hover/item:visible">
                  <span className="group-hover/edit:text-gray-700 ">
                    <IconButton aria-label="edit" sx={{ marginLeft: 2 }}>
                      <Edit fontSize="inherit" />
                    </IconButton>
                  </span>
                </div>
              </h5>
              <div className="flex items-center">
                <img
                  src="https://assets.airtel.in/static-assets/new-home/img/favicon-16x16.png"
                  alt=""
                  style={{ width: 16, height: 16 }}
                />
                <p className="text-title mx-2">Airtel</p>

                <div>
                  <Chip
                    label="Remote"
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: 10 }}
                    className="my-1 me-1"
                  />
                  <Chip
                    label="Positions: 3"
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: 10 }}
                    className="my-1 me-1"
                  />
                  <Chip
                    label="6 months"
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: 10 }}
                    className="my-1 me-1"
                  />
                  <Chip
                    label="Global"
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: 10 }}
                    className="my-1 me-1"
                  />
                </div>
              </div>
            </Box>
          </div>
        </Box>
        <div>
          {/* Description */}
          <div className="mb-4 mt-2">
            <p className="text-gray-600 text-base">
              Stripe is looking for a Social Media Marketing expert to help
              manage our online networks. You will be responsible for monitoring
              our social media channels, creating content, finding effective
              ways to engage the community and incentivize others to engage on
              our channels.
            </p>
          </div>

          {/* Responsibilities */}
          <Box>
            <p className="text-title mb-2">Responsibilities</p>
            <ul className="list-none">
              {[
                "Community engagement to ensure that is supported and actively represented online",
                "Focus on social media content development and publication",
                "Marketing and strategy support",
                "Stay on top of trends on social media platforms, and suggest content ideas to the team",
                "Engage with online communities",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-600 text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
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
                          <div className="text-base">{applicant.name}</div>
                          <div className="flex text-info items-center text-secondary-text">
                            <div
                              className="flex cursor-pointer"
                              onClick={() => handleMatchingDialog(applicant.ai)}
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
                              <span> {applicant.ai}%</span>
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
                            applicant.stage === "Placed"
                              ? "bg-green-100 text-green-700"
                              : applicant.stage === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : applicant.stage === "New"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-indigo-100 text-indigo-700"
                          }`}
                          onClick={() => handleStatusDialog(applicant.stage)}
                        >
                          {applicant.stage}
                        </Typography>
                      </td>
                      <td>{applicant.date}</td>
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
        {jobDataOrg.map((item) => (
          <div
            className="mb-2 border rounded-md p-2 cursor-pointer hover:border-indigo-700 hover:bg-primary-hover"
            onClick={() => getRequirementDetails(item.id)}
          >
            <div className="flex items-center justify-between">
              <div className="text-base">{item.role}</div>
              <div className="flex text-secondary-text text-info">
                <div>{item.matchingCandidate} Matching Candidates</div>
              </div>
            </div>
            <div className="flex items-center justify-between flex-wrap text-secondary-text text-info mt-1">
              <div className="flex items-center w-full">
                <img
                  src={item.logo}
                  style={{ height: 12, width: 12 }}
                  className="me-1"
                />
                <Tooltip title={item.client} arrow>
                  <span className="text-ellipsis overflow-hidden truncate">
                    {item.client}
                  </span>
                </Tooltip>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MatchingSkillsDialog
        title="Matching Score Analysis"
        isMatchOpen={isMatchOpen}
        setIsMatchOpen={setIsMatchOpen}
        aiScore={matchingScore}
      />

      <StatusDialog
        title="Applicant Status"
        statusData={status}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        selectedStatus={selectedStatus}
        isVendor={true}
      />
    </div>
  );
};

export default VndRequirementDetails;
