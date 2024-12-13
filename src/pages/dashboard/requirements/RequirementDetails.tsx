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
} from "@mui/material";
import { Search, FilterList, MoreHoriz } from "@mui/icons-material";
import RequirementDescription from "./RequirementDescription";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <Box className="flex justify-between items-center mb-6">
        <div className="flex flex-row gap-3">
        <IconButton color="primary" aria-label="add to shopping cart" className="!w-[50px] !h-[50px]" onClick={()=>{navigate('/company/myapp')}}>
          <ArrowBackIcon />
        </IconButton>
          <Box>
            <Typography variant="h6" className="font-bold text-gray-800">
              Social Media Assistant
            </Typography>
            <Typography className="text-gray-500">
              Design • Full-Time • 4 / 11 Hired
            </Typography>
          </Box>
        </div>
        <Button variant="contained" className="bg-purple-500 text-white">
          <MoreHoriz />
          More Action
        </Button>
      </Box>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Applicants" />
        <Tab label="Job Details" />
        <Tab label="Analytics" />
      </Tabs>

      {activeTab == 0 && (
        <>
          <Box className="flex items-center justify-between mt-4 mb-6">
            <Typography>Total Applicants: 19</Typography>
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
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Hiring Stage</TableCell>
                  <TableCell>Applied Date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredApplicants.map((applicant, index) => (
                  <TableRow key={index}>
                    <TableCell>{applicant.name}</TableCell>
                    <TableCell>{applicant.score}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full ${applicant.stage === "Hired"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {applicant.stage}
                      </span>
                    </TableCell>
                    <TableCell>{applicant.date}</TableCell>
                    <TableCell>
                      <Button variant="outlined">See Application</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className="flex justify-end mt-4">
            <Pagination count={2} />
          </Box>
        </>
      )}

      {activeTab == 1 && <RequirementDescription />}
    </div>
  );
};

export default RequirementDetails;
