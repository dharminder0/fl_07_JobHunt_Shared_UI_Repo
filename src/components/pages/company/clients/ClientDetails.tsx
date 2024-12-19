import React, { useEffect } from "react";
import { Typography, Box, Tabs, Tab, Link, Grid2 } from "@mui/material";
import { Language, MailOutline, Phone } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const ClientDetails = () => {
  const location = useLocation();
  const params = location.state || {};
  const [value, setValue] = React.useState("active");
  const handleRowClick = (id: any) => {};

  useEffect(() => {
    if (params) {
      !params.type ? setValue("active") : setValue(params.type);
    }
  }, [params.type]);

  const activeContracts = [
    {
      id: 1,
      title: "Social Media Assistant",
      startDate: "20-04-2024",
      endDate: "12-08-2024",
      client: "Fleek IT Solutions",
      resource: "Raj Kumar",
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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header Section */}
      <div className="mb-6 ">
        <div className="flex items-center gap-4 mb-4">
          <div>
            <img
              src={
                "https://assets.airtel.in/static-assets/new-home/img/favicon-16x16.png"
              }
              style={{ width: 65, height: 65 }}
            />
          </div>
          <div>
            <p className="text-heading">Airtel</p>
            <div className="mt-1 text-base flex-col flex">
              <Link href="mailto:sales@fleekitsolutions.com" underline="none">
                <MailOutline fontSize="inherit" /> sales@airtel.com
              </Link>
              <Link href="tel:+91 971181234" underline="none">
                <Phone fontSize="inherit" /> +91 8811818880
              </Link>
              <Link href="www.fleekitsolutions.com" underline="none">
                <Language fontSize="inherit" /> www.airtel.com
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
                <Tab value="active" label="Active Contracts" />
                <Tab value="past" label="Past Contracts" />
                <Tab value="open" label="Open Positions" />
              </Tabs>
              {value === "active" && (
                <div className="table-body mt-4">
                  <table>
                    <thead>
                      <tr>
                        <th className="add-right-shadow">Title</th>
                        <th>Vendor</th>
                        <th>Resource</th>
                        <th>Start Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeContracts.map((item, index) => (
                        <tr key={index} onClick={() => handleRowClick(item.id)}>
                          <th className="add-right-shadow">{item.title}</th>
                          <td className="wide-250">
                            <div className="flex">
                              <img
                                src={item.vendorLogo}
                                style={{ height: 16, width: 16 }}
                                className="me-1"
                              />
                              {item.client}
                            </div>
                          </td>
                          <td>{item.resource}</td>
                          <td>{item.startDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {value === "past" && (
                <div className="table-body mt-4">
                  <table>
                    <thead>
                      <tr>
                        <th className="add-right-shadow">Title</th>
                        <th>Vendor</th>
                        <th>Resource</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeContracts.map((item, index) => (
                        <tr key={index} onClick={() => handleRowClick(item.id)}>
                          <th className="add-right-shadow">{item.title}</th>
                          <td className="wide-250">
                            <div className="flex">
                              <img
                                src={item.vendorLogo}
                                style={{ height: 16, width: 16 }}
                                className="me-1"
                              />
                              {item.client}
                            </div>
                          </td>
                          <td>{item.resource}</td>
                          <td>{item.startDate}</td>
                          <td>{item.endDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {value === "open" && (
                <div className="table-body mt-4">
                  <table>
                    <thead>
                      <tr>
                        <th className="add-right-shadow">Role</th>
                        {/* <th>Client</th> */}
                        <th>Date Posted</th>
                        <th>Requirement Type</th>
                        <th>No. of Positions</th>
                        <th>Contract period</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobData.map((job, index) => (
                        <tr key={index} onClick={() => handleRowClick(job.id)}>
                          <th className="add-right-shadow">{job.role}</th>
                          {/* <td>{job.client}</td> */}
                          <td>{job.datePosted}</td>
                          <td>{job.requirementType}</td>
                          <td>{job.noOfPositions}</td>
                          <td>{job.contractPeriod}</td>
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
    </div>
  );
};

export default ClientDetails;
