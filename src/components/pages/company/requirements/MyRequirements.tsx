import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  Pagination,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const MyRequirements = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState<string>("");
  const [filterList, setFilterList] = useState<any>({
    client: ["Self", "Creative Solutions Ltd.", "Data Insights Group"],
    status: ["Open", "On hold", "Closed"],
    requirementType: ["Remote", "Hybrid", "Onsite"],
  });
  const [searchFilter, setSearchFilter] = useState<any>({
    searchValue: "",
    client: "",
    status: "",
    requirementType: "",
  });
  const [jobData, setJobData] = useState<any[]>([]);

  // const jobData = [
  //   {
  //     id: 1,
  //     role: "Social Media Assistant",
  //     status: "Open",
  //     datePosted: "20 May 2020",
  //     applicants: "19",
  //     client: "Self",
  //     requirementType: "Remote",
  //     noOfPositions: 3,
  //     contractPeriod: "6 months",
  //     visibility: "Global",
  //   },
  //   {
  //     id: 2,
  //     role: "Senior Designer",
  //     status: "On hold",
  //     datePosted: "16 May 2020",
  //     applicants: "1,234",
  //     client: "Creative Solutions Ltd.",
  //     requirementType: "Hybrid",
  //     noOfPositions: 5,
  //     contractPeriod: "12 months",
  //     visibility: "Empanelled",
  //   },
  //   {
  //     id: 3,
  //     role: "Visual Designer",
  //     status: "Open",
  //     datePosted: "15 May 2020",
  //     applicants: "2,435",
  //     client: "Design Pros Inc.",
  //     requirementType: "Onsite",
  //     noOfPositions: 2,
  //     contractPeriod: "3 months",
  //     visibility: "Limited",
  //   },
  //   {
  //     id: 4,
  //     role: "Data Science",
  //     status: "Closed",
  //     datePosted: "13 May 2020",
  //     applicants: "6,234",
  //     client: "Self",
  //     requirementType: "Remote",
  //     noOfPositions: 10,
  //     contractPeriod: "9 months",
  //     visibility: "Global",
  //   },
  //   {
  //     id: 5,
  //     role: "Kotlin Developer",
  //     status: "Closed",
  //     datePosted: "12 May 2020",
  //     applicants: "12",
  //     client: "Tech Innovators LLC",
  //     requirementType: "Hybrid",
  //     noOfPositions: 20,
  //     contractPeriod: "18 months",
  //     visibility: "Empanelled",
  //   },
  //   {
  //     id: 6,
  //     role: "React Developer",
  //     status: "Closed",
  //     datePosted: "11 May 2020",
  //     applicants: "14",
  //     client: "Code Crafters Co.",
  //     requirementType: "Onsite",
  //     noOfPositions: 8,
  //     contractPeriod: "12 months",
  //     visibility: "Limited",
  //   },
  //   {
  //     id: 7,
  //     role: "Social Media Assistant",
  //     status: "On hold",
  //     datePosted: "20 May 2020",
  //     applicants: "19",
  //     client: "Self",
  //     requirementType: "Remote",
  //     noOfPositions: 3,
  //     contractPeriod: "6 months",
  //     visibility: "Global",
  //   },
  //   {
  //     id: 8,
  //     role: "Senior Designer",
  //     status: "Open",
  //     datePosted: "16 May 2020",
  //     applicants: "1,234",
  //     client: "Visionary Designs Ltd.",
  //     requirementType: "Hybrid",
  //     noOfPositions: 5,
  //     contractPeriod: "12 months",
  //     visibility: "Empanelled",
  //   },
  //   {
  //     id: 9,
  //     role: "Visual Designer",
  //     status: "On hold",
  //     datePosted: "15 May 2020",
  //     applicants: "2,435",
  //     client: "Creative Solutions Ltd.",
  //     requirementType: "Onsite",
  //     noOfPositions: 2,
  //     contractPeriod: "3 months",
  //     visibility: "Limited",
  //   },
  //   {
  //     id: 10,
  //     role: "Data Science",
  //     status: "Closed",
  //     datePosted: "13 May 2020",
  //     applicants: "6,234",
  //     client: "Data Insights Group",
  //     requirementType: "Remote",
  //     noOfPositions: 10,
  //     contractPeriod: "9 months",
  //     visibility: "Global",
  //   },    {
  //     id: 7,
  //     role: "Social Media Assistant",
  //     status: "On hold",
  //     datePosted: "20 May 2020",
  //     applicants: "19",
  //     client: "Self",
  //     requirementType: "Remote",
  //     noOfPositions: 3,
  //     contractPeriod: "6 months",
  //     visibility: "Global",
  //   },
  //   {
  //     id: 8,
  //     role: "Senior Designer",
  //     status: "Open",
  //     datePosted: "16 May 2020",
  //     applicants: "1,234",
  //     client: "Visionary Designs Ltd.",
  //     requirementType: "Hybrid",
  //     noOfPositions: 5,
  //     contractPeriod: "12 months",
  //     visibility: "Empanelled",
  //   },
  //   {
  //     id: 9,
  //     role: "Visual Designer",
  //     status: "On hold",
  //     datePosted: "15 May 2020",
  //     applicants: "2,435",
  //     client: "Creative Solutions Ltd.",
  //     requirementType: "Onsite",
  //     noOfPositions: 2,
  //     contractPeriod: "3 months",
  //     visibility: "Limited",
  //   },
  //   {
  //     id: 10,
  //     role: "Data Science",
  //     status: "Closed",
  //     datePosted: "13 May 2020",
  //     applicants: "6,234",
  //     client: "Data Insights Group",
  //     requirementType: "Remote",
  //     noOfPositions: 10,
  //     contractPeriod: "9 months",
  //     visibility: "Global",
  //   },    {
  //     id: 7,
  //     role: "Social Media Assistant",
  //     status: "On hold",
  //     datePosted: "20 May 2020",
  //     applicants: "19",
  //     client: "Self",
  //     requirementType: "Remote",
  //     noOfPositions: 3,
  //     contractPeriod: "6 months",
  //     visibility: "Global",
  //   },
  //   {
  //     id: 8,
  //     role: "Senior Designer",
  //     status: "Open",
  //     datePosted: "16 May 2020",
  //     applicants: "1,234",
  //     client: "Visionary Designs Ltd.",
  //     requirementType: "Hybrid",
  //     noOfPositions: 5,
  //     contractPeriod: "12 months",
  //     visibility: "Empanelled",
  //   },
  //   {
  //     id: 9,
  //     role: "Visual Designer",
  //     status: "On hold",
  //     datePosted: "15 May 2020",
  //     applicants: "2,435",
  //     client: "Creative Solutions Ltd.",
  //     requirementType: "Onsite",
  //     noOfPositions: 2,
  //     contractPeriod: "3 months",
  //     visibility: "Limited",
  //   },
  //   {
  //     id: 10,
  //     role: "Data Science",
  //     status: "Closed",
  //     datePosted: "13 May 2020",
  //     applicants: "6,234",
  //     client: "Data Insights Group",
  //     requirementType: "Remote",
  //     noOfPositions: 10,
  //     contractPeriod: "9 months",
  //     visibility: "Global",
  //   },    {
  //     id: 7,
  //     role: "Social Media Assistant",
  //     status: "On hold",
  //     datePosted: "20 May 2020",
  //     applicants: "19",
  //     client: "Self",
  //     requirementType: "Remote",
  //     noOfPositions: 3,
  //     contractPeriod: "6 months",
  //     visibility: "Global",
  //   },
  //   {
  //     id: 8,
  //     role: "Senior Designer",
  //     status: "Open",
  //     datePosted: "16 May 2020",
  //     applicants: "1,234",
  //     client: "Visionary Designs Ltd.",
  //     requirementType: "Hybrid",
  //     noOfPositions: 5,
  //     contractPeriod: "12 months",
  //     visibility: "Empanelled",
  //   },
  //   {
  //     id: 9,
  //     role: "Visual Designer",
  //     status: "On hold",
  //     datePosted: "15 May 2020",
  //     applicants: "2,435",
  //     client: "Creative Solutions Ltd.",
  //     requirementType: "Onsite",
  //     noOfPositions: 2,
  //     contractPeriod: "3 months",
  //     visibility: "Limited",
  //   },
  //   {
  //     id: 10,
  //     role: "Data Science",
  //     status: "Closed",
  //     datePosted: "13 May 2020",
  //     applicants: "6,234",
  //     client: "Data Insights Group",
  //     requirementType: "Remote",
  //     noOfPositions: 10,
  //     contractPeriod: "9 months",
  //     visibility: "Global",
  //   },
  // ];
  const jobDataOrg = [
    {
      id: 1,
      role: "Social Media Assistant",
      status: "Open",
      datePosted: "20 May 2020",
      applicants: "19",
      client: "Self",
      requirementType: "Remote",
      noOfPositions: 3,
      contractPeriod: "6 months",
      visibility: "Global",
    },
    {
      id: 2,
      role: "Senior Designer",
      status: "On hold",
      datePosted: "16 May 2020",
      applicants: "1",
      client: "Creative Solutions Ltd.",
      requirementType: "Hybrid",
      noOfPositions: 5,
      contractPeriod: "12 months",
      visibility: "Empanelled",
    },
    {
      id: 3,
      role: "Visual Designer",
      status: "Open",
      datePosted: "15 May 2020",
      applicants: "4",
      client: "Design Pros Inc.",
      requirementType: "Onsite",
      noOfPositions: 2,
      contractPeriod: "3 months",
      visibility: "Limited",
    },
    {
      id: 4,
      role: "Data Science",
      status: "Closed",
      datePosted: "13 May 2020",
      applicants: "6",
      client: "Self",
      requirementType: "Remote",
      noOfPositions: 1,
      contractPeriod: "9 months",
      visibility: "Global",
    },
    {
      id: 5,
      role: "Kotlin Developer",
      status: "Closed",
      datePosted: "12 May 2020",
      applicants: "12",
      client: "Tech Innovators LLC",
      requirementType: "Hybrid",
      noOfPositions: 1,
      contractPeriod: "18 months",
      visibility: "Empanelled",
    },
    {
      id: 6,
      role: "React Developer",
      status: "Closed",
      datePosted: "11 May 2020",
      applicants: "14",
      client: "Code Crafters Co.",
      requirementType: "Onsite",
      noOfPositions: 3,
      contractPeriod: "12 months",
      visibility: "Limited",
    },
    {
      id: 7,
      role: "Social Media Assistant",
      status: "On hold",
      datePosted: "20 May 2020",
      applicants: "19",
      client: "Self",
      requirementType: "Remote",
      noOfPositions: 3,
      contractPeriod: "6 months",
      visibility: "Global",
    },
    {
      id: 8,
      role: "Senior Designer",
      status: "Open",
      datePosted: "16 May 2020",
      applicants: "1",
      client: "Visionary Designs Ltd.",
      requirementType: "Hybrid",
      noOfPositions: 5,
      contractPeriod: "12 months",
      visibility: "Empanelled",
    },
    {
      id: 9,
      role: "Visual Designer",
      status: "On hold",
      datePosted: "15 May 2020",
      applicants: "2",
      client: "Creative Solutions Ltd.",
      requirementType: "Onsite",
      noOfPositions: 2,
      contractPeriod: "3 months",
      visibility: "Limited",
    },
    {
      id: 10,
      role: "Data Science",
      status: "Closed",
      datePosted: "13 May 2020",
      applicants: "4",
      client: "Data Insights Group",
      requirementType: "Remote",
      noOfPositions: 10,
      contractPeriod: "9 months",
      visibility: "Global",
    },
    {
      id: 7,
      role: "Social Media Assistant",
      status: "On hold",
      datePosted: "20 May 2020",
      applicants: "19",
      client: "Self",
      requirementType: "Remote",
      noOfPositions: 3,
      contractPeriod: "6 months",
      visibility: "Global",
    },
    {
      id: 8,
      role: "Senior Designer",
      status: "Open",
      datePosted: "16 May 2020",
      applicants: "4",
      client: "Visionary Designs Ltd.",
      requirementType: "Hybrid",
      noOfPositions: 5,
      contractPeriod: "12 months",
      visibility: "Empanelled",
    },
    {
      id: 9,
      role: "Visual Designer",
      status: "On hold",
      datePosted: "15 May 2020",
      applicants: "5",
      client: "Creative Solutions Ltd.",
      requirementType: "Onsite",
      noOfPositions: 2,
      contractPeriod: "3 months",
      visibility: "Limited",
    },
    {
      id: 10,
      role: "Data Science",
      status: "Closed",
      datePosted: "13 May 2020",
      applicants: "6",
      client: "Data Insights Group",
      requirementType: "Remote",
      noOfPositions: 10,
      contractPeriod: "9 months",
      visibility: "Global",
    },
    {
      id: 7,
      role: "Social Media Assistant",
      status: "On hold",
      datePosted: "20 May 2020",
      applicants: "9",
      client: "Self",
      requirementType: "Remote",
      noOfPositions: 3,
      contractPeriod: "6 months",
      visibility: "Global",
    },
    {
      id: 8,
      role: "Senior Designer",
      status: "Open",
      datePosted: "16 May 2020",
      applicants: "4",
      client: "Visionary Designs Ltd.",
      requirementType: "Hybrid",
      noOfPositions: 5,
      contractPeriod: "12 months",
      visibility: "Empanelled",
    },
    {
      id: 9,
      role: "Visual Designer",
      status: "On hold",
      datePosted: "15 May 2020",
      applicants: "2",
      client: "Creative Solutions Ltd.",
      requirementType: "Onsite",
      noOfPositions: 2,
      contractPeriod: "3 months",
      visibility: "Limited",
    },
    {
      id: 10,
      role: "Data Science",
      status: "Closed",
      datePosted: "13 May 2020",
      applicants: "6",
      client: "Data Insights Group",
      requirementType: "Remote",
      noOfPositions: 10,
      contractPeriod: "9 months",
      visibility: "Global",
    },
    {
      id: 7,
      role: "Social Media Assistant",
      status: "On hold",
      datePosted: "20 May 2020",
      applicants: "1",
      client: "Self",
      requirementType: "Remote",
      noOfPositions: 3,
      contractPeriod: "6 months",
      visibility: "Global",
    },
    {
      id: 8,
      role: "Senior Designer",
      status: "Open",
      datePosted: "16 May 2020",
      applicants: "4",
      client: "Visionary Designs Ltd.",
      requirementType: "Hybrid",
      noOfPositions: 5,
      contractPeriod: "12 months",
      visibility: "Empanelled",
    },
    {
      id: 9,
      role: "Visual Designer",
      status: "On hold",
      datePosted: "15 May 2020",
      applicants: "2",
      client: "Creative Solutions Ltd.",
      requirementType: "Onsite",
      noOfPositions: 2,
      contractPeriod: "3 months",
      visibility: "Limited",
    },
    {
      id: 10,
      role: "Data Science",
      status: "Closed",
      datePosted: "13 May 2020",
      applicants: "7",
      client: "Data Insights Group",
      requirementType: "Remote",
      noOfPositions: 10,
      contractPeriod: "9 months",
      visibility: "Global",
    },
  ];

  const handleRowClick = (id: number) => {
    navigate(`${id}`);
  };

  useEffect(() => {
    // Filtering logic
    const filtered = jobDataOrg.filter((item) => {
      // Check client filter
      const clientMatch =
        searchFilter.client === "" || item.client === searchFilter.client;
      // Check status filter
      const statusMatch =
        searchFilter.status === "" || item.status === searchFilter.status;
      // Check requirement type filter
      const requirementTypeMatch =
        searchFilter.requirementType === "" ||
        item.requirementType === searchFilter.requirementType;
      // Check search input
      const searchMatch =
        searchFilter.searchValue === "" ||
        item.role
          .toLowerCase()
          .includes(searchFilter.searchValue.toLowerCase());
      return clientMatch && statusMatch && requirementTypeMatch && searchMatch;
    });
    setJobData(filtered);
  }, [searchFilter]);

  return (
    <>
      <div className="px-2 py-3 h-full">
        <div className="flex flex-row gap-2 mb-3">
          <TextField
            size="small"
            className="bg-primary-light w-[calc(100%-680px)]"
            value={searchFilter.searchValue}
            onChange={(event) => {
              setSearchFilter({
                ...searchFilter,
                searchValue: event.target.value,
              });
            }}
            placeholder="Search"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="inherit" />
                  </InputAdornment>
                ),
              },
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
          <FormControl size="small">
            <InputLabel id="topic">Requirement type</InputLabel>
            <Select
              className="!w-[190px] bg-primary-light rounded"
              label="Requirement type"
              value={searchFilter.requirementType}
              onChange={(event) => {
                setSearchFilter((prev: any) => ({
                  ...prev,
                  requirementType: event.target.value,
                }));
              }}
            >
              <MenuItem value={""}>All</MenuItem>
              {filterList?.requirementType?.map((requirement: any) => (
                <MenuItem key={requirement} value={requirement}>
                  {requirement}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            <svg
              width="180"
              height="34"
              viewBox="0 0 180 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.5" y="1" width="179" height="49" fill="white" />
              <rect x="0.5" y="1" width="179" height="49" stroke="#D6DDEB" />
              <path
                d="M20.096 29.66C19.2853 29.66 18.6267 29.5 18.12 29.18C17.6133 28.8547 17.2427 28.404 17.008 27.828C16.7733 27.2467 16.656 26.5693 16.656 25.796C16.656 25.716 16.656 25.6387 16.656 25.564C16.656 25.484 16.656 25.4067 16.656 25.332H18C18 25.38 18 25.4333 18 25.492C18 25.5453 18 25.6013 18 25.66C18 26.204 18.0693 26.684 18.208 27.1C18.3467 27.516 18.568 27.8413 18.872 28.076C19.1813 28.3107 19.5893 28.428 20.096 28.428C20.5973 28.428 21 28.3107 21.304 28.076C21.608 27.8413 21.8293 27.508 21.968 27.076C22.1067 26.6387 22.176 26.124 22.176 25.532V17.7H23.536V25.708C23.536 26.2787 23.4747 26.804 23.352 27.284C23.2293 27.764 23.032 28.1827 22.76 28.54C22.4933 28.892 22.1413 29.1667 21.704 29.364C21.2667 29.5613 20.7307 29.66 20.096 29.66ZM29.0163 29.652C28.4083 29.652 27.9016 29.548 27.4963 29.34C27.0909 29.1267 26.7683 28.852 26.5283 28.516C26.2936 28.18 26.1256 27.8173 26.0243 27.428C25.9283 27.0333 25.8803 26.6547 25.8803 26.292C25.8803 26.0893 25.8803 25.8813 25.8803 25.668C25.8803 25.4493 25.8803 25.2307 25.8803 25.012V21.004H27.2483V24.836C27.2483 25.0333 27.2483 25.228 27.2483 25.42C27.2483 25.612 27.2483 25.7933 27.2483 25.964C27.2483 26.396 27.3069 26.796 27.4243 27.164C27.5469 27.532 27.7576 27.8307 28.0563 28.06C28.3549 28.284 28.7656 28.396 29.2883 28.396C29.7789 28.396 30.2083 28.2493 30.5763 27.956C30.9443 27.6573 31.2323 27.2867 31.4403 26.844C31.6483 26.396 31.7523 25.9507 31.7523 25.508L32.5443 25.836C32.5443 26.3053 32.4616 26.7667 32.2963 27.22C32.1309 27.668 31.8936 28.076 31.5843 28.444C31.2803 28.812 30.9096 29.1053 30.4723 29.324C30.0403 29.5427 29.5549 29.652 29.0163 29.652ZM31.7523 29.5V21.004H33.1123V29.5H31.7523ZM36.938 16.996V29.5H35.594V16.996H36.938ZM46.8191 17.66V29.5H45.4591V19.14C45.4165 19.1987 45.2831 19.276 45.0591 19.372C44.8405 19.468 44.5685 19.5613 44.2431 19.652C43.9231 19.7373 43.5818 19.7987 43.2191 19.836V18.604C43.5765 18.5453 43.9125 18.4627 44.2271 18.356C44.5471 18.2493 44.8191 18.1347 45.0431 18.012C45.2671 17.884 45.4165 17.7667 45.4911 17.66H46.8191ZM53.1889 29.66C52.6022 29.66 52.1195 29.5587 51.7409 29.356C51.3675 29.148 51.0769 28.8867 50.8689 28.572C50.6609 28.2573 50.5142 27.932 50.4289 27.596C50.3489 27.26 50.3089 26.9613 50.3089 26.7C50.3089 26.6893 50.3089 26.684 50.3089 26.684C50.3089 26.6787 50.3089 26.6733 50.3089 26.668H51.5889C51.5889 26.6733 51.5889 26.6787 51.5889 26.684C51.5889 26.684 51.5889 26.6893 51.5889 26.7C51.5889 26.892 51.6102 27.092 51.6529 27.3C51.7009 27.5027 51.7835 27.692 51.9009 27.868C52.0182 28.044 52.1809 28.1853 52.3889 28.292C52.6022 28.3987 52.8715 28.452 53.1969 28.452C53.6289 28.452 54.0129 28.276 54.3489 27.924C54.6849 27.5667 54.9489 26.9587 55.1409 26.1C55.3382 25.236 55.4369 24.0467 55.4369 22.532H56.0929C56.0929 23.092 55.9515 23.5827 55.6689 24.004C55.3915 24.4253 55.0209 24.7533 54.5569 24.988C54.0982 25.2173 53.5969 25.332 53.0529 25.332C52.3809 25.332 51.8075 25.1693 51.3329 24.844C50.8635 24.5133 50.5035 24.0627 50.2529 23.492C50.0022 22.916 49.8769 22.2573 49.8769 21.516C49.8769 20.7373 50.0075 20.052 50.2689 19.46C50.5302 18.8627 50.9169 18.396 51.4289 18.06C51.9409 17.724 52.5675 17.556 53.3089 17.556C54.0822 17.556 54.7222 17.7773 55.2289 18.22C55.7355 18.6573 56.1115 19.2707 56.3569 20.06C56.6075 20.844 56.7329 21.7587 56.7329 22.804C56.7329 24.068 56.6422 25.1373 56.4609 26.012C56.2795 26.8867 56.0262 27.5933 55.7009 28.132C55.3809 28.6653 55.0049 29.0547 54.5729 29.3C54.1462 29.54 53.6849 29.66 53.1889 29.66ZM53.1729 24.132C53.5995 24.132 53.9782 24.0307 54.3089 23.828C54.6395 23.6253 54.8982 23.34 55.0849 22.972C55.2769 22.604 55.3729 22.1693 55.3729 21.668C55.3729 21.1293 55.2875 20.6413 55.1169 20.204C54.9515 19.7613 54.7142 19.4093 54.4049 19.148C54.0955 18.8867 53.7275 18.756 53.3009 18.756C52.8529 18.756 52.4769 18.8627 52.1729 19.076C51.8689 19.2893 51.6395 19.596 51.4849 19.996C51.3302 20.3907 51.2529 20.868 51.2529 21.428C51.2529 21.9507 51.3249 22.4173 51.4689 22.828C51.6182 23.2333 51.8369 23.5533 52.1249 23.788C52.4129 24.0173 52.7622 24.132 53.1729 24.132ZM62.5714 25.404V24.54H68.1394V25.404H62.5714ZM77.5335 29.66C76.7228 29.66 76.0642 29.5 75.5575 29.18C75.0508 28.8547 74.6802 28.404 74.4455 27.828C74.2108 27.2467 74.0935 26.5693 74.0935 25.796C74.0935 25.716 74.0935 25.6387 74.0935 25.564C74.0935 25.484 74.0935 25.4067 74.0935 25.332H75.4375C75.4375 25.38 75.4375 25.4333 75.4375 25.492C75.4375 25.5453 75.4375 25.6013 75.4375 25.66C75.4375 26.204 75.5068 26.684 75.6455 27.1C75.7842 27.516 76.0055 27.8413 76.3095 28.076C76.6188 28.3107 77.0268 28.428 77.5335 28.428C78.0348 28.428 78.4375 28.3107 78.7415 28.076C79.0455 27.8413 79.2668 27.508 79.4055 27.076C79.5442 26.6387 79.6135 26.124 79.6135 25.532V17.7H80.9735V25.708C80.9735 26.2787 80.9122 26.804 80.7895 27.284C80.6668 27.764 80.4695 28.1827 80.1975 28.54C79.9308 28.892 79.5788 29.1667 79.1415 29.364C78.7042 29.5613 78.1682 29.66 77.5335 29.66ZM86.4538 29.652C85.8458 29.652 85.3391 29.548 84.9338 29.34C84.5284 29.1267 84.2058 28.852 83.9658 28.516C83.7311 28.18 83.5631 27.8173 83.4618 27.428C83.3658 27.0333 83.3178 26.6547 83.3178 26.292C83.3178 26.0893 83.3178 25.8813 83.3178 25.668C83.3178 25.4493 83.3178 25.2307 83.3178 25.012V21.004H84.6858V24.836C84.6858 25.0333 84.6858 25.228 84.6858 25.42C84.6858 25.612 84.6858 25.7933 84.6858 25.964C84.6858 26.396 84.7444 26.796 84.8618 27.164C84.9844 27.532 85.1951 27.8307 85.4938 28.06C85.7924 28.284 86.2031 28.396 86.7258 28.396C87.2164 28.396 87.6458 28.2493 88.0138 27.956C88.3818 27.6573 88.6698 27.2867 88.8778 26.844C89.0858 26.396 89.1898 25.9507 89.1898 25.508L89.9818 25.836C89.9818 26.3053 89.8991 26.7667 89.7338 27.22C89.5684 27.668 89.3311 28.076 89.0218 28.444C88.7178 28.812 88.3471 29.1053 87.9098 29.324C87.4778 29.5427 86.9924 29.652 86.4538 29.652ZM89.1898 29.5V21.004H90.5498V29.5H89.1898ZM94.3755 16.996V29.5H93.0315V16.996H94.3755ZM100.649 29.5V28.324C100.691 28.084 100.817 27.8093 101.025 27.5C101.233 27.1853 101.489 26.8573 101.793 26.516C102.097 26.1747 102.417 25.8387 102.753 25.508C103.094 25.172 103.414 24.8627 103.713 24.58C104.086 24.228 104.451 23.8627 104.809 23.484C105.171 23.1 105.473 22.6947 105.713 22.268C105.953 21.8413 106.073 21.3933 106.073 20.924C106.073 20.2253 105.91 19.692 105.585 19.324C105.259 18.956 104.771 18.772 104.121 18.772C103.598 18.772 103.179 18.8813 102.865 19.1C102.55 19.3187 102.323 19.6253 102.185 20.02C102.046 20.4147 101.977 20.876 101.977 21.404H100.609C100.609 20.6413 100.737 19.972 100.993 19.396C101.249 18.8147 101.638 18.364 102.161 18.044C102.683 17.7187 103.342 17.556 104.137 17.556C104.867 17.556 105.478 17.7 105.969 17.988C106.459 18.2707 106.827 18.6653 107.073 19.172C107.323 19.6787 107.449 20.2653 107.449 20.932C107.449 21.3693 107.366 21.7933 107.201 22.204C107.041 22.6093 106.83 22.996 106.569 23.364C106.307 23.7267 106.025 24.0653 105.721 24.38C105.422 24.6893 105.137 24.9693 104.865 25.22C104.427 25.62 104.014 26.0093 103.625 26.388C103.241 26.7667 102.918 27.116 102.657 27.436C102.401 27.756 102.246 28.0307 102.193 28.26H107.529V29.5H100.649ZM116.358 18.892H111.75L111.334 22.78C111.35 22.716 111.404 22.6307 111.494 22.524C111.59 22.4173 111.729 22.308 111.91 22.196C112.097 22.084 112.329 21.9907 112.606 21.916C112.884 21.8413 113.209 21.804 113.582 21.804C114.553 21.804 115.289 22.1507 115.79 22.844C116.297 23.5373 116.55 24.452 116.55 25.588C116.55 26.4627 116.414 27.204 116.142 27.812C115.876 28.42 115.489 28.8813 114.982 29.196C114.476 29.5053 113.862 29.66 113.142 29.66C112.561 29.66 112.054 29.5747 111.622 29.404C111.196 29.228 110.844 28.9827 110.566 28.668C110.294 28.3533 110.089 27.9853 109.95 27.564C109.817 27.1427 109.75 26.6813 109.75 26.18C109.75 26.1747 109.75 26.172 109.75 26.172C109.75 26.1667 109.75 26.1613 109.75 26.156H111.102C111.102 26.1613 111.102 26.1667 111.102 26.172C111.102 26.172 111.102 26.1747 111.102 26.18C111.108 26.9853 111.289 27.5667 111.646 27.924C112.009 28.2813 112.513 28.46 113.158 28.46C113.574 28.46 113.932 28.356 114.23 28.148C114.534 27.94 114.766 27.6253 114.926 27.204C115.092 26.7827 115.174 26.252 115.174 25.612C115.174 24.7587 115.017 24.1107 114.702 23.668C114.393 23.2253 113.937 23.004 113.334 23.004C112.945 23.004 112.604 23.0813 112.31 23.236C112.017 23.3853 111.774 23.5693 111.582 23.788C111.396 24.0067 111.262 24.2147 111.182 24.412L109.87 24.076L110.598 17.7H116.358V18.892Z"
                fill="#25324B"
              />
              <g clip-path="url(#clip0_1_5270)">
                <path
                  d="M159.001 19.6665H149.001C148.08 19.6665 147.334 20.4127 147.334 21.3332V31.3332C147.334 32.2536 148.08 32.9998 149.001 32.9998H159.001C159.921 32.9998 160.667 32.2536 160.667 31.3332V21.3332C160.667 20.4127 159.921 19.6665 159.001 19.6665Z"
                  stroke="#4640DE"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M157.334 18V21.3333"
                  stroke="#4640DE"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M150.666 18V21.3333"
                  stroke="#4640DE"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M147.334 24.6665H160.667"
                  stroke="#4640DE"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M152.333 28H150.666V29.6667H152.333V28Z"
                  stroke="#4640DE"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_5270">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(144 15.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="table-body">
          <table>
            <thead>
              <tr>
                <th className="add-right-shadow">Role</th>
                <th>Client</th>
                <th>Status</th>
                <th>Date Posted</th>
                <th>Requirement Type</th>
                <th>No. of Positions</th>
                <th>Contract period</th>
                <th>Visibility</th>
                <th>Applicants</th>
              </tr>
            </thead>
            <tbody>
              {jobData.map((job, index) => (
                <tr
                  className="cursor-pointer"
                  key={index}
                  onClick={() => handleRowClick(job.id)}
                >
                  <th className="add-right-shadow">{job.role}</th>
                  <td>{job.client}</td>
                  <td>
                    <Typography
                      className={`inline-block px-3 py-1 !text-base rounded-full ${
                        job.status === "Open"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {job.status}
                    </Typography>
                  </td>
                  <td>{job.datePosted}</td>
                  <td>
                    {/* <Typography
                      className={`inline-block px-3 py-1 !text-base rounded-full ${
                        job.status === "Open"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    > */}
                    {job.requirementType}
                    {/* </Typography> */}
                  </td>
                  <td>{job.noOfPositions}</td>
                  <td>{job.contractPeriod}</td>
                  <td>{job.visibility}</td>
                  <td>{job.applicants}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {/* <Box className="flex justify-between items-center mt-6">
          <Box className="flex items-center">
            <Typography className="mr-2 text-gray-600">View</Typography>
            <Select
              defaultValue={10}
              className="bg-white rounded-md mx-2"
              size="small"
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
            <Typography className="ml-2 text-gray-600">
              Applicants per page
            </Typography>
          </Box>
          <Pagination count={2} variant="outlined" shape="rounded" />
        </Box> */}
      </div>
    </>
  );
};

export default MyRequirements;