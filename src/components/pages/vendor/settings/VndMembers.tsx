import { Add, FilterList, PictureAsPdf, Search } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { access } from "fs";
import React, { useState } from "react";

const applicantData = [
  {
    name: "Somya Srivastava",
    email: "somya@opstree.com",
    phone: "9087654321",
    access: "Admin",
    status: "Active",
    date: "13-07-2021",
  },
  {
    name: "Diksha",
    email: "diksha@opstree.com",
    phone: "9086655322",
    access: "Vendor",
    status: "Active",
    date: "21-09-2022",
  },
];

export default function VndMembers() {
  const [search, setSearch] = useState("");
  const filteredApplicants = applicantData.filter((applicant) =>
    applicant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <Box className="flex items-center justify-end my-2">
        <Box className="flex items-center space-x-4">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <Search className="mr-2" fontSize="small" />,
            }}
          />
          <Button variant="outlined" startIcon={<FilterList />}>
            Filter
          </Button>
          <Button variant="contained" startIcon={<Add />}>
            Invite new team member
          </Button>
        </Box>
      </Box>
      <div className="table-body">
        <table>
          <thead>
            <tr>
              <th className="add-right-shadow">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Access</th>
              <th>Status</th>
              <th>Joining Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.map((applicant, index) => (
              <tr
                className="cursor-pointer"
                key={index}
                // onClick={() => handleRowClick(applicant.id)}
              >
                <th className="add-right-shadow">{applicant.name}</th>
                <td>{applicant.email}</td>
                <td>{applicant.phone}</td>
                <td>{applicant.access}</td>
                <td>{applicant.status}</td>
                <td>{applicant.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
