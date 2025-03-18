import React, { useEffect } from "react";
import {
  Typography,
  Grid,
  Box,
  Tabs,
  Tab,
  Chip,
  Link,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import {
  AccessTimeOutlined,
  CorporateFareOutlined,
  Language,
  LocationOn,
  LocationOnOutlined,
  MailOutline,
  Phone,
  PictureAsPdf,
  WorkHistory,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getClientDataByClientCode } from "../../../../components/sharedService/apiService";

const VndClientDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pathSegments = location.pathname.split("/");
  const clientCode = pathSegments[pathSegments.length - 1];
  const type = searchParams.get("type");
  const [value, setValue] = React.useState("activeView");
  const [previousUrl, setpreviousUrl] = React.useState("");
  const [clientData, setClientData] = React.useState<any>({});
  const handleRowClick = (id: any) => {};

  useEffect(() => {
    if (location.state && location.state.previousUrl) {
      setpreviousUrl(location.state.previousUrl);
    }
    if (type) {
      !type ? setValue("activeView") : setValue(type);
    }
  }, [type, location.state]);

  const activeContracts = [
    {
      id: 1,
      title: "Social Media Assistant",
      startDate: "20-04-2024",
      endDate: "12-08-2024",
      client: "Teleperformance",
      resource: "Raj Kumar",
      logo: "https://www.teleperformance.com/css/assets/favicon.ico",
    },
    {
      id: 2,
      title: "Android Developer",
      startDate: "18-03-2024",
      endDate: "16-09-2024",
      client: "KPIT Technologiess",
      resource: "Sajid Sarkar",
      logo: "https://d1rz4ui464s6g7.cloudfront.net/wp-content/uploads/2024/05/20122313/kpit-favicon.png",
    },
    {
      id: 3,
      title: "Angular Developer",
      startDate: "02-01-2024",
      endDate: "06-10-2024",
      client: "Mphasis",
      resource: "Amit Thakur",
      logo: "https://www.mphasis.com/content/dam/mphasis-com/common/icons/favicon.ico",
    },
    {
      id: 4,
      title: "iOS Developer",
      startDate: "26-04-2024",
      endDate: "18-11-2024",
      client: "Fidelity Information Services",
      resource: "Harshit Pandey",
      logo: "https://www.fisglobal.com/-/media/fisglobal/images/Main/logos/FISfavicons/favicon-192x192.png",
    },
    {
      id: 1,
      title: "QA Automation",
      startDate: "13-05-2024",
      endDate: "10-12-2024",
      client: "Coforge",
      resource: "Vinod Agarwal",
      logo: "https://careers.coforge.com/coforge/favicon.ico",
    },
  ];

  const benchData = [
    {
      id: 1,
      resource: "Raj Pathar",
      skills: "Software Associate",
      experience: "8 years",
      location: "Noida",
      availability: "Immediate",
    },
    {
      id: 2,
      resource: "Harshit Tandon ",
      skills: "Front End Lead",
      experience: "8 years",
      location: "Noida",
      availability: "Immediate",
    },
    {
      id: 3,
      resource: "Sajid Sarkar ",
      skills: "Software Developer",
      experience: "4 years",
      location: "Noida",
      availability: "Immediate",
    },
    {
      id: 4,
      resource: "Vaibav Rastogi",
      skills: "Front End Developer",
      experience: "3 years",
      location: "Noida",
      availability: "Immediate",
    },
  ];

  const jobData = [
    {
      id: 1,
      role: "Social Media Assistant",
      status: "Open",
      datePosted: "20-05-2020",
      applicants: "19",
      client: "Teleperformance",
      requirementType: "Remote",
      noOfPositions: 3,
      contractPeriod: "6 months",
      visibility: "Global",
      logo: "https://www.teleperformance.com/css/assets/favicon.ico",
    },
    {
      id: 2,
      role: "Senior Designer",
      status: "On hold",
      datePosted: "16-05-2020",
      applicants: "1,234",
      client: "KPIT Technologiess",
      requirementType: "Hybrid",
      noOfPositions: 5,
      contractPeriod: "12 months",
      visibility: "Empaneled",
      logo: "https://d1rz4ui464s6g7.cloudfront.net/wp-content/uploads/2024/05/20122313/kpit-favicon.png",
    },
    {
      id: 3,
      role: "Visual Designer",
      status: "Open",
      datePosted: "15-05-2020",
      applicants: "2,435",
      client: "Mphasis",
      requirementType: "Onsite",
      noOfPositions: 2,
      contractPeriod: "3 months",
      visibility: "Limited",
      logo: "https://www.mphasis.com/content/dam/mphasis-com/common/icons/favicon.ico",
    },
    {
      id: 4,
      role: "Data Science",
      status: "Closed",
      datePosted: "13-05-2020",
      applicants: "6,234",
      client: "Fidelity Information Services",
      requirementType: "Remote",
      noOfPositions: 10,
      contractPeriod: "9 months",
      visibility: "Global",
      logo: "https://www.fisglobal.com/-/media/fisglobal/images/Main/logos/FISfavicons/favicon-192x192.png",
    },
    {
      id: 5,
      role: "Kotlin Developer",
      status: "Closed",
      datePosted: "12-05-2020",
      applicants: "12",
      client: "Coforge",
      requirementType: "Hybrid",
      noOfPositions: 20,
      contractPeriod: "18 months",
      visibility: "Empanelled",
      logo: "https://careers.coforge.com/coforge/favicon.ico",
    },
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(`?type=${newValue}`);
  };

  useEffect(() => {
    getClientData();
  }, [clientCode]);

  const getClientData = () => {
    getClientDataByClientCode(clientCode)
      .then((result: any) => {
        if (result && Object.keys(result).length > 0) {
          setClientData(result);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header Section */}
      <div className="mb-6 ">
        <div className="flex items-center gap-4 mb-4">
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            className="!w-[50px] !h-[50px]"
            onClick={() => {
              navigate(previousUrl);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <div>
            <Avatar
              alt="Org Icon"
              src={clientData?.faviconURL || undefined}
              className="rounded-full !h-12 w-100 me-3"
            >
              {!clientData?.faviconURL && (
                <CorporateFareOutlined fontSize="small" />
              )}
            </Avatar>
          </div>
          <div>
            <p className="text-heading">{clientData?.clientName}</p>

            <div className="mt-1">
              <Chip
                label="Web Development"
                variant="outlined"
                sx={{ fontSize: 12 }}
                className="my-1 me-1"
              />
              <Chip
                label="Mobile App Development"
                variant="outlined"
                sx={{ fontSize: 12 }}
                className="my-1 me-1"
              />
              <Chip
                label="DevOps"
                variant="outlined"
                sx={{ fontSize: 12 }}
                className="my-1 me-1"
              />
              <Chip
                label="QA"
                variant="outlined"
                sx={{ fontSize: 12 }}
                className="my-1 me-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Company Profile and Tech Stack */}
      <Grid container spacing={6}>
        {/* Company Profile */}
        <Grid item xs={12} md={9}>
          <div className="mt-2">
            <p className="text-gray-700 text-base">{clientData.description}</p>
          </div>
          <div className="my-2">
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
              >
                <Tab value="activeView" label="Active Contracts" />
                <Tab value="pastView" label="Past Contracts" />
                <Tab value="openView" label="Open Positions" />
                <Tab value="benchView" label="Bench Strength" />
              </Tabs>
              {value === "activeView" && (
                <div className="table-body mt-4">
                  <table>
                    <thead>
                      <tr>
                        <th className="add-right-shadow">Title</th>
                        <th>Start Date</th>
                        <th>Resource</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeContracts.map((item, index) => (
                        <tr key={index} onClick={() => handleRowClick(item.id)}>
                          {/* <th className="add-right-shadow">{item.title}</th> */}
                          <th className="add-right-shadow">
                            {item.title}
                            <div className="flex items-center justify-between text-secondary-text text-info mt-1">
                              <div className="flex items-center min-w-[135px] max-w-[150px] cursor-pointer hover:text-indigo-700">
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
                          </th>
                          <td>{item.startDate}</td>
                          <td>{item.resource}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {value === "pastView" && (
                <div className="table-body mt-4">
                  <table>
                    <thead>
                      <tr>
                        <th className="add-right-shadow">Title</th>
                        {/* <th>Client</th> */}
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Resource</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeContracts.map((item, index) => (
                        <tr key={index} onClick={() => handleRowClick(item.id)}>
                          <th className="add-right-shadow">
                            {item.title}
                            <div className="flex items-center justify-between text-secondary-text text-info mt-1">
                              <div className="flex items-center min-w-[135px] max-w-[150px] cursor-pointer hover:text-indigo-700">
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
                          </th>
                          {/* <td className="wide-250">
                            <div className="flex">
                              <img
                                src={item.logo}
                                style={{ height: 16, width: 16 }}
                                className="me-1"
                              />
                              {item.client}
                            </div>
                          </td> */}
                          <td>{item.startDate}</td>
                          <td>{item.endDate}</td>
                          <td>{item.resource}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {value === "openView" && (
                <div className="table-body mt-4">
                  <table>
                    <thead>
                      <tr>
                        <th className="add-right-shadow">Role</th>
                        {/* <th>Client</th> */}
                        <th>Date Posted</th>
                        {/* <th>Requirement Type</th> */}
                        <th>No. of Positions</th>
                        {/* <th>Contract period</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {jobData.map((job, index) => (
                        <tr key={index} onClick={() => handleRowClick(job.id)}>
                          {/* <th className="add-right-shadow">{job.role}</th> */}
                          <th className="add-right-shadow">
                            <div className="cursor-pointer hover:text-indigo-700">
                              {job.role}
                            </div>
                            <div className="flex items-center justify-between text-secondary-text text-info mt-1">
                              <div className="flex items-center min-w-[135px] max-w-[150px] cursor-pointer hover:text-indigo-700">
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
                          {/* <td className="wide-250">
                            <div className="flex">
                              <img
                                src={job.logo}
                                style={{ height: 16, width: 16 }}
                                className="me-1"
                              />
                              {job.client}
                            </div>
                          </td> */}
                          <td>{job.datePosted}</td>
                          {/* <td>
                            <Typography
                              className={`px-3 py-1 rounded-full !text-base text-center ${job.requirementType === "Onsite"
                                ? "text-blue-700 border border-blue-700"
                                : "text-yellow-700 border border-yellow-700"
                                }`}
                            >
                              {job.requirementType}
                            </Typography>
                          </td> */}
                          <td>{job.noOfPositions}</td>
                          {/* <td>{job.contractPeriod}</td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {value === "benchView" && (
                <div className="table-body mt-4">
                  <table>
                    <thead>
                      <tr>
                        <th className="add-right-shadow">Resource name</th>
                        <th>Skill Set</th>
                        {/* <th>Experience</th> */}
                        {/* <th>Location</th> */}
                        <th>Availability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {benchData.map((item, index) => (
                        <tr key={index} onClick={() => handleRowClick(item.id)}>
                          <th className="add-right-shadow">
                            {item.resource}
                            <div className="flex items-center justify-between text-secondary-text text-info mt-1">
                              <div className="flex items-center min-w-[135px] max-w-[150px]">
                                <div className="flex">
                                  <p>
                                    <WorkHistory fontSize="inherit" />{" "}
                                    {item.experience}
                                  </p>
                                  <p className="ms-1">
                                    <LocationOn fontSize="inherit" />{" "}
                                    {item.location}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </th>
                          <td>{item.skills}</td>
                          {/* <td>{item.experience}</td>
                          <td>{item.location}</td> */}
                          <td>{item.availability}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Box>
          </div>
        </Grid>

        {/* Tech Stack and Office Location */}
        <Grid item xs={12} md={3}>
          <div>
            <h5 className="text-heading mb-2">Contact Information</h5>
            <div className="mt-1 text-base flex-col flex">
              <Link
                href={`mailto:${clientData?.contactEmail}`}
                underline="none"
              >
                <MailOutline fontSize="inherit" /> {clientData?.contactEmail}
              </Link>
              <Link href={`tel:${clientData?.contactPhone}`} underline="none">
                <Phone fontSize="inherit" /> {clientData?.contactPhone}
              </Link>
              <Link href="www.fleekitsolutions.com" underline="none">
                <Language fontSize="inherit" />
                {clientData?.website}
              </Link>
            </div>
          </div>
          <div className="mt-4">
            <h5 className="text-heading mb-2">Office Location</h5>
            <ul className="text-gray-700 text-base">
              <li>
                <LocationOnOutlined fontSize="small" /> Noida
              </li>
              <li>
                <LocationOnOutlined fontSize="small" /> Gurgaon
              </li>
              <li>
                <LocationOnOutlined fontSize="small" /> Delhi(NCR)
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <h5 className="text-heading mb-2">Resource Offering</h5>

            <Chip
              label="Remote"
              variant="outlined"
              sx={{ fontSize: 12 }}
              className="my-1 me-1"
            />

            <Chip
              label="Onsite"
              variant="outlined"
              sx={{ fontSize: 12 }}
              className="my-1 me-1"
            />

            <Chip
              label="Hybrid"
              variant="outlined"
              sx={{ fontSize: 12 }}
              className="my-1 me-1"
            />
          </div>
          <div className="mt-4">
            <h5 className="text-heading mb-2">Company Deck</h5>
            <PictureAsPdf fontSize="large" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default VndClientDetails;
