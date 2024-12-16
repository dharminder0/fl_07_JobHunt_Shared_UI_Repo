import { FilterList, PictureAsPdf, Search } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const applicantData = [
  {
    name: "Harshit Tandon",
    requirement: "React js Developer",
    client: "Airtel",
    status: "In Review",
    date: "13-07-2024",
  },
  {
    name: "Raj Pathar",
    requirement: "Sr. Angular developer",
    client: "IBM Consulting",
    status: "Shortlisted",
    date: "12-06-2024",
  },
  {
    name: "Sajid Sarkar",
    requirement: "React Native mobile developer",
    client: "Capgemini",
    status: "Declined",
    date: "18-05-2024",
  },
  {
    name: "Amit Kumar",
    requirement: "Frontend developer",
    client: "NTT DATA",
    status: "Hired",
    date: "11-04-2024",
  },
  {
    name: "Harshit Tandon",
    requirement: ".Net developer",
    client: "Airtel",
    status: "Hired",
    date: "13-07-2024",
  },
  {
    name: "Raj Pathar",
    requirement: ".Net MVC Support",
    client: "IBM Consulting",
    status: "Shortlisted",
    date: "12-06-2024",
  },
  {
    name: "Sajid Sarkar",
    requirement: "Azure Devops Engineer",
    client: "Capgemini",
    status: "Declined",
    date: "18-05-2024",
  },
  {
    name: "Amit Kumar",
    requirement: "Devops AWS Certified engineer",
    client: "NTT DATA",
    status: "Hired",
    date: "11-04-2024",
  },
];

export default function VndCandidates() {
  const [search, setSearch] = useState("");
  const filteredApplicants = applicantData.filter((applicant) =>
    applicant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <Box className="flex items-center justify-end my-2">
        <Box className="flex items-center space-x-4">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search Candidate"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <Search className="mr-2" fontSize="small" />,
            }}
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
              <th className="add-right-shadow">Candidate Name</th>
              <th>Requirement</th>
              <th>Client</th>
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
                <td>{applicant.requirement}</td>
                <td>{applicant.client}</td>
                <td>
                  <Typography
                    className={`inline-block px-3 py-1 !text-base rounded-full ${
                      applicant.status === "Hired"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {applicant.status}
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
    </div>
  );
}
