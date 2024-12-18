// App.tsx
import { FilterList, Search } from "@mui/icons-material";
import {
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Chip,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const companies = [
  {
    id: 1,
    name: "Motherson Technology",
    description:"Stripe is a software platform for starting and running internet businesses.",
    tags: ["Onsite", "50-100", "QA Testing"],
    place: "Noida",
    logo: "https://www.mothersontechnology.com/wp-content/uploads/2021/06/cropped-cropped-favicon-192x192.png",
  },
  {
    id: 2,
    name: "Axtria",
    description:"Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "10-50", "App Tech"],
    place: "Delhi(NCR)",
    logo: "https://39530062.fs1.hubspotusercontent-na1.net/hub/39530062/hubfs/Axtria/Home/Axtria_Logo-300x102.png?width=300&height=102&name=Axtria_Logo-300x102.png",
  },
  {
    id: 3,
    name: "MPS Limited",
    description: "Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Onsite", "500+", "Other Tech"],
    place: "Gurgaon",
    logo: "https://d12ux7ql5zx5ks.cloudfront.net/wp-content/uploads/MPS_LOGO_37df55fb0f6fe049cc780587d3693251-11.png",
  },
  {
    id: 4,
    name: "Orient Technologies",
    description:"Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Onsite", "0-10", "App Tech"],
    place: "Mumbai",
    logo: "https://static.ambitionbox.com/assets/v2/images/rs:fit:200:200:false:false/bG9jYWw6Ly8vbG9nb3Mvb3JpZ2luYWxzL29yaWVudC10ZWNobm9sb2dpZXMuanBn.webp",
  },
  {
    id: 5,
    name: "Nucleus Software Exports",
    description: "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "100-200", "Other Tech"],
    place: "Gujrat",
    logo: "https://static.ambitionbox.com/assets/v2/images/rs:fit:200:200:false:false/bG9jYWw6Ly8vbG9nb3Mvb3JpZ2luYWxzL251Y2xldXMtc29mdHdhcmUtZXhwb3J0cy5qcGc.webp",
  },
  {
    id: 6,
    name: "Unimoni",
    description:  "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "50-100", "App Tech"],
    place: "Gurgaon",
    logo: "https://www.unimoni.in/images/icon/favicon.ico",
  },
  {
    id: 7,
    name: "Damco Solutions",
    description:"Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "100-200", "Other Tech"],
    place: "Pune",
    logo: "https://www.damcogroup.com/wp-content/themes/DamcoNew/images/favicon.ico",
  },
  {
    id: 8,
    name: "Foray Software",
    description:  "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "10-50", "Web Tech"],
    place: "Gurgaon",
    logo: "https://www.foraysoft.com/assets/images/favicon.png",
  },
  {
    id: 7,
    name: "Impetus Technologies",
    description:"Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "50-100", "App Tech"],
    place: "Pune",
    logo: "https://www.impetus.com/wp-content/uploads/2022/02/cropped-favicon-32x32.png",
  },
];

const VndSearchClients = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const handleDetails = (id: number) => {
    navigate(`${id}`);
  };
  return (
    <div className="px-4 py-1">
      {/* Header */}

      {/* Search and Filters */}
      <div className="flex justify-between items-center">
        <h5 className="text-heading">Search Clients</h5>
        {/* <div className="flex w-3/5 items-center">
          <TextField
            fullWidth
            label="Company title or keyword"
            variant="outlined"
            size="small"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ width: 170, marginLeft: 2 }}
          >
            Search
          </Button>
        </div> */}
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

      {/* Sidebar and Companies List */}
      <div className="flex">
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

export default VndSearchClients;
