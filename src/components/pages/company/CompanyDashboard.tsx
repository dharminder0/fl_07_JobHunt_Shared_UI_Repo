import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
  Avatar,
  LinearProgress,
} from "@mui/material";
import JobStatistics from "../../common/JobStatistics.tsx";

interface CompanyDashboardProps {}

const CompanyDashboard: React.FC<CompanyDashboardProps> = () => {
  const applicantData = [
    { label: "Full Time", value: 45, color: "bg-purple-500" },
    { label: "Part-Time", value: 24, color: "bg-green-500" },
    { label: "Remote", value: 22, color: "bg-blue-500" },
    { label: "Internship", value: 32, color: "bg-yellow-500" },
    { label: "Contract", value: 30, color: "bg-red-500" },
  ];
  return (
    <div className="flex">
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h5" className="font-bold">
            Good morning, Maria
          </Typography>
          <Button variant="contained" color="primary" className="text-white">
            Post a Job
          </Button>
        </div>

        {/* Overview Cards */}
        <Grid container spacing={2} className="mb-6">
          <Grid item xs={12} md={4}>
            <Card sx={{ background: "#4640DE" }}>
              <CardContent>
                <Typography variant="h6" color="white">
                  76
                </Typography>
                <Typography color="white">New candidates to review</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ background: "#56CDAD" }}>
              <CardContent>
                <Typography variant="h6" color="white">
                  3
                </Typography>
                <Typography color="white">Schedule for today</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ background: "#26A4FF" }}>
              <CardContent>
                <Typography variant="h6" color="white">
                  24
                </Typography>
                <Typography color="white">Messages received</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Job Statistics */}
        <div className="flex items-center justify-between mb-4">
          <JobStatistics />
          <Box className="p-6 gap-6 w-1/3">
            {/* Job Open Card */}
            <Box className="bg-white border-2 p-4 mb-2">
              <Typography variant="h6" className="text-gray-900 font-bold">
                Job Open
              </Typography>
              <Typography variant="h4" className="text-gray-900 font-bold mt-2">
                12
              </Typography>
              <Typography className="text-gray-500">Jobs Opened</Typography>
            </Box>

            {/* Applicants Summary Card */}
            <Box className="bg-white border-2 p-4">
              <Typography variant="h6" className="text-gray-900 font-bold">
                Applicants Summary
              </Typography>
              <Typography variant="h4" className="text-gray-900 font-bold mt-2">
                67
              </Typography>
              <Typography className="text-gray-500">Applicants</Typography>

              {/* Progress Bars */}
              <Box className="mt-4">
                {applicantData.map((item, index) => (
                  <Box key={index} className="mb-3">
                    <Box className="flex justify-between mb-1">
                      <Typography className="text-sm text-gray-600">
                        {item.label}
                      </Typography>
                      <Typography className="text-sm text-gray-600">
                        {item.value}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(item.value / 67) * 100} // Percentage calculation
                      className={`h-2 rounded ${item.color}`}
                      sx={{ background: item.color }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </div>

        {/* Job Updates */}
        <Typography variant="h6">Job Updates</Typography>

        <Grid container spacing={2}>
          {[1, 2, 3, 4].map((job) => (
            <Grid item xs={12} sm={6} md={3} key={job}>
              <Card>
                <CardContent>
                  <Avatar className="mb-2">A</Avatar>
                  <Typography variant="h6">Social Media Assistant</Typography>
                  <Typography>Nomad - Paris, France</Typography>
                  <Typography className="text-sm text-gray-500">
                    5 applied of 10 capacity
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default CompanyDashboard;