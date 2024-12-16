import { Link, Tab, Tabs } from "@mui/material";
import React from "react";
import { Grid, Chip } from "@mui/material";

const companies = [
  {
    id: 1,
    name: "Fleek IT Solutions",
    description:
      "Stripe is a software platform for starting and running internet businesses.",
    tags: ["Onsite", "50-100", "QA Testing"],
    place: "Noida",
    contracts: "Accepted",
    logo: "https://fleekitsolutions.com/wp-content/uploads/2023/09/favicon-32x32-1.png",
  },
  {
    id: 2,
    name: "DevStringX Technologies",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "10-50", "App Tech"],
    place: "Delhi(NCR)",
    contracts: "Declined",
    logo: "https://www.devstringx.com/wp-content/uploads/2018/03/favicon.ico",
  },
  {
    id: 3,
    name: "Binemiles Technologies",
    description:
      "Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Onsite", "500+", "Other Tech"],
    place: "Gurgaon",
    contracts: "Pending Agreements",
    logo: "https://binmile.com/wp-content/uploads/2022/07/bmt-favicon.png",
  },
  {
    id: 4,
    name: "SDET Tech Pvt. Ltd",
    description:
      "Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Onsite", "0-10", "App Tech"],
    place: "Mumbai",
    contracts: "Pending Approval",
    logo: "https://sdettech.com/wp-content/themes/sdetech/assets/images/favicon.png",
  },
  {
    id: 5,
    name: "JigNect Technologies",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "100-500", "Other Tech"],
    place: "Pune",
    contracts: "Approved",
    logo: "https://jignect.tech/wp-content/uploads/2023/01/cropped-JT-Main-ONLY-LOGO-01-192x192.png",
  },
];

export default function ClientOnboarding() {
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

      {(value == "Invited" || value == "Requested") && (
        <div className="mt-4">
          {/* Company Cards */}
          <Grid item xs={12} md={12}>
            <Grid container spacing={3}>
              {companies.map((company, idx) => (
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
        </div>
      )}
    </div>
  );
}
