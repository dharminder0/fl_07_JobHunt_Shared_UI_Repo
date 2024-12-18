import { Link, Tab, Tabs } from "@mui/material";
import React from "react";
import { Grid, Chip } from "@mui/material";

const invitedData = [ 
  {
    id: 2,
    name: "Taazaa",
    description: "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "50-100", "QA Testing"],
    place: "Noida",
    contracts: "Accepted",
    logo: "https://www.taazaa.com/wp-content/uploads/2023/06/favicon-1-1.png",
  },
  {
    id: 2,
    name: "Taksh It Solutionsns",
    description:  "Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Onsite", "50-200", "QA Testing"],
    place: "Noida",
    contracts: "Declined",
    logo: "https://www.sparxitsolutions.com/favicon.ico",
  },
  {
    id: 3,
    name: "Nucleus software",
    description: "Stripe is a software platform for starting and running internet businesses.",
    tags: ["Onsite", "50-400", "App Tech"],
    place: "Noida",
    contracts: "Pending Agreements",
    logo: "https://www.nucleussoftware.com/wp-content/uploads/2023/07/cropped-logo-180x180.jpg",
  },

];

const requestedData = [ 
  {
    id: 1,
    name: "Topcubit",
    description: "Stripe is a software platform for starting and running internet businesses.",
    tags: ["Onsite", "50-500", "QA Testing"],
    place: "Noida",
    contracts: "Pending Agreements",
    logo: "https://topcubit.com/wp-content/uploads/2019/06/cropped-tcis-logo-circle-180x180.png",
  },
  {
    id: 2,
    name: "Vidyatech Solution",
    description:  "Stripe is a software platform for starting and running internet businesses.",
    tags: ["Onsite", "50-100", "Other Tech"],
    place: "Noida",
    contracts: "Pending Agreements",
    logo: "https://www.vidyatech.com/images/Vidya.ico",
  },

];

export default function VendorOnboarding() {
  const [value, setValue] = React.useState("Invited");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="p-4">
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
        {(value == "Invited") && (
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
                          <Link
                            href="#"
                            underline="none"
                            fontSize={12}
                          >
                            {company.contracts}
                          </Link>
                        )}
                      </div>
                    </div>
                    <p className="text-base">{company.description}</p>
                    <div className="flex flex-wrap mt-2">
                      {company.tags.map((tag, idx) => (
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
        )}

        {/* Requested */}
        {(value == "Requested") && (
          <Grid item xs={12} md={12}>
            <Grid container spacing={3}>
              {requestedData.map((company, idx) => (
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
                          <Link
                            href="#"
                            underline="none"
                            fontSize={12}
                          >
                            {company.contracts}
                          </Link>
                        )}
                      </div>
                    </div>
                    <p className="text-base">{company.description}</p>
                    <div className="flex flex-wrap mt-2">
                      {company.tags.map((tag, idx) => (
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
        )}
      </div>
    </div>
  );
}
