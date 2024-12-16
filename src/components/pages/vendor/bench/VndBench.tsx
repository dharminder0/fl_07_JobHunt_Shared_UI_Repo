import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

interface VndBench {}

const benchData = [
  {
    id: 1,
    resource: "Raj Pathar",
    skills: "Software Associate",
    experience: "8 years",
    location: "Noida",
    availability: "Immediate",
  },
  {
    id: 2,
    resource: "Harshit Tandon ",
    skills: "Front End Lead",
    experience: "8 years",
    location: "Hyderabad",
    availability: "Immediate",
  },
  {
    id: 3,
    resource: "Sajid Sarkar ",
    skills: "Software Developer",
    experience: "4 years",
    location: "Noida",
    availability: "Immediate",
  },
  {
    id: 4,
    resource: "Vaibav Rastogi",
    skills: "Front End Developer",
    experience: "3 years",
    location: "Hyderabad",
    availability: "Immediate",
  },
];

const VndBench: React.FC<VndBench> = () => {
  return (
    <div className="px-4">
      <div className="mt-4 flex justify-end items-center">
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ width: 170 }}
          startIcon={<Add />}
        >
          Add Bench
        </Button>
      </div>
      <div className="table-body mt-4">
        <table>
          <thead>
            <tr>
              <th className="add-right-shadow">Resource name</th>
              <th>Skill Set</th>
              <th>Experience</th>
              <th>Location</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {benchData.map((item, index) => (
              <tr key={index}>
                <th className="add-right-shadow">{item.resource}</th>
                <td>{item.skills}</td>
                <td>{item.experience}</td>
                <td>{item.location}</td>
                <td>{item.availability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VndBench;
