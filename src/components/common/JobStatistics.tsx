import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, ButtonGroup, Button } from "@mui/material";
import { BarChart } from "@mui/x-charts";

const JobStatistics = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const data = [
    { day: "Mon", views: 122, applied: 34 },
    { day: "Tue", views: 78, applied: 22 },
    { day: "Wed", views: 122, applied: 34 },
    { day: "Thu", views: 102, applied: 28 },
    { day: "Fri", views: 88, applied: 20 },
    { day: "Sat", views: 44, applied: 14 },
    { day: "Sun", views: 54, applied: 18 },
  ];

  return (
    <Box className="p-6 bg-white rounded-lg border-2 w-2/3">
      {/* Header */}
      <Box className="flex justify-between items-center mb-6">
        <Box>
          <Typography variant="h6" className="font-semibold text-gray-800">
            Job statistics
          </Typography>
          <Typography className="text-gray-500">
            Showing Job statistics Jul 19-25
          </Typography>
        </Box>

        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button variant="contained">Week</Button>
          <Button>Month</Button>
          <Button>Year</Button>
        </ButtonGroup>
      </Box>

      {/* Tabs */}
      <Box className="mb-6">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Overview" />
          <Tab label="Jobs View" />
          <Tab label="Jobs Applied" />
        </Tabs>
      </Box>

      {/* Chart Section */}
      <Box className="flex">
        {/* Chart */}
        <Box className="flex-1">
          <BarChart
            xAxis={[
              {
                data: data.map((item) => item.day),
                label: "Days of the Week",
                scaleType: "band", // Set the x-axis type to "band"
              },
            ]}
            series={[
              {
                data: data.map((item) => item.views),
                label: "Job Views",
                color: "#fbbf24", // Tailwind's yellow-500
              },
              {
                data: data.map((item) => item.applied),
                label: "Jobs Applied",
                color: "#a78bfa", // Tailwind's purple-500
              },
            ]}
            height={300}
          />
        </Box>

        {/* Summary */}
        <Box className="ml-6 flex flex-col justify-between">
          <Box className="p-4 bg-gray-100 rounded-lg shadow-md">
            <Typography className="text-gray-600">Job Views</Typography>
            <Typography className="text-2xl font-semibold">2,342</Typography>
            <Typography className="text-sm text-green-500">
              This Week ↑6.4%
            </Typography>
          </Box>
          <Box className="p-4 bg-gray-100 rounded-lg shadow-md mt-4">
            <Typography className="text-gray-600">Job Applied</Typography>
            <Typography className="text-2xl font-semibold">654</Typography>
            <Typography className="text-sm text-red-500">
              This Week ↓0.5%
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default JobStatistics;
