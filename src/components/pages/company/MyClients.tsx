// App.tsx
import React from "react";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const companies = [
  {
    id: 1,
    name: "Cyient Limited",
    description:
      "Stripe is a software platform for starting and running internet businesses.",
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
    logo: "https://jignect.tech/wp-content/uploads/2023/01/cropped-JT-Main-ONLY-LOGO-01-192x192.png",
  },
  {
    id: 6,
    name: "Shadow infosystem(P) ",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "50-100", "App Tech"],
    place: "Pune",
    logo: "https://jignect.tech/wp-content/uploads/2023/01/cropped-JT-Main-ONLY-LOGO-01-192x192.png",
  },
  {
    id: 7,
    name: "Nexthoughts Software Technologies",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "100-200", "Other Tech"],
    place: "Pune",
    logo: "https://jignect.tech/wp-content/uploads/2023/01/cropped-JT-Main-ONLY-LOGO-01-192x192.png",
  },
  {
    id: 8,
    name: "GrapeCity India Private ",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "10-50", "Web Tech"],
    place: "Pune",
    logo: "https://jignect.tech/wp-content/uploads/2023/01/cropped-JT-Main-ONLY-LOGO-01-192x192.png",
  },
  {
    id: 7,
    name: "Eastern Software Solutions",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "50-100", "App Tech"],
    place: "Pune",
    logo: "https://jignect.tech/wp-content/uploads/2023/01/cropped-JT-Main-ONLY-LOGO-01-192x192.png",
  },
];

const MyClients = () => {
  const navigate = useNavigate();
  const handleDetails = (id: number) => {
    navigate(`${id}`);
  };
  return (
    <div className="px-6">
      {/* Header */}

      {/* Search and Filters */}
      <div className="flex justify-between items-center my-4">
        <h5 className="text-heading">Find Vendors</h5>
        <div className="flex w-3/5 items-center">
          <TextField
            fullWidth
            label="Company title or keyword"
            variant="outlined"
            size="small"
            // slotProps={{
            //   input: {
            //     startAdornment: (
            //       <InputAdornment position="start">
            //         <SearchIcon fontSize="inherit" />
            //       </InputAdornment>
            //     ),
            //   },
            // }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ width: 170, marginLeft: 2 }}
          >
            Search
          </Button>
        </div>
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
            {companies.map((company, idx) => (
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
        </div>
      </div>
    </div>
  );
};

export default MyClients;
