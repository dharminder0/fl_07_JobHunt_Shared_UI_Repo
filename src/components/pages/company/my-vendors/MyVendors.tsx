// App.tsx
import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Select,
  Button,
  Typography,
  Pagination,
  Checkbox,
  FormControlLabel,
  Divider,
  Chip,
  InputAdornment,
  Tabs,
  Tab,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";

const activeData = [
  {
    id: 1,
    name: "Fleek IT Solutions",
    description:
      "Stripe is a software platform for starting and running internet businesses.",
    tags: ["Onsite", "50-100", "QA Testing"],
    place: "Noida",
    contracts: "20",
    logo: "https://fleekitsolutions.com/wp-content/uploads/2023/09/favicon-32x32-1.png",
  },
  {
    id: 2,
    name: "DevStringX Technologies",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "10-50", "App Tech"],
    place: "Delhi(NCR)",
    contracts: "10",
    logo: "https://www.devstringx.com/wp-content/uploads/2018/03/favicon.ico",
  },
  {
    id: 3,
    name: "Binemiles Technologies",
    description:
      "Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Onsite", "500+", "Other Tech"],
    place: "Gurgaon",
    contracts: "12",
    logo: "https://binmile.com/wp-content/uploads/2022/07/bmt-favicon.png",
  },
];

const archivedData = [
  {
    id: 4,
    name: "SDET Tech Pvt. Ltd",
    description:
      "Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Onsite", "0-10", "App Tech"],
    place: "Mumbai",
    contracts: "16",
    logo: "https://sdettech.com/wp-content/themes/sdetech/assets/images/favicon.png",
  },
  {
    id: 5,
    name: "JigNect Technologies",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "100-500", "Other Tech"],
    place: "Pune",
    contracts: "18",
    logo: "https://jignect.tech/wp-content/uploads/2023/01/cropped-JT-Main-ONLY-LOGO-01-192x192.png",
  },
];

const MyVendors = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleDetails = (id: number) => {
    navigate(`${id}?type=activeView`, { state: { previousUrl: location.pathname }});    
  };

  const [tabValue, setTabValue] = React.useState("Active");
  const [activefilterData, setactivefilterData] = useState<any[]>([]);
  const [archivedDatafilterData, setarchivedDatafilterData] = useState<any[]>([]);
  const [searchFilter, setSearchFilter] = useState<any>({
    searchValue: "",
  });

  useEffect(() => {
    const activeTabData = tabValue === 'Active' ? activeData : archivedData;
    const filtered = activeTabData.filter((item) => {
      const searchMatch =
        !searchFilter.searchValue ||
        item.name.toLowerCase().includes(searchFilter.searchValue.toLowerCase());
      return searchMatch;
    });

    tabValue === 'Active' ? setactivefilterData(filtered) : setarchivedDatafilterData(filtered);
  }, [searchFilter, tabValue]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  return (
    <div className="px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 mt-1">
        <div className="w-1/2">
          <Tabs
            value={tabValue}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="secondary tabs example"
          >
            <Tab value="Active" label="Active Vendors" />
            <Tab value="Archived" label="Archived Vendors" />
          </Tabs>
        </div>
        <div className="w-1/2 flex flex-row justify-end">
          <div className='flex flex-row gap-1 p-1 overflow-hidden'>
            <div className='flex text-center flex-nowrap my-auto'>
              <div className='flex grow w-[220px] mr-2'>
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
            </div>
            <IconButton aria-label='filter'>
              <FilterListOutlinedIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <>
        {/* Active */}
        {tabValue == "Active" && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <Grid container spacing={3}>
                {activefilterData.map((company, idx) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
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
                          <Tooltip title={company.name} arrow>
                            <p className="text-title font-bold line-clamp-1" >{company.name}</p>
                          </Tooltip>
                          <p className="text-base line-clamp-1">{company.place}</p>
                          {company.contracts && (
                            <p className="text-base">
                              {company.contracts} Contracts
                            </p>
                          )}
                        </div>
                      </div>
                      <Tooltip title={company.description} arrow>
                        <p className="text-base line-clamp-2">{company.description}</p>
                      </Tooltip>
                      <div className="flex flex-wrap mt-2">
                        {company.tags.map((tag: any, idx: any) => (
                          // <Typography
                          //   key={idx}
                          //   variant="caption"
                          //   className="p-1 border rounded"
                          //   marginTop={1}
                          //   marginRight={1}
                          // >
                          //   {tag}
                          // </Typography>
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
            </Grid>
          </Grid>
        )}

        {/* Archived */}
        {tabValue == "Archived" && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <Grid container spacing={3}>
                {archivedDatafilterData.map((company, idx) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
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
                          <Tooltip title={company.name} arrow>
                            <p className="text-title font-bold line-clamp-1" >{company.name}</p>
                          </Tooltip>
                          <p className="text-base line-clamp-1">{company.place}</p>
                          {company.contracts && (
                            <p className="text-base">
                              {company.contracts} Contracts
                            </p>
                          )}
                        </div>
                      </div>
                      <Tooltip title={company.description} arrow>
                        <p className="text-base line-clamp-2">{company.description}</p>
                      </Tooltip>
                      <div className="flex flex-wrap mt-2">
                        {company.tags.map((tag: any, idx: any) => (
                          // <Typography
                          //   key={idx}
                          //   variant="caption"
                          //   className="p-1 border rounded"
                          //   marginTop={1}
                          //   marginRight={1}
                          // >
                          //   {tag}
                          // </Typography>
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
            </Grid>
          </Grid>
        )}
      </>
    </div>
  );
};

export default MyVendors;
