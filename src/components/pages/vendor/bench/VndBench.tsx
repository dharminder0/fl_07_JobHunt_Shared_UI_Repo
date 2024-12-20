import {
  Add,
  FilterList,
  LocationOn,
  Search,
  WorkHistory,
} from "@mui/icons-material";
import { Button, Box, TextField } from "@mui/material";
import React, { useState } from "react";
import AddBenchForm from "./AddBenchForm";
import MatchingSkillsDialog from "../../../../components/shared/MatchingSkillsDialog";

// interface VndBench {}

const benchData = [
  {
    id: 1,
    resource: "Raj Pathar",
    role: "Software Associate",
    skills: "Angular, React, DevOps",
    experience: "8 years",
    location: "Noida",
    availability: "Immediate",
    aiScore: 78,
  },
  {
    id: 2,
    resource: "Harshit Tandon ",
    role: "Front End Lead",
    skills: "Angular, DevOps, .net, C#",
    experience: "8 years",
    location: "Hyderabad",
    availability: "Immediate",
    aiScore: 80,
  },
  {
    id: 3,
    resource: "Sajid Sarkar ",
    role: "Software Developer",
    skills: "Angular, React, Azure",
    experience: "4 years",
    location: "Noida",
    availability: "Immediate",
    aiScore: 75,
  },
  {
    id: 4,
    resource: "Vaibav Rastogi",
    role: "Front End Developer",
    skills: "Angular, React",
    experience: "3 years",
    location: "Hyderabad",
    availability: "Immediate",
    aiScore: 60,
  },
];

const VndBench: React.FC<{ isDrawer?: boolean }> = ({ isDrawer = false }) => {
  const [search, setSearch] = useState("");
  const [isMatchOpen, setIsMatchOpen] = React.useState(false);
  const [matchingScore, setMatchingScore] = React.useState(0);

  const handleMatchingDialog = (score: number) => {
    setIsMatchOpen(true);
    setMatchingScore(score);
  };

  return (
    <>
      {isDrawer && (
        <div className="border-b p-4">
          <h5 className="text-heading">Apply</h5>
        </div>
      )}
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
              {!isDrawer && <AddBenchForm />}
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
                {/* <th>Experience</th>
                <th>Location</th> */}
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {benchData.map((item, index) => (
                <tr key={index}>
                  <th className="add-right-shadow">
                    <div className="flex items-center justify-between text-info">
                      <div
                        // onClick={() => handleRowClick(job.id)}
                        className="cursor-pointer hover:text-indigo-700"
                      >
                        {item.resource}
                      </div>
                      {isDrawer && (
                        <div
                          className="flex cursor-pointer hover:text-indigo-700"
                          onClick={() => handleMatchingDialog(item.aiScore)}
                        >
                          <svg
                            width="14px"
                            height="14px"
                            viewBox="0 0 512 512"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g
                              id="Page-1"
                              stroke="none"
                              stroke-width="1"
                              fill="none"
                              fill-rule="evenodd"
                            >
                              <g
                                id="icon"
                                fill="#4640DE"
                                transform="translate(64.000000, 64.000000)"
                              >
                                <path
                                  d="M320,64 L320,320 L64,320 L64,64 L320,64 Z M171.749388,128 L146.817842,128 L99.4840387,256 L121.976629,256 L130.913039,230.977 L187.575039,230.977 L196.319607,256 L220.167172,256 L171.749388,128 Z M260.093778,128 L237.691519,128 L237.691519,256 L260.093778,256 L260.093778,128 Z M159.094727,149.47526 L181.409039,213.333 L137.135039,213.333 L159.094727,149.47526 Z M341.333333,256 L384,256 L384,298.666667 L341.333333,298.666667 L341.333333,256 Z M85.3333333,341.333333 L128,341.333333 L128,384 L85.3333333,384 L85.3333333,341.333333 Z M170.666667,341.333333 L213.333333,341.333333 L213.333333,384 L170.666667,384 L170.666667,341.333333 Z M85.3333333,0 L128,0 L128,42.6666667 L85.3333333,42.6666667 L85.3333333,0 Z M256,341.333333 L298.666667,341.333333 L298.666667,384 L256,384 L256,341.333333 Z M170.666667,0 L213.333333,0 L213.333333,42.6666667 L170.666667,42.6666667 L170.666667,0 Z M256,0 L298.666667,0 L298.666667,42.6666667 L256,42.6666667 L256,0 Z M341.333333,170.666667 L384,170.666667 L384,213.333333 L341.333333,213.333333 L341.333333,170.666667 Z M0,256 L42.6666667,256 L42.6666667,298.666667 L0,298.666667 L0,256 Z M341.333333,85.3333333 L384,85.3333333 L384,128 L341.333333,128 L341.333333,85.3333333 Z M0,170.666667 L42.6666667,170.666667 L42.6666667,213.333333 L0,213.333333 L0,170.666667 Z M0,85.3333333 L42.6666667,85.3333333 L42.6666667,128 L0,128 L0,85.3333333 Z"
                                  id="Combined-Shape"
                                ></path>
                              </g>
                            </g>
                          </svg>
                          <span> {item.aiScore}%</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center text-secondary-text text-info mt-1 ">
                      <p>
                        <WorkHistory fontSize="inherit" /> {item.experience}
                      </p>
                      <p className="ms-1">
                        <LocationOn fontSize="inherit" /> {item.location}
                      </p>
                    </div>
                  </th>
                  <td>{item.role}</td>
                  <td>{item.skills}</td>
                  {/* <td>{item.experience}</td>
                  <td>{item.location}</td> */}
                  <td>{item.availability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isDrawer && (
          <MatchingSkillsDialog
            title="Matching Score Analysis"
            isMatchOpen={isMatchOpen}
            setIsMatchOpen={setIsMatchOpen}
            aiScore={matchingScore}
          />
        )}
      </div>
    </>
  );
};

export default VndBench;
