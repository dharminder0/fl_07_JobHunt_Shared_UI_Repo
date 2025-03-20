import React, { useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Link,
  Grid2,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import {
  AccessTimeOutlined,
  CorporateFareOutlined,
  Download,
  Language,
  LocationOnOutlined,
  MailOutline,
  Phone,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MatchingSkillsDialog from "../../../sharedComponents/MatchingSkillsDialog";
import { getClientDataByClientCode } from "../../../../components/sharedService/apiService";

const ClientDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const pathSegments = location.pathname.split("/");
  const clientCode = pathSegments[pathSegments.length - 1];
  const type = searchParams.get("type");
  const [value, setValue] = React.useState("activeView");
  const [previousUrl, setpreviousUrl] = React.useState("");
  const [clientData, setClientData] = React.useState<any>({});

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
      client: "Fleek IT Solutions",
      resource: "Raj Kumar",
      ai: 60,
      vendorLogo:
        "https://fleekitsolutions.com/wp-content/uploads/2023/09/favicon-32x32-1.png",
    },
    {
      id: 2,
      title: "Android Developer",
      startDate: "18-03-2024",
      endDate: "16-09-2024",
      client: "DevStringX Technologies",
      resource: "Sajid Sarkar",
      ai: 80,
      vendorLogo:
        "https://www.devstringx.com/wp-content/uploads/2018/03/favicon.ico",
    },
    {
      id: 3,
      title: "Angular Developer",
      startDate: "02-01-2024",
      endDate: "06-10-2024",
      client: "Binemiles Technologies",
      resource: "Amit Thakur",
      ai: 50,
      vendorLogo:
        "https://binmile.com/wp-content/uploads/2022/07/bmt-favicon.png",
    },
    {
      id: 4,
      title: "iOS Developer",
      startDate: "26-04-2024",
      endDate: "18-11-2024",
      client: "SDET Tech Pvt. Ltd",
      resource: "Harshit Pandey",
      ai: 50,
      vendorLogo:
        "https://sdettech.com/wp-content/themes/sdetech/assets/images/favicon.png",
    },
    {
      id: 1,
      title: "QA Automation",
      startDate: "13-05-2024",
      endDate: "10-12-2024",
      client: "JigNect Technologies",
      resource: "Vinod Agarwal",
      ai: 90,
      vendorLogo:
        "https://jignect.tech/wp-content/uploads/2023/01/cropped-JT-Main-ONLY-LOGO-01-192x192.png",
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
      client: "Self",
      requirementType: "Remote",
      noOfPositions: 3,
      contractPeriod: "6 months",
      visibility: "Global",
    },
    {
      id: 2,
      role: "Senior Designer",
      status: "On hold",
      datePosted: "16-05-2020",
      applicants: "1,234",
      client: "Creative Solutions Ltd.",
      requirementType: "Hybrid",
      noOfPositions: 5,
      contractPeriod: "12 months",
      visibility: "Empaneled",
    },
    {
      id: 3,
      role: "Visual Designer",
      status: "Open",
      datePosted: "15-05-2020",
      applicants: "2,435",
      client: "Design Pros Inc.",
      requirementType: "Onsite",
      noOfPositions: 2,
      contractPeriod: "3 months",
      visibility: "Limited",
    },
    {
      id: 4,
      role: "Data Science",
      status: "Closed",
      datePosted: "13-05-2020",
      applicants: "6,234",
      client: "Self",
      requirementType: "Remote",
      noOfPositions: 10,
      contractPeriod: "9 months",
      visibility: "Global",
    },
    {
      id: 5,
      role: "Kotlin Developer",
      status: "Closed",
      datePosted: "12-05-2020",
      applicants: "12",
      client: "Tech Innovators LLC",
      requirementType: "Hybrid",
      noOfPositions: 20,
      contractPeriod: "18 months",
      visibility: "Empaneled",
    },
  ];

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

  const handleRowClick = (id: number, tab: string) => {
    navigate(`/company/myvendors/${id}?type=${tab}`, {
      state: { previousUrl: location.pathname },
    });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(`?type=${newValue}`);
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
            size="small"
            onClick={() => {
              previousUrl ? navigate(previousUrl) : navigate("/company");
            }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <div>
            <Avatar
              alt="Org Icon"
              src={clientData?.faviconURL || undefined}
              className="rounded-full !h-12 !w-100 me-3"
            >
              {!clientData?.faviconURL && (
                <CorporateFareOutlined fontSize="small" />
              )}
            </Avatar>
          </div>
          <div>
            <p className="text-heading">{clientData?.clientName}</p>
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
        </div>
      </div>

      {/* Company Profile and Tech Stack */}
      <Grid2 container spacing={6}>
        {/* Company Profile */}
        <Grid2 size={12}>
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
              </Tabs>
              {value === "activeView" && (
                <div className="table-body mt-4">
                  <table>
                    <thead>
                      <tr>
                        <th className="add-right-shadow">Title</th>
                        {/* <th>Vendor</th> */}
                        <th>Resource</th>
                        <th>Start Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeContracts.map((item, index) => (
                        <tr key={index}>
                          {/* <th className="add-right-shadow">{item.title}</th> */}
                          <th className="add-right-shadow">
                            <div className="cursor-pointer hover:text-indigo-700">
                              {item.title}
                            </div>
                            <div className="flex items-center justify-between text-secondary-text text-info mt-1">
                              <div
                                className="flex items-center min-w-[135px] max-w-[150px] cursor-pointer hover:text-indigo-700"
                                onClick={() =>
                                  handleRowClick(item.id, "activeView")
                                }
                              >
                                <img
                                  src={item.vendorLogo}
                                  style={{ height: 12, width: 12 }}
                                  className="me-1"
                                />
                                <Tooltip title={item.client} arrow>
                                  <span className="text-ellipsis overflow-hidden truncate">
                                    {item.client}
                                  </span>
                                </Tooltip>
                              </div>
                              <div className="flex text-info items-center">
                                <div className="ms-2 text-indigo-500 cursor-pointer hover:text-indigo-700">
                                  <Download fontSize="inherit" />
                                  <span className="text-info">CV</span>
                                </div>
                              </div>
                            </div>
                          </th>
                          {/* <td className="wide-250">
                            <div className="flex">
                              <img
                                src={item.vendorLogo}
                                style={{ height: 16, width: 16 }}
                                className="me-1"
                              />
                              {item.client}
                            </div>
                          </td> */}
                          <td>{item.resource}</td>
                          <td>{item.startDate}</td>
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
                        {/* <th>Vendor</th> */}
                        <th>Resource</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeContracts.map((item, index) => (
                        <tr key={index}>
                          {/* <th className="add-right-shadow">{item.title}</th> */}
                          <th className="add-right-shadow">
                            <div className="cursor-pointer hover:text-indigo-700">
                              {item.title}
                            </div>
                            <div className="flex items-center justify-between text-secondary-text text-info mt-1">
                              <div
                                className="flex items-center min-w-[135px] max-w-[150px] cursor-pointer hover:text-indigo-700"
                                onClick={() =>
                                  handleRowClick(item.id, "pastView")
                                }
                              >
                                <img
                                  src={item.vendorLogo}
                                  style={{ height: 12, width: 12 }}
                                  className="me-1"
                                />
                                <Tooltip title={item.client} arrow>
                                  <span className="text-ellipsis overflow-hidden truncate">
                                    {item.client}
                                  </span>
                                </Tooltip>
                              </div>
                              <div className="flex text-info items-center">
                                <div className="ms-2 text-indigo-500 cursor-pointer hover:text-indigo-700">
                                  <Download fontSize="inherit" />
                                  <span className="text-info">CV</span>
                                </div>
                              </div>
                            </div>
                          </th>

                          {/* <td className="wide-250">
                            <div className="flex">
                              <img
                                src={item.vendorLogo}
                                style={{ height: 16, width: 16 }}
                                className="me-1"
                              />
                              {item.client}
                            </div>
                          </td> */}
                          <td>{item.resource}</td>
                          <td>{item.startDate}</td>
                          <td>{item.endDate}</td>
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
                        <tr key={index}>
                          {/* <th>{job.role}</th> */}
                          <th className="add-right-shadow">
                            <div> {job.role} </div>
                            <div className="flex items-center justify-between text-secondary-text text-info mt-1">
                              <div className="flex">
                                <div className="flex items-center">
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
                              <div className="flex items-center cursor-pointer hover:text-indigo-700">
                                <div className="flex items-center text-indigo-500 hover:text-indigo-700 ms-1">
                                  <Download
                                    fontSize="inherit"
                                    className="mr-1"
                                  />
                                  <span>CV</span>
                                </div>
                              </div>
                            </div>
                          </th>
                          {/* <td>{job.client}</td> */}
                          <td>{job.datePosted}</td>
                          {/* <td>{job.requirementType}</td> */}
                          <td>{job.noOfPositions}</td>
                          {/* <td>{job.contractPeriod}</td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Box>
          </div>
        </Grid2>
      </Grid2>
      <div></div>
    </div>
  );
};

export default ClientDetails;
