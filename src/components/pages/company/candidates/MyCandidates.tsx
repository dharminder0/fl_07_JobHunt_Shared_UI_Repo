import { FilterList, PictureAsPdf, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const applicantData = [
  {
    vendor: "Fleek IT Solutions",
    name: "Harshit Tandon",
    requirement: "React js Developer",
    client: "Airtel",
    status: "In Review",
    date: "13-07-2024",
  },
  {
    vendor: "DevStringX Technologies",
    name: "Raj Pathar",
    requirement: "Sr. Angular developer",
    client: "IBM Consulting",
    status: "Shortlisted",
    date: "12-06-2024",
  },
  {
    vendor: "Binemiles Technologies",
    name: "Sajid Sarkar",
    requirement: "React Native mobile developer",
    client: "Capgemini",
    status: "Declined",
    date: "18-05-2024",
  },
  {
    vendor: "SDET Tech Pvt. Ltd",
    name: "Amit Kumar",
    requirement: "Frontend developer",
    client: "NTT DATA",
    status: "Hired",
    date: "11-04-2024",
  },
  {
    vendor: "Fleek IT Solutions",
    name: "Harshit Tandon",
    requirement: ".Net developer",
    client: "Airtel",
    status: "Hired",
    date: "13-07-2024",
  },
  {
    vendor: "SDET Tech Pvt. Ltd",
    name: "Vaibhav Rastogi",
    requirement: "Devops AWS Certified engineer",
    client: "NTT DATA",
    status: "Interview Schedule",
    date: "11-04-2024",
  },
  {
    vendor: "DevStringX Technologies",
    name: "Raj Pathar",
    requirement: ".Net MVC Support",
    client: "IBM Consulting",
    status: "Shortlisted",
    date: "12-06-2024",
  },
  {
    vendor: "Binemiles Technologies",
    name: "Sajid Sarkar",
    requirement: "Azure Devops Engineer",
    client: "Capgemini",
    status: "Declined",
    date: "18-05-2024",
  },
  {
    vendor: "SDET Tech Pvt. Ltd",
    name: "Amit Kumar",
    requirement: "Devops AWS Certified engineer",
    client: "NTT DATA",
    status: "Interview Schedule",
    date: "11-04-2024",
  },
];

export default function MyCandidates() {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const params = location.state || {};
  const [filteredApplicants, setFilteredApplicants] = useState<any[]>([]);

  const [filterList, setFilterList] = useState<any>({
    status: [
      "In Review",
      "Shortlisted",
      "Interview Schedule",
      "Declined",
      "Hired",
    ],
  });
  const [searchFilter, setSearchFilter] = useState<any>({
    searchValue: "",
    status: !params?.status ? "" : params?.status,
  });

  useEffect(() => {
    // Filtering logic
    const filtered = applicantData.filter((item) => {
      // Check status filter
      const statusMatch =
        searchFilter.status === "" || item.status === searchFilter.status;
      // Check search input
      const searchMatch =
        searchFilter.searchValue === "" ||
        item.name
          .toLowerCase()
          .includes(searchFilter.searchValue.toLowerCase());
      return statusMatch && searchMatch;
    });
    setFilteredApplicants(filtered);
  }, [searchFilter]);

  return (
    <div className="p-4">
      <Box className="flex items-center justify-end my-2">
        <Box className="flex items-center space-x-4">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search Candidate"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <Search className="mr-2" fontSize="small" />,
            }}
          />
          <FormControl size="small">
            <InputLabel id="topic">Status</InputLabel>
            <Select
              className="rounded !w-[150px] bg-primary-light"
              label="Topic"
              value={searchFilter.client}
              onChange={(event) => {
                setSearchFilter((prev: any) => ({
                  ...prev,
                  status: event.target.value,
                }));
              }}
            >
              <MenuItem value={""}>All</MenuItem>
              {filterList?.status?.map((status: any) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="outlined" startIcon={<FilterList />}>
            Filter
          </Button>
        </Box>
      </Box>
      <div className="table-body">
        <table>
          <thead>
            <tr>
              <th className="add-right-shadow">Candidate Name</th>
              <th>Vendor</th>
              <th>Requirement</th>
              <th>Client</th>
              <th>Status</th>
              <th>Application Date</th>
              <th>CV</th>
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
                <td>{applicant.vendor}</td>
                <td>{applicant.requirement}</td>
                <td>{applicant.client}</td>
                <td>
                  <Typography
                    className={`inline-block px-3 py-1 !text-base rounded-full ${
                      applicant.status === "Hired"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {applicant.status}
                  </Typography>
                </td>
                <td>{applicant.date}</td>
                <td>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<PictureAsPdf />}
                  >
                    Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
