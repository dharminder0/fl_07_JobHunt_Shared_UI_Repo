import { Add, FilterList, Search } from "@mui/icons-material";
import { Button, Box, TextField } from "@mui/material";
import React, { useState } from "react";
import AddBenchForm from "./AddBenchForm";

interface VndBench {}

const benchData = [
  {
    id: 1,
    resource: "Raj Pathar",
    role: "Software Associate",
    skills: "Angular, React, DevOps",
    experience: "8 years",
    location: "Noida",
    availability: "Immediate",
  },
  {
    id: 2,
    resource: "Harshit Tandon ",
    role: "Front End Lead",
    skills: "Angular, DevOps, .net, C#",
    experience: "8 years",
    location: "Hyderabad",
    availability: "Immediate",
  },
  {
    id: 3,
    resource: "Sajid Sarkar ",
    role: "Software Developer",
    skills: "Angular, React, Azure",
    experience: "4 years",
    location: "Noida",
    availability: "Immediate",
  },
  {
    id: 4,
    resource: "Vaibav Rastogi",
    role: "Front End Developer",
    skills: "Angular, React",
    experience: "3 years",
    location: "Hyderabad",
    availability: "Immediate",
  },
];

const VndBench: React.FC<VndBench> = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="px-4 py-3">
      <div className="flex justify-end items-center">
        <Box className="flex items-center justify-end">
          <Box className="flex items-center space-x-4">
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search Bench"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <Search className="mr-2" fontSize="small" />,
              }}
            />
            <Button variant="outlined" startIcon={<FilterList />}>
              Filter
            </Button>
            <AddBenchForm />
          </Box>
        </Box>
      </div>
      <div className="table-body my-3">
        <table>
          <thead>
            <tr>
              <th className="add-right-shadow">Resource name</th>
              <th>Role</th>
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
                <td>{item.role}</td>
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
