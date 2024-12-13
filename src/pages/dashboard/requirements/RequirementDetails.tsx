import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Select,
  MenuItem,
  TextField,
  Pagination,
  IconButton,
  Chip,
} from "@mui/material";
import { Search, FilterList, MoreHoriz } from "@mui/icons-material";
import RequirementDescription from "./RequirementDescription";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const RequirementDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const applicantData = [
    { name: "Jake Gyll", score: 0, stage: "In Review", date: "13 July, 2021" },
    {
      name: "Cyndy Lillibridge",
      score: 4.5,
      stage: "Shortlisted",
      date: "12 July, 2021",
    },
    {
      name: "Rodolfo Goode",
      score: 3.75,
      stage: "Declined",
      date: "11 July, 2021",
    },
    { name: "Leif Floyd", score: 4.8, stage: "Hired", date: "11 July, 2021" },
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
              navigate("/company/myapp");
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="h6" className="font-bold text-gray-800">
              Social Media Assistant
            </Typography>
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
      <RequirementDescription />

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
                  <th className="add-right-shadow">Full Name</th>
                  <th>Score</th>
                  <th>Hiring Stage</th>
                  <th>Applied Date</th>
                  <th>Action</th>
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
                    <td>{applicant.score}</td>
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
                      <Button variant="outlined" size="small">
                        See Application
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
