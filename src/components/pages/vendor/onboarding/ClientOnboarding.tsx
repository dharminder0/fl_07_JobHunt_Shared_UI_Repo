import { Link, Tab, Tabs } from "@mui/material";
import React from "react";
import { Grid, Chip } from "@mui/material";

const invitedData = [
  {
    id: 1,
    name: "Globant",
    description: "Stripe is a software platform for starting and running internet businesses.",
    tags: ["Onsite", "50-100", "QA Testing"],
    place: "Noida",
    contracts: "Accepted",
    logo: "https://statics.globant.com/production/public/Fav-icon_Globant_8_2.png",
  },
  {
    id: 2,
    name: "Netcracker Technology",
    description:  "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "10-50", "App Tech"],
    place: "Delhi(NCR)",
    contracts: "Declined",
    logo: "https://www.netcracker.com/assets/templates/v.3.0/favicon/favicon-72.png",
  },
  {
    id: 3,
    name: "Precision Techserve",
    description: "Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Onsite", "500+", "Other Tech"],
    place: "Gurgaon",
    contracts: "Pending Agreements",
    logo: "https://www.precisionit.co.in/core/views/6f2230b236/assets/images/fav-icon.png",
  },
];

const RequestedData = [
  {
    id: 4,
    name: "GirnarSoft",
    description:  "Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Onsite", "0-10", "App Tech"],
    place: "Mumbai",
    contracts: "Pending Approval",
    logo: "https://www.girnarsoft.com/wp-content/uploads/2020/02/fav.png",
  },
  {
    id: 5,
    name: "RAMTeCH Software Solutions",
    description:  "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "100-500", "Other Tech"],
    place: "Pune",
    contracts: "Approved",
    logo: "https://www.ramtech-corp.com/wp-content/uploads/2021/07/cropped-logo-192x192.png",
  },
];

export default function ClientOnboarding() {
  const [value, setValue] = React.useState("Invited");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="px-4 py-1">
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab value="Invited" label="Invited for Empanelment" />
        <Tab value="Requested" label="Requested for Empanelment" />
      </Tabs>

      <div className="mt-4">
        {/* Invited */}
        {value == "Invited" && (
          <Grid item xs={12} md={12}>
            <Grid container spacing={3}>
              {invitedData.map((company, idx) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={idx}
                  // onClick={() => handleDetails(company.id)}
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
                          <Link href="#" underline="none" fontSize={12}>
                            {company.contracts}
                          </Link>
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
        )}

        {/* Requested */}
        {value == "Requested" && (
          <Grid item xs={12} md={12}>
            <Grid container spacing={3}>
              {RequestedData.map((company, idx) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={idx}
                  // onClick={() => handleDetails(company.id)}
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
                          <Link href="#" underline="none" fontSize={12}>
                            {company.contracts}
                          </Link>
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
        )}
      </div>
    </div>
  );
}
