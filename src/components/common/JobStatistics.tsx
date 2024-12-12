import React, { useState } from "react";
import { Box } from "@mui/material";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import { fontSize, style } from "@mui/system";

const JobStatistics = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const data = [
    { day: "Mon", views: 12, applied: 5 },
    { day: "Tue", views: 10, applied: 8 },
    { day: "Wed", views: 8, applied: 4 },
    { day: "Thu", views: 11, applied: 2 },
    { day: "Fri", views: 14, applied: 3 },
    { day: "Sat", views: 2, applied: 0 },
    { day: "Sun", views: 0, applied: 0 },
  ];

  const requirementData = [
    { owner: "Soniya", count: 12, placement: 5 },
    { owner: "Somya", count: 6, placement: 2 },
    { owner: "Maria", count: 15, placement: 8 },
    { owner: "Mariam", count: 8, placement: 3 },
  ];

  const items = [
    { id: "id_A", value: 10, label: "Open", color: "#007FFF" },
    { id: "id_B", value: 15, label: "In Progress", color: "#5DB996" },
    { id: "id_C", value: 20, label: "Closed", color: "#7e22ce" },
    { id: "id_D", value: 10, label: "Placed", color: "#06b6d4" },
  ];
  const dayLabels = data.map((item) => item.day);
  const viewsData = data.map((item) => item.views);
  const appliedData = data.map((item) => item.applied);

  return (
    <Box className="flex-1 flex justify-between">
      <div className="border p-3 rounded-md w-[33%]">
        <Box className="flex-1">
          <LineChart
            xAxis={[
              {
                data: dayLabels.map((_, index) => index), // Numerical indices for x-axis
                label: "Days of the Week",
                labelStyle: { fontSize: 12 },
                valueFormatter: (value) => dayLabels[value], // Map indices back to day labels
              },
            ]}
            series={[
              {
                data: viewsData, // Line for "views"
                label: "Requirements",
                color: "#007FFF",
              },
              {
                data: appliedData, // Line for "applied"
                label: "Placements",
                color: "#5DB996",
              },
            ]}
            height={300}
            legend={{
              labelStyle: { fontSize: 12 }, // Font size for the series labels
            }}
          />
        </Box>
      </div>
      <div className="w-[33%] border p-3 rounded-md">
        {/* <BarChart
          xAxis={[
            {
              data: requirementData.map((item) => item.owner),
              label: "Owners",
              scaleType: "band", // Set the x-axis type to "band",
              labelStyle: { fontSize: 12 },
              tickLabelStyle: { fontSize: 10 },
            },
          ]}
          series={[
            {
              data: requirementData.map((item) => item.count),
              label: "Workload",
              color: "#007FFF", // Tailwind's yellow-500
            },
          ]}
          height={300}
        /> */}
        <BarChart
          xAxis={[
            {
              data: requirementData.map((item) => item.owner),
              label: "Owners",
              scaleType: "band", // Set the x-axis type to "band"
              labelStyle: { fontSize: 12 },
              tickLabelStyle: { fontSize: 10 },
            },
          ]}
          series={[
            {
              data: requirementData.map((item) => item.count),
              label: "Requirements",
              color: "#007FFF", // Tailwind's yellow-500
            },
            {
              data: requirementData.map((item) => item.placement),
              label: "Placements",
              color: "#5DB996", // Tailwind's purple-500
            },
          ]}
          height={300}
          legend={{
            labelStyle: { fontSize: 12 }, // Font size for the series labels
          }}
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
          margin={{ right: 140 }}
          legend={{
            labelStyle: { fontSize: 12 }, // Font size for the series labels
          }}
        />
      </div>
    </Box>
  );
};

export default JobStatistics;
