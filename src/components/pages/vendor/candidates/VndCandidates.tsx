import { FilterList, PictureAsPdf, Search,} from "@mui/icons-material";
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
import { useLocation, useNavigate } from "react-router-dom";

const applicantData = [
  {
    id: 1,
    name: "Harshit Tandon",
    requirement: "React js Developer",
    client: "Sterlite Technologies",
    status: "In Review",
    date: "13-07-2024",
    logo: "https://static.ambitionbox.com/assets/v2/images/rs:fit:200:200:false:false/bG9jYWw6Ly8vbG9nb3Mvb3JpZ2luYWxzL3N0ZXJsaXRlLXRlY2hub2xvZ2llcy5qcGc.webp",
  },
  {
    id: 2,
    name: "Raj Pathar",
    requirement: "Sr. Angular developer",
    client: "upGrad",
    status: "Shortlisted",
    date: "12-06-2024",
    logo: "https://prod-mphs.upgrad.com/hubfs/45938370-0-Gloop-01%20(1).webp",
  },
  {
    id: 3,
    name: "Sajid Sarkar",
    requirement: "React Native mobile developer",
    client: "Xoriant",
    status: "Declined",
    date: "18-05-2024",
    logo: "https://www.xoriant.com/cdn/ff/2zqY0wtIPH_7bO8GKthC5LM_btmFMJbTa_6fDC9hg-M/1693224947/public/favicon.png",
  },
  {
    id: 4,
    name: "Amit Kumar",
    requirement: "Frontend developer",
    client: "Iris Software",
    status: "Hired",
    date: "11-04-2024",
    logo: "https://www.irissoftware.com/wp-content/uploads/2020/11/favicon.png",
  },
  {
    id: 5,
    name: "Harshit Tandon",
    requirement: ".Net developer",
    client: "Infinite Computer Solutions",
    status: "Hired",
    date: "13-07-2024",
    logo: "https://www.infinite.com/wp-content/uploads/2023/03/favicon.png",
  },
  {
    id: 6,
    name: "Raj Pathar",
    requirement: ".Net MVC Support",
    client: "QualityKiosk Technologies",
    status: "Interview Scheduled",
    date: "12-06-2024",
    logo: "https://qualitykiosk.com/wp-content/uploads/2021/08/Logo_QK_Brand-Mark_Black-300x300.png",
  },
  {
    id: 7,
    name: "Sajid Sarkar",
    requirement: "Azure Devops Engineer",
    client: "Zoho",
    status: "Declined",
    date: "18-05-2024",
    logo: "https://www.zohowebstatic.com/sites/zweb/images/favicon.ico",
  },
  {
    id: 8,
    name: "Amit Kumar",
    requirement: "Devops AWS Certified engineer",
    client: "Onward Technologies",
    status: "Hired",
    date: "11-04-2024",
    logo: "https://www.onwardgroup.com/images/favicon.svg",
  },
];

export default function VndCandidates() {
  const location = useLocation();
  const params = location.state || {};
  const [search, setSearch] = useState("");
  const [filteredApplicants, setFilteredApplicants] = useState<any[]>([]);
  const [filterList, setFilterList] = useState<any>({
    client: ["upGrad", "Iris Software", "Sterlite Technologies"],
    status: [
      "In Review",
      "Shortlisted",
      "Interview Scheduled",
      "Declined",
      "Hired",
    ],
  });

  const [searchFilter, setSearchFilter] = useState<any>({
    searchValue: "",
    client: "",
    status: !params?.status ? "" : params?.status,
  });

  useEffect(() => {
    // Filtering logic
    const filtered = applicantData.filter((item) => {
      // Check client filter
      const clientMatch =
        searchFilter.client === "" || item.client === searchFilter.client;
      // Check status filter
      const statusMatch =
        searchFilter.status === "" || item.status === searchFilter.status;
      // Check search input
      const searchMatch =
        searchFilter.searchValue === "" ||
        item.name
          .toLowerCase()
          .includes(searchFilter.searchValue.toLowerCase()) ||
        item.requirement
          .toLowerCase()
          .includes(searchFilter.searchValue.toLowerCase());

      return clientMatch && statusMatch && searchMatch;
    });
    setFilteredApplicants(filtered);
  }, [searchFilter]);

  const navigate = useNavigate();
  const handleRowClick = (id: number) => {
    navigate(`/vendor/clients/${id}`);
  };

  return (
    <div className="px-4 py-1">
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
            <InputLabel id="topic">Client</InputLabel>
            <Select
              className="rounded !w-[150px] bg-primary-light"
              label="Topic"
              value={searchFilter.client}
              onChange={(event) => {
                setSearchFilter((prev: any) => ({
                  ...prev,
                  client: event.target.value,
                }));
              }}
            >
              <MenuItem value={""}>All</MenuItem>
              {filterList?.client?.map((client: any) => (
                <MenuItem key={client} value={client}>
                  {client}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel id="topic">Status</InputLabel>
            <Select
              className="!w-[150px] bg-primary-light rounded"
              label="Status"
              value={searchFilter.status}
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
                key={index}
                // onClick={() => handleRowClick(applicant.id)}
              >
                <th className="add-right-shadow">{applicant.name}</th>
                <td>{applicant.requirement}</td>
                <td
                  className="wide-250 cursor-pointer"
                  onClick={() => handleRowClick(applicant.id)}
                >
                  <div className="flex items-center">
                    <img
                      src={applicant.logo}
                      style={{ height: 16, width: 16 }}
                      className="me-1"
                    />
                    {applicant.client}
                  </div>
                </td>
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
                  className="pointer-events-none"
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
