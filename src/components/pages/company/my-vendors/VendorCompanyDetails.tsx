import React from "react";
import { Typography, Grid, Box, Tabs, Tab, Chip, Link } from "@mui/material";
import {
  Language,
  LocationOnOutlined,
  MailOutline,
  Phone,
  PictureAsPdf,
} from "@mui/icons-material";

const VendorCompanyDetails = () => {
  const [value, setValue] = React.useState("one");
  const handleRowClick = (id: any) => {};

  const activeContracts = [
    {
      id: 1,
      title: "Social Media Assistant",
      startDate: "20-04-2024",
      endDate: "12-08-2024",
      client: "Airtel",
      resource: "Raj ",
    },
    {
      id: 2,
      title: "Android Developer",
      startDate: "18-03-2024",
      endDate: "16-09-2024",
      client: "IBM",
      resource: "Sajid ",
    },
    {
      id: 3,
      title: "Angular Developer",
      startDate: "02-01-2024",
      endDate: "06-10-2024",
      client: "SDET Tech",
      resource: "Amit ",
    },
    {
      id: 4,
      title: "iOS Developer",
      startDate: "26-04-2024",
      endDate: "18-11-2024",
      client: "DevStringx",
      resource: "Harshit ",
    },
    {
      id: 1,
      title: "QA Automation",
      startDate: "13-05-2024",
      endDate: "10-12-2024",
      client: "JigNect Technologies",
      resource: "Vinod ",
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
      datePosted: "20 May 2020",
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
      datePosted: "16 May 2020",
      applicants: "1,234",
      client: "Creative Solutions Ltd.",
      requirementType: "Hybrid",
      noOfPositions: 5,
      contractPeriod: "12 months",
      visibility: "Empanelled",
    },
    {
      id: 3,
      role: "Visual Designer",
      status: "Open",
      datePosted: "15 May 2020",
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
      datePosted: "13 May 2020",
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
      datePosted: "12 May 2020",
      applicants: "12",
      client: "Tech Innovators LLC",
      requirementType: "Hybrid",
      noOfPositions: 20,
      contractPeriod: "18 months",
      visibility: "Empanelled",
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
                "https://fleekitsolutions.com/wp-content/uploads/2023/09/favicon-32x32-1.png"
              }
              style={{ width: 65, height: 65 }}
            />
          </div>
          <div>
            <p className="text-heading">Fleek IT Solutions</p>
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
            <p className="text-gray-700 text-base">
              Stripe is a software platform for starting and running internet
              businesses. Millions of businesses rely on Stripe’s software tools
              to accept payments, expand globally, and manage their businesses
              online. Stripe has been at the forefront of expanding internet
              commerce, powering new business models, and supporting the latest
              platforms, from marketplaces to mobile commerce sites. We believe
              that growing the GDP of the internet is a problem rooted in code
              and design, not finance. Stripe is built for developers, makers,
              and creators. We work on solving the hard technical problems
              necessary to build global economic infrastructure—from designing
              highly reliable systems to developing advanced machine learning
              algorithms to prevent fraud.
            </p>
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
                <Tab value="one" label="Active Contracts" />
                <Tab value="two" label="Past Contracts" />
                <Tab value="three" label="Open Positions" />
                <Tab value="four" label="Bench Strength" />
              </Tabs>
              {value === "one" && (
                <div className="table-body mt-4">
                  <table>
                    <thead>
                      <tr>
                        <th className="add-right-shadow">Title</th>
                        <th>Client</th>
                        <th>Start Date</th>
                        <th>Resource</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeContracts.map((item, index) => (
                        <tr key={index} onClick={() => handleRowClick(item.id)}>
                          <th className="add-right-shadow">{item.title}</th>
                          <td>{item.client}</td>
                          <td>{item.startDate}</td>
                          <td>{item.resource}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {value === "two" && (
                <div className="table-body mt-4">
                  <table>
                    <thead>
                      <tr>
                        <th className="add-right-shadow">Title</th>
                        <th>Client</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Resource</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeContracts.map((item, index) => (
                        <tr key={index} onClick={() => handleRowClick(item.id)}>
                          <th className="add-right-shadow">{item.title}</th>
                          <td>{item.client}</td>
                          <td>{item.startDate}</td>
                          <td>{item.endDate}</td>
                          <td>{item.resource}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {value === "three" && (
                <div className="table-body mt-4">
                  <table>
                    <thead>
                      <tr>
                        <th className="add-right-shadow">Role</th>
                        <th>Client</th>
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
                          <td>{job.client}</td>
                          <td>{job.datePosted}</td>
                          <td>
                            <Typography
                              className={`px-3 py-1 rounded-full !text-base text-center ${
                                job.requirementType === "Onsite"
                                  ? "text-blue-700 border border-blue-700"
                                  : "text-yellow-700 border border-yellow-700"
                              }`}
                            >
                              {job.requirementType}
                            </Typography>
                          </td>
                          <td>{job.noOfPositions}</td>
                          <td>{job.contractPeriod}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {value === "four" && (
                <div className="table-body mt-4">
                  <table>
                    <thead>
                      <tr>
                        <th className="add-right-shadow">Resource name</th>
                        <th>Skill Set</th>
                        <th>Experience</th>
                        <th>Location</th>
                        <th>Availability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {benchData.map((item, index) => (
                        <tr key={index} onClick={() => handleRowClick(item.id)}>
                          <th className="add-right-shadow">{item.resource}</th>
                          <td>{item.skills}</td>
                          <td>{item.experience}</td>
                          <td>{item.location}</td>
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

            <ul className="text-gray-700 text-base">
              <li>
                <Link href="mailto:sales@fleekitsolutions.com" underline="none">
                  <MailOutline fontSize="small" /> sales@fleekitsolutions.com
                </Link>
              </li>
              <li>
                <Link href="tel:+91 971181234" underline="none">
                  <Phone fontSize="small" /> +91 971181234
                </Link>
              </li>
              <li>
                <Link href="www.fleekitsolutions.com" underline="none">
                  <Language fontSize="small" /> www.fleekitsolutions.com
                </Link>
              </li>
            </ul>
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

export default VendorCompanyDetails;
