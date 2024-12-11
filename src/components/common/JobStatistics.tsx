import React, { useState } from "react";
import { Box } from "@mui/material";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";

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

  const items = [
    { value: 10, label: "Series A ( no Id )" },
    { id: "id_B", value: 15, label: "Series B" },
    { id: "id_C", value: 20, label: "Series C" },
  ];

  return (
    <Box className="flex-1 flex justify-between">
      <div className="border p-3 rounded-md w-[33%]">
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
      </div>
      <div className="w-[33%] border p-3 rounded-md">
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          height={300}
        />
      </div>
      <div className="w-[33%] border p-3 rounded-md">
        <PieChart
          series={[
            {
              data: items,
            },
          ]}
          // onItemClick={handleClick}
          height={300}
          margin={{ right: 200 }}
        />
      </div>
    </Box>
  );
};

export default JobStatistics;
