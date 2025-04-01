import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import {
  getRequirementStatusGraph,
  getRequirementWeekGraph,
  getVndRequirementWeekGraph,
} from "../sharedService/apiService";

const JobStatistics = ({ lineTitle = "", barTitle = "", pieTitle = "" }) => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [weekGraphData, setWeekGraphData] = useState<any[]>([]);
  const [statusGraphData, setStatusGraphData] = useState<any[]>([]);
  const today = new Date();
  const activeRole = localStorage.getItem("activeRole") || "";

  const requirementData = [
    { owner: "Soniya", count: 12, placement: 5 },
    { owner: "Somya", count: 6, placement: 2 },
    { owner: "Maria", count: 15, placement: 8 },
    { owner: "Mariam", count: 8, placement: 3 },
  ];

  useEffect(() => {
    if (activeRole === "company") {
      getRequirementWeekGraphData();
      getRequirementStatusGraphData();
    }
    if (activeRole === "vendor") {
      getVndRequirementWeekGraphData();
      getVndRequirementStatusGraphData();
    }
  }, [activeRole]);

  const getRequirementWeekGraphData = () => {
    const oneWeekBack = new Date();
    oneWeekBack.setDate(today.getDate() - 30);

    const payload = {
      orgCode: userData.orgCode,
      startDate: oneWeekBack.toISOString().split("T")[0],
      endDate: today.toISOString().split("T")[0],
    };
    getRequirementWeekGraph(payload).then((result: any) => {
      if (result && result?.length >= 0) {
        setWeekGraphData(result);
      }
    });
  };

  const getVndRequirementWeekGraphData = () => {
    const oneWeekBack = new Date();
    oneWeekBack.setDate(today.getDate() - 30);

    const payload = {
      orgCode: userData.orgCode,
      startDate: oneWeekBack.toISOString().split("T")[0],
      endDate: today.toISOString().split("T")[0],
      userId: userData.userId,
    };
    getVndRequirementWeekGraph(payload).then((result: any) => {
      if (result && result?.length >= 0) {
        setWeekGraphData(result);
      }
    });
  };

  const getRequirementStatusGraphData = () => {
    const oneWeekBack = new Date();
    oneWeekBack.setDate(today.getDate() - 30);

    const payload = {
      orgCode: userData.orgCode,
      startDate: oneWeekBack.toISOString().split("T")[0],
      endDate: today.toISOString().split("T")[0],
    };
    getRequirementStatusGraph(payload).then((result: any) => {
      if (result && result?.length >= 0) {
        setStatusGraphData(result);
      }
    });
  };
  const getVndRequirementStatusGraphData = () => {
    const oneWeekBack = new Date();
    oneWeekBack.setDate(today.getDate() - 30);

    const payload = {
      orgCode: userData.orgCode,
      startDate: oneWeekBack.toISOString().split("T")[0],
      endDate: today.toISOString().split("T")[0],
      userId: userData.userId,
    };
    getRequirementStatusGraph(payload).then((result: any) => {
      if (result && result?.length >= 0) {
        setStatusGraphData(result);
      }
    });
  };

  const items = [
    {
      id: "id_A",
      value: statusGraphData[0]?.Open,
      label: "Open",
      color: "#007FFF",
    },
    {
      id: "id_B",
      value: statusGraphData[0]?.Closed,
      label: "Closed",
      color: "#5DB996",
    },
    {
      id: "id_C",
      value: statusGraphData[0]?.Onhold,
      label: "On hold",
      color: "#7e22ce",
    },
  ];

  const dayLabels = weekGraphData.map((item) => item.weekDay);
  const viewsData = weekGraphData.map((item) => item.totalPositions);
  const appliedData = weekGraphData.map((item) => item.totalPlacements);

  return (
    <>
      {/* <Box className="flex-1 flex justify-between md:flex-wrap sm:flex-col md:flex-row"> */}
        <div className="border p-3 rounded-md sm:w-[99%] lg:w-[33%] md:w-[49%] mb-4">
          {lineTitle && <div className="text-title">{lineTitle}</div>}
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
                  label: "Positions",
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
        {/* <div className="sm:w-[99%] border p-3 rounded-md lg:w-[33%] md:w-[49%] mb-4">
          {barTitle && <div className="text-title">{barTitle}</div>}
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
                label: "Positions",
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
        </div> */}
        <div className="sm:w-[99%] border p-3 rounded-md lg:w-[33%] md:w-[49%] mb-4">
          {pieTitle && <div className="text-title">{pieTitle}</div>}
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
      {/* </Box> */}
    </>
  );
};

export default JobStatistics;
