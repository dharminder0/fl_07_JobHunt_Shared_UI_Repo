// App.tsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  MenuItem,
  Select,
  Card,
  CardContent,
  Button,
  Typography,
  Pagination,
  Checkbox,
  FormControlLabel,
  Divider,
  Chip,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FilterList, Search } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";

const companies = [
  {
    id: 1,
    name: "Cyient Limited",
    description:
      "Stripe is a software platform for starting and running internet businesses with this platform.",
    tags: ["Onsite", "50-100", "QA Testing"],
    place: "Noida",
    logo: "https://www.cyient.com/hubfs/enhancer.png",
  },
  {
    id: 2,
    name: "3Pillar Global Noida",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "10-50", "App Tech"],
    place: "Delhi(NCR)",
    logo: "https://www.3pillarglobal.com/favicon.png",
  },
  {
    id: 3,
    name: "Exzeo Software Pvt Ltd",
    description:
      "Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Onsite", "500+", "Other Tech"],
    place: "Gurgaon",
    logo: "https://binmile.com/wp-content/uploads/2022/07/bmt-favicon.png",
  },
  {
    id: 4,
    name: "Nucleus Software Exports ",
    description:
      "Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Onsite", "0-10", "App Tech"],
    place: "Mumbai",
    logo: "https://sdettech.com/wp-content/themes/sdetech/assets/images/favicon.png",
  },
  {
    id: 5,
    name: "Ucodice Technologies IT ",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "100-200", "Other Tech"],
    place: "Pune",
    logo: "https://www.ucodice.com/images/new_logo_for_white_background.png",
  },
  {
    id: 6,
    name: "Shadow infosystem(P) ",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "50-100", "App Tech"],
    place: "Pune",
    logo: "https://www.shadowinfosystem.com/static/media/shadow-png-logo2-1.53ac2f8235b19116a576.png",
  },
  {
    id: 7,
    name: "Nexthoughts Software Technologies",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "100-200", "Other Tech"],
    place: "Pune",
    logo: "https://nexthoughts.com/wp-content/uploads/2019/12/cropped-Fevicon-logo-192x192.png",
  },
  {
    id: 8,
    name: "GrapeCity India Private ",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "10-50", "Web Tech"],
    place: "Pune",
    logo: "https://static.wixstatic.com/media/81da1e_1ce1c15b17274da5bc0c8193c28f4780%7Emv2.png/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/81da1e_1ce1c15b17274da5bc0c8193c28f4780%7Emv2.png",
  },
  {
    id: 7,
    name: "Eastern Software Solutions",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "50-100", "App Tech"],
    place: "Pune",
    logo: "https://www.essindia.com/assets/img/favicon.png",
  },
];

