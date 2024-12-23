import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  IconButton,
  Chip,
  Collapse,
} from "@mui/material";
import { Search, FilterList, PictureAsPdf, Edit, Download } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import MatchingSkillsDialog from "../../../../components/shared/MatchingSkillsDialog";

const VndRequirementDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [matchingScore, setMatchingScore] = React.useState(0);
  const [isMatchOpen, setIsMatchOpen] = React.useState(false);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

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
      stage: "Declined",
      date: "18-05-2024",
      ai: 80,
      logo: "https://binmile.com/wp-content/uploads/2022/07/bmt-favicon.png",
    },
    {
      vendor: "SDET Tech Pvt. Ltd",
      name: "Amit Kumar",
      stage: "Hired",
      date: "11-04-2024",
      ai: 90,
      logo: "https://sdettech.com/wp-content/themes/sdetech/assets/images/favicon.png",
    },
  ];

  const filteredApplicants = applicantData.filter((applicant) =>
    applicant.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleMatchingDialog = (score: number) => {
    setIsMatchOpen(true);
    setMatchingScore(score);
  };

  return (
    <div className="p-4">
      {/* Header */}
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
            Stripe is looking for a Social Media Marketing expert to help manage
            our online networks. You will be responsible for monitoring our
            social media channels, creating content, finding effective ways to
            engage the community and incentivize others to engage on our
            channels.
          </p>
        </div>

        <Collapse in={expanded}>
          {/* Responsibilities */}
          <Box className="mb-4">
            <p className="text-title mb-2">Responsibilities</p>
            <ul className="list-none space-y-1">
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

          {/* Who You Are */}
          <Box className="mb-4">
            <p className="text-gray-700 mb-2 text-title">Who You Are</p>
            <ul className="list-none space-y-1">
              {[
                "You get energy from people and building the ideal work environment",
                "You have a sense for beautiful spaces and office experiences",
                "You are a confident office manager, ready for added responsibilities",
                "You're detail-oriented and creative",
                "You're a growth marketer and know how to run campaigns",
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

          {/* Nice-To-Haves */}
          <Box className="mb-6">
            <p className="text-title text-gray-700 mb-2">Nice-To-Haves</p>
            <ul className="list-none space-y-1">
              {[
                "Fluent in English",
                "Project management skills",
                "Copy editing skills",
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
        </Collapse>
        {/* Read More / Read Less Button */}
        <Button
          variant="text"
          size="small"
          onClick={handleToggle}
          className="mt-2"
        >
          {expanded ? "Read Less" : "Read More"}
        </Button>
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
          <Box className="flex items-center justify-end my-2">
            <Box className="flex items-center space-x-4">
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search Applicants"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{ startAdornment: <Search className="mr-2" /> }}
              />
              <Button variant="outlined" startIcon={<FilterList />}>
                Filter
              </Button>
            </Box>
          </Box>
          <div className="table-body">
            <table>
              <thead>
                <tr>
                  <th className="add-right-shadow">Name</th>
                  {/* <th>Vendor</th> */}
                  <th>Status</th>
                  <th>Application Date</th>
                  {/* <th>CV</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredApplicants.map((applicant, index) => (
                  <tr
                    className="cursor-pointer"
                    key={index}
                    // onClick={() => handleRowClick(applicant.id)}
                  >
                    {/* <th className="add-right-shadow">{applicant.name}</th> */}
                    <th className="add-right-shadow">
                      <div>{applicant.name}</div>
                      <div className="flex items-center justify-end text-secondary-text text-info mt-1">                       
                        <div className="flex text-info items-center">
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
                              <title>ai</title>
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
                    {/* <td className="wide-250">
                      <div className="flex items-center">
                        <img
                          src={applicant.logo}
                          style={{ height: 16, width: 16 }}
                          className="me-1"
                        />
                        {applicant.vendor}
                      </div>
                    </td> */}
                    <td>
                      <Typography
                        className={`inline-block px-3 py-1 !text-base rounded-full ${
                          applicant.stage === "Hired"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {applicant.stage}
                      </Typography>
                    </td>
                    <td>{applicant.date}</td>
                    {/* <td>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<PictureAsPdf />}
                      >
                        Download
                      </Button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <MatchingSkillsDialog
        title="Matching Score Analysis"
        isMatchOpen={isMatchOpen}
        setIsMatchOpen={setIsMatchOpen}
        aiScore={matchingScore}
      />
    </div>
  );
};

export default VndRequirementDetails;
