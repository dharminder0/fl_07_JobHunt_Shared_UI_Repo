import { Add, FilterList, Search } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateClientForm from "./CreateClientForm";

const clientDataObj = [
  {
    id: 1,
    name: "Airtel",
    requirement: 5,
    activeContracts: 10,
    pastContracts: 20,
    status: "Active",
  },
  {
    id: 2,
    name: "IBM Consulting",
    requirement: 7,
    activeContracts: 8,
    pastContracts: 16,
    status: "Active",
  },
  {
    id: 3,
    name: "Capgemini",
    requirement: 3,
    activeContracts: 6,
    pastContracts: 13,
    status: "Active",
  },
  {
    id: 4,
    name: "NTT DATA",
    requirement: 2,
    activeContracts: 5,
    pastContracts: 12,
    status: "Active",
  },
  {
    id: 5,
    name: "Cognizant",
    requirement: 4,
    activeContracts: 7,
    pastContracts: 17,
    status: "Active",
  },
];

export default function Clients() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleRowClick = (id: number) => {
    navigate(`${id}`);
  };
  return (
    <div className="px-4 py-1">
      <Box className="flex items-center justify-end my-2">
        <Box className="flex items-center space-x-4">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search Client"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <Search className="mr-2" fontSize="small" />,
            }}
          />
          <Button variant="outlined" startIcon={<FilterList />}>
            Filter
          </Button>
          <CreateClientForm />
        </Box>
      </Box>
      <div className="table-body">
        <table>
          <thead>
            <tr>
              <th className="add-right-shadow">Name</th>
              <th>Open Requirements</th>
              <th>Active Contracts</th>
              <th>Past Contracts</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {clientDataObj.map((item, index) => (
              <tr
                className="cursor-pointer"
                key={index}
                onClick={() => handleRowClick(item.id)}
              >
                <th className="add-right-shadow">{item.name}</th>
                <td>{item.requirement}</td>
                <td>{item.activeContracts}</td>
                <td>{item.pastContracts}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
