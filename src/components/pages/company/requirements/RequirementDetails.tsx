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
import {
  Search,
  FilterList,
  PictureAsPdf,
  Edit,
} from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const RequirementDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);

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
      logo: "https://fleekitsolutions.com/wp-content/uploads/2023/09/favicon-32x32-1.png",
    },
    {
      vendor: "DevStringX Technologies",
      name: "Raj Pathar",
      stage: "Shortlisted",
      date: "12-06-2024",
      logo: "https://www.devstringx.com/wp-content/uploads/2018/03/favicon.ico"
    },
    {
      vendor: "Binemiles Technologies",
      name: "Sajid Sarkar",
      stage: "Declined",
      date: "18-05-2024",
      logo: "https://binmile.com/wp-content/uploads/2022/07/bmt-favicon.png",
    },
    {
      vendor: "SDET Tech Pvt. Ltd",
      name: "Amit Kumar",
      stage: "Hired",
      date: "11-04-2024",
      logo: "https://sdettech.com/wp-content/themes/sdetech/assets/images/favicon.png",
    },
  ];

  const filteredApplicants = applicantData.filter((applicant) =>
    applicant.name.toLowerCase().includes(search.toLowerCase())
  );

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
              navigate("/company/myrequirements");
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
      {/* <RequirementDescription /> */}
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
                  {/* <CheckCircleIcon
                        className="text-green-500 mr-2"
                        fontSize="small"
                      /> */}
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
                  {/* <CheckCircleIcon
                        className="text-green-500 mr-2"
                        fontSize="small"
                      /> */}
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
                  {/* <CheckCircleIcon
                        className="text-green-500 mr-2"
                        fontSize="small"
                      /> */}
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
                  <th>Vendor</th>
                  <th>Status</th>
                  <th>Application Date</th>
                  <th>CV</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplicants.map((applicant, index) => (
                  <tr
                    className="cursor-pointer"
                    key={index}
                    // onClick={() => handleRowClick(applicant.id)}
                  >
                    <th className="add-right-shadow">{applicant.name}</th>                    
                    <td>
                      <div className="flex items-center wide-250">
                        <img
                          src={applicant.logo}
                          style={{ height: 16, width: 16 }}
                          className="me-1"
                        />
                        {applicant.vendor}
                      </div>
                    </td>
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
                    <td>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<PictureAsPdf />}
                      >
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* <Box className="flex justify-end mt-4">
            <Pagination count={2} />
          </Box> */}
        </>
      )}
    </div>
  );
};

export default RequirementDetails;
