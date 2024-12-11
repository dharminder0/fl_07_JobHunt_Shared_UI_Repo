import React from "react";
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
  MenuItem,
  Select,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyApplications = () => {
  const navigate = useNavigate();

  const jobData = [
    {
      id: 1,
      role: "Social Media Assistant",
      status: "Live",
      datePosted: "20 May 2020",
      dueDate: "24 May 2020",
      jobType: "Fulltime",
      applicants: "19",
      needs: "4 / 11",
    },
    {
      id: 2,
      role: "Senior Designer",
      status: "Live",
      datePosted: "16 May 2020",
      dueDate: "24 May 2020",
      jobType: "Fulltime",
      applicants: "1,234",
      needs: "0 / 20",
    },
    {
      id: 3,
      role: "Visual Designer",
      status: "Live",
      datePosted: "15 May 2020",
      dueDate: "24 May 2020",
      jobType: "Freelance",
      applicants: "2,435",
      needs: "1 / 5",
    },
    {
      id: 4,
      role: "Data Science",
      status: "Closed",
      datePosted: "13 May 2020",
      dueDate: "24 May 2020",
      jobType: "Freelance",
      applicants: "6,234",
      needs: "10 / 10",
    },
    {
      id: 5,
      role: "Kotlin Developer",
      status: "Closed",
      datePosted: "12 May 2020",
      dueDate: "24 May 2020",
      jobType: "Fulltime",
      applicants: "12",
      needs: "20 / 20",
    },
    {
      id: 6,
      role: "React Developer",
      status: "Closed",
      datePosted: "11 May 2020",
      dueDate: "24 May 2020",
      jobType: "Fulltime",
      applicants: "14",
      needs: "10 / 10",
    },
    {
      id: 7,
      role: "Social Media Assistant",
      status: "Live",
      datePosted: "20 May 2020",
      dueDate: "24 May 2020",
      jobType: "Fulltime",
      applicants: "19",
      needs: "4 / 11",
    },
    {
      id: 8,
      role: "Senior Designer",
      status: "Live",
      datePosted: "16 May 2020",
      dueDate: "24 May 2020",
      jobType: "Fulltime",
      applicants: "1,234",
      needs: "0 / 20",
    },
    {
      id: 9,
      role: "Visual Designer",
      status: "Live",
      datePosted: "15 May 2020",
      dueDate: "24 May 2020",
      jobType: "Freelance",
      applicants: "2,435",
      needs: "1 / 5",
    },
    {
      id: 10,
      role: "Data Science",
      status: "Closed",
      datePosted: "13 May 2020",
      dueDate: "24 May 2020",
      jobType: "Freelance",
      applicants: "6,234",
      needs: "10 / 10",
    },
  ];

  const handleRowClick = (id: number) => {
    navigate(`recruitement/${id}`);
  };

  return (
    <Box className="p-6  min-h-screen">
      {/* Header */}
      <Box className="flex justify-between items-center mb-6">
        <Box>
          <Typography variant="h6" className="font-bold text-gray-800">
            Requirements Listing
          </Typography>
          <Typography className="text-gray-500">
            Here is your requirements listing status from July 19 - July 25.
          </Typography>
        </Box>
        <Button
          variant="contained"
          className="bg-purple-500 text-white font-medium px-4 py-2 rounded-md shadow-md"
        >
          + Post a Requirement
        </Button>
      </Box>

      {/* Job List */}
      <TableContainer component={Paper} className="rounded-lg shadow-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="text-gray-600 font-semibold">
                Roles
              </TableCell>
              <TableCell className="text-gray-600 font-semibold">
                Status
              </TableCell>
              <TableCell className="text-gray-600 font-semibold">
                Date Posted
              </TableCell>
              <TableCell className="text-gray-600 font-semibold">
                Due Date
              </TableCell>
              <TableCell className="text-gray-600 font-semibold">
                Job Type
              </TableCell>
              <TableCell className="text-gray-600 font-semibold">
                Applicants
              </TableCell>
              <TableCell className="text-gray-600 font-semibold">
                Needs
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobData.map((job, index) => (
              <TableRow
                key={index}
                onClick={() => handleRowClick(job.id)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <TableCell>{job.role}</TableCell>
                <TableCell>
                  <Typography
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                      job.status === "Live"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.status}
                  </Typography>
                </TableCell>
                <TableCell>{job.datePosted}</TableCell>
                <TableCell>{job.dueDate}</TableCell>
                <TableCell>
                  <Typography
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      job.jobType === "Fulltime"
                        ? "text-blue-700 border border-blue-700"
                        : "text-yellow-700 border border-yellow-700"
                    }`}
                  >
                    {job.jobType}
                  </Typography>
                </TableCell>
                <TableCell>{job.applicants}</TableCell>
                <TableCell>{job.needs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer */}
      <Box className="flex justify-between items-center mt-6">
        <Box className="flex items-center">
          <Typography className="mr-2 text-gray-600">View</Typography>
          <Select
            defaultValue={10}
            className="bg-white rounded-md mx-2"
            size="small"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
          <Typography className="ml-2 text-gray-600">
            Applicants per page
          </Typography>
        </Box>
        <Pagination count={2} variant="outlined" shape="rounded" />
      </Box>
    </Box>
  );
};

export default MyApplications;
