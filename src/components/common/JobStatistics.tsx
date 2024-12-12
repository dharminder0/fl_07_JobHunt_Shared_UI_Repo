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

  const requirementData = [
    { owner: "Soniya", count: 12 },
    { owner: "Somya", count: 6 },
    { owner: "Maria", count: 15 },
    { owner: "Mariam", count: 8 },
  ];

  const items = [
    { id: "id_A", value: 10, label: "Open" },
    { id: "id_B", value: 15, label: "In Progress" },
    { id: "id_C", value: 20, label: "Closed" },
    { id: "id_D", value: 10, label: "Placed" },
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
                label: "Total Requirements",
                color: "#007FFF", // Tailwind's yellow-500
              },
              {
                data: data.map((item) => item.applied),
                label: "Placed",
                color: "#5DB996", // Tailwind's purple-500
              },
            ]}
            height={300}
          />
        </Box>
      </div>
      <div className="w-[33%] border p-3 rounded-md">
        <BarChart
          xAxis={[
            {
              data: requirementData.map((item) => item.owner),
              label: "Owners",
              scaleType: "band", // Set the x-axis type to "band"
            },
          ]}
          series={[
            {
              data: requirementData.map((item) => item.count),
              label: "Workload",
              color: "#007FFF", // Tailwind's yellow-500
            }
          ]}
          height={300}
        />
        {/* <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          height={300}
        /> */}
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
