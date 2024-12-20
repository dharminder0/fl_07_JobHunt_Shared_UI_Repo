import { Add, FilterList, Search } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CreateClientForm from "./CreateClientForm";
import ImportClientForm from "./ImportClientForm";

const clientDataObj = [
  {
    id: 1,
    name: "Airtel",
    requirement: 5,
    activeContracts: 10,
    pastContracts: 20,
    status: "Active",
    logo: "https://assets.airtel.in/static-assets/new-home/img/favicon-16x16.png",
  },
  {
    id: 2,
    name: "IBM Consulting",
    requirement: 7,
    activeContracts: 8,
    pastContracts: 16,
    status: "Active",
    logo: "https://www.ibm.com/content/dam/adobe-cms/default-images/favicon.svg",
  },
  {
    id: 3,
    name: "Capgemini",
    requirement: 3,
    activeContracts: 6,
    pastContracts: 13,
    status: "Active",
    logo: "https://www.capgemini.com/wp-content/uploads/2021/06/cropped-favicon.png?w=192",
  },
  {
    id: 4,
    name: "NTT DATA",
    requirement: 2,
    activeContracts: 5,
    pastContracts: 12,
    status: "Active",
    logo: "https://www.nttdata.com/global/en/-/media/assets/images/android-chrome-256256.png?rev=8dd26dac893a4a07bae174ff25e900ef",
  },
  {
    id: 5,
    name: "Cognizant",
    requirement: 4,
    activeContracts: 7,
    pastContracts: 17,
    status: "Active",
    logo: "https://companieslogo.com/img/orig/CTSH-82a8444b.png",
  },
];

export default function Clients() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");

  const handleRowClick = (id: number, tab: string) => {
    navigate(`${id}?type=${tab}`, { state: { previousUrl: location.pathname },})
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
          <ImportClientForm />
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
              <tr key={index}>
                <th
                  className="add-right-shadow wide-250 cursor-pointer"
                  onClick={() => handleRowClick(item.id, "activeView")}
                >
                  <div className="flex">
                    <img
                      src={item.logo}
                      style={{ height: 16, width: 16 }}
                      className="me-1"
                    />
                    {item.name}
                  </div>
                </th>
                <td>{item.requirement}</td>
                <td  className="cursor-pointer" onClick={() => handleRowClick(item.id, "activeView")}>
                  {item.activeContracts}
                </td>
                <td className="cursor-pointer" onClick={() => handleRowClick(item.id, "pastView")}>
                  {item.pastContracts}
                </td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
