// App.tsx
import React, { useState } from "react";
import { TextField, Button, Chip, Tabs, Tab, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useLocation, useNavigate } from "react-router-dom";
import { FilterList, Search } from "@mui/icons-material";

const activieClients = [
  {
    id: 1,
    name: "Teleperformance",
    description: "Teleperformance is the leading global provider of outsourced Digital Integrated Business Services.",
    tags: ["Onsite", "50-100", "QA Testing"],
    place: "Noida",
    contracts: "20",
    logo: "https://www.teleperformance.com/css/assets/favicon.ico",
  },
  {
    id: 2,
    name: "KPIT Technologiess",
    description:"Fully integrated technology & services that power the world’s best brands today and into the future.",
    tags: ["Onsite", "10-50", "App Tech"],
    place: "Delhi(NCR)",
    contracts: "10",
    logo: "https://d1rz4ui464s6g7.cloudfront.net/wp-content/uploads/2024/05/20122313/kpit-favicon.png",
  },
  {
    id: 3,
    name: "Mphasis",
    description: "Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Onsite", "500+", "Other Tech"],
    place: "Gurgaon",
    contracts: "12",
    logo: "https://www.mphasis.com/content/dam/mphasis-com/common/icons/favicon.ico",
  },
];

const archivedClients = [
  {
    id: 4,
    name: "Fidelity Information Services",
    description:"Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Onsite", "0-10", "App Tech"],
    place: "Mumbai",
    contracts: "16",
    logo: "https://www.fisglobal.com/-/media/fisglobal/images/Main/logos/FISfavicons/favicon-192x192.png",
  },
  {
    id: 5,
    name: "Coforge",
    description: "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "100-500", "Other Tech"],
    place: "Pune",
    contracts: "18",
    logo: "https://careers.coforge.com/coforge/favicon.ico",
  },
];

const VndClients = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const handleDetails = (id: number) => {
    navigate(`${id}`, {
      state: { previousUrl: location.pathname },
    })
  }
  

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