const MyClients = () => {
  const navigate = useNavigate();
   const [companiesfilterData, setcompaniesfilterData] = useState<any[]>([]);
  const [searchFilter, setSearchFilter] = useState<any>({
    searchValue: "",
  });


  useEffect(() => {    
    const filtered = companies.filter((item) => {
      const searchMatch =
        !searchFilter.searchValue ||
        item.name.toLowerCase().includes(searchFilter.searchValue.toLowerCase());
      return searchMatch;
    });
    setcompaniesfilterData(filtered)

  }, [searchFilter]);

  const handleDetails = (id: number) => {
    navigate(`${id}`);
  };
  return (
    <div className="px-4 pb-4">
      {/* Header */}

      {/* Search and Filters */}
      <div className="flex justify-between items-center mt-1">
        <h5 className="text-heading">Find Vendors</h5>

        <div className="flex justify-end items-center">
            <div className="flex flex-row gap-1 justify-end mb-1">
              <div className='flex flex-row gap-1 p-1 overflow-hidden'>
                <div className='flex text-center gap-3 flex-nowrap my-auto'>
                  <div className='flex grow w-[220px]'>
                    <div className='flex-col flex-grow'>
                      <TextField
                        size='small'
                        className='w-full'
                        value={searchFilter.searchValue}
                        onChange={(event) =>
                          setSearchFilter({
                            ...searchFilter,
                            searchValue: event.target.value,
                          })
                        }
                        placeholder="Search Vendors"
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position='start'>
                                <SearchIcon fontSize='inherit' />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    </div>
                  </div>
                  <IconButton aria-label='filter'>
                    <FilterListOutlinedIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
       
        {/* <Box className="flex items-center justify-end my-2">
          <Box className="flex items-center space-x-4">
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search Vendors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <Search className="mr-2" fontSize="small" />,
              }}
            />
            <Button variant="outlined" startIcon={<FilterList />}>
              Filter
            </Button>
          </Box>
        </Box> */}
      </div>

      {/* <Typography variant="body2">
        Popular: Twitter, Microsoft, Apple, Facebook
      </Typography>
      <div className="my-4">
        <Divider />
      </div> */}

      {/* Sidebar and Companies List */}
      <div className="flex">
        {/* Sidebar */}
        {/* Sidebar */}
        <div className="w-[200px]">
          <div className="grid">
            <p className="text-title ">Technologies</p>
            {[
              "Mobile App Development",
              "Front-End Development",
              "Back-End Development",
              "Full-Stack Development",
              "Cloud Technologies",
              "Artificial Intelligence (AI)",
              "Machine Learning (ML)",
              "Blockchain Development",
              "Data Science & Analytics",
              "Cybersecurity Solutions",
              "Internet of Things (IoT)",
              "DevOps",
              "QA",
              "QA Automation",
              "Augmented Reality (AR)",
              "Virtual Reality (VR)",
              "Progressive Web Applications (PWA)",
              "Microservices Architecture",
              "Low-Code/No-Code Development",
              "Robotic Process Automation (RPA)",
              "5G & Edge Computing Solutions",
            ].map((size, idx) => (
              <FormControlLabel
                key={idx}
                control={<Checkbox />}
                label={size}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "12px", // Set your desired font size
                    maxWidth: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                }}
              />
            ))}
          </div>
          <div className="grid">
            <p className="text-title mt-2">Resources</p>
            {["Onsite", "Offsite", "Hybrid"].map((industry, idx) => (
              <FormControlLabel
                key={idx}
                control={<Checkbox />}
                label={industry}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "12px", // Set your desired font size
                  },
                }}
              />
            ))}
          </div>
          <div className="grid mt-2">
            <p className="text-title">Company Strength</p>
            {[
              "0-10 (15)",
              "10-50 (26)",
              "50-100 (45)",
              "100-500 (20)",
              "500+ (19)",
            ].map((size, idx) => (
              <FormControlLabel
                key={idx}
                control={<Checkbox />}
                label={size}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "12px", // Set your desired font size
                  },
                }}
              />
            ))}
          </div>
        </div>

        {/* Company Cards */}
        <div className="w-[calc(100%-200px)]">
          <Grid container spacing={3}>
            {companiesfilterData.map((company, idx) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={idx}
                onClick={() => handleDetails(company.id)}
              >
                <div className="h-100 border p-4 rounded-md cursor-pointer">
                  <div className="flex align-center mb-4">
                    <img
                      src={
                        !company.logo
                          ? "/assets/images/Companylogo.png"
                          : company.logo
                      }
                      alt={company.name}
                      className="me-3"
                      style={{ width: 50, height: 50 }}
                    />
                    <div>
                      <p className="text-title font-bold">{company.name}</p>
                      <p className="text-base">{company.place}</p>
                    </div>
                  </div>
                  <p className="text-base">{company.description}</p>
                  <div className="flex flex-wrap mt-2">
                    {company.tags.map((tag:string, idx:any) => (
                      <Chip
                        key={idx}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: 10 }}
                        className="my-1 me-1"
                      />
                    ))}
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default MyClients;
