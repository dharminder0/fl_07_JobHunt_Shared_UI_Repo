// App.tsx
import React, { useState } from "react";
import { TextField, Button, Chip, Tabs, Tab, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { FilterList, Search } from "@mui/icons-material";

const activieClients = [
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

const archivedClients = [
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

const VndClients = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const handleDetails = (id: number) => {
    navigate(`${id}`);
  };

  const [tabValue, setTabValue] = React.useState("Active");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  return (
    <div className="px-4 py-1">
      {/* Header */}

      <div className="flex items-center justify-between mb-3">
        <div className="w-1/2">
          <Tabs
            value={tabValue}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="secondary tabs example"
          >
            <Tab value="Active" label="Active Clients" />
            <Tab value="Archived" label="Archived Clients" />
          </Tabs>
        </div>

        <div className="w-1/2 flex justify-end">
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
            </Box>
          </Box>
        </div>
      </div>

      <>
        {/* Active */}
        {tabValue == "Active" && (
          <Grid container spacing={4}>
            <Grid size={12}>
              <Grid container spacing={3}>
                {activieClients.map((company, idx) => (
                  <Grid
                    size={3}
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
                          {company.contracts && (
                            <p className="text-base">
                              {company.contracts} Contracts
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="text-base">{company.description}</p>
                      <div className="flex flex-wrap mt-2">
                        {company.tags.map((tag, idx) => (
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
            <Grid size={12}>
              <Grid container spacing={3}>
                {archivedClients.map((company, idx) => (
                  <Grid
                    size={3}
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
                          {company.contracts && (
                            <p className="text-base">
                              {company.contracts} Contracts
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="text-base">{company.description}</p>
                      <div className="flex flex-wrap mt-2">
                        {company.tags.map((tag, idx) => (
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

export default VndClients;
