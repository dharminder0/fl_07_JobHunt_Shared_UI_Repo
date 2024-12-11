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
} from "@mui/material";
import CompanyLogo from "../../../assets/images/CompanyLogo.png";

const companies = [
  {
    name: "Stripe",
    description:
      "Stripe is a software platform for starting and running internet businesses.",
    tags: ["Business", "Payment gateway"],
    jobs: 7,
    logo: "https://via.placeholder.com/100", // Replace with your logo
  },
  {
    name: "Truebill",
    description:
      "Take control of your money. Truebill develops a mobile app...",
    tags: ["Business"],
    jobs: 7,
    logo: "https://via.placeholder.com/100",
  },
  {
    name: "Square",
    description:
      "Square builds common business tools in unconventional ways...",
    tags: ["Business", "Blockchain"],
    jobs: 7,
    logo: "https://via.placeholder.com/100",
  },
  {
    name: "Square",
    description:
      "Square builds common business tools in unconventional ways...",
    tags: ["Business", "Blockchain"],
    jobs: 7,
    logo: "https://via.placeholder.com/100",
  },
  {
    name: "Truebill",
    description:
      "Take control of your money. Truebill develops a mobile app...",
    tags: ["Business"],
    jobs: 7,
    logo: "https://via.placeholder.com/100",
  },
  {
    name: "Stripe",
    description:
      "Stripe is a software platform for starting and running internet businesses.",
    tags: ["Business", "Payment gateway"],
    jobs: 7,
    logo: "https://via.placeholder.com/100", // Replace with your logo
  },
  {
    name: "Square",
    description:
      "Square builds common business tools in unconventional ways...",
    tags: ["Business", "Blockchain"],
    jobs: 7,
    logo: "https://via.placeholder.com/100",
  },
  {
    name: "Truebill",
    description:
      "Take control of your money. Truebill develops a mobile app...",
    tags: ["Business"],
    jobs: 7,
    logo: "https://via.placeholder.com/100",
  },
  {
    name: "Stripe",
    description:
      "Stripe is a software platform for starting and running internet businesses.",
    tags: ["Business", "Payment gateway"],
    jobs: 7,
    logo: "https://via.placeholder.com/100", // Replace with your logo
  },
];

const MyVendors = () => {
  return (
    <div className="container">
      {/* Header */}
      <div className="flex justify-between align-center my-4">
        <Typography variant="h4">My Vendors</Typography>
        <Button variant="contained" color="primary">
          Back to Homepage
        </Button>
      </div>

      {/* Search and Filters */}
      <Grid container spacing={2} alignItems="center" className="mb-4">
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Company title or keyword"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Select fullWidth defaultValue="Florence, Italy" variant="outlined">
            <MenuItem value="Florence, Italy">Florence, Italy</MenuItem>
            <MenuItem value="New York, USA">New York, USA</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button fullWidth variant="contained" color="primary">
            Search
          </Button>
        </Grid>
      </Grid>

      <Typography variant="body2">
        Popular: Twitter, Microsoft, Apple, Facebook
      </Typography>
      <div className="my-2">
        <Divider />
      </div>

      {/* Sidebar and Companies List */}
      <Grid container spacing={4}>
        {/* Sidebar */}
        <Grid item xs={12} md={2}>
          <Typography variant="h6">Industry</Typography>
          {[
            "Advertising (43)",
            "Business Service (4)",
            "Blockchain (5)",
            "Software Developer (10)",
            "Advertising (43)",
            "Business Service (4)",
            "Blockchain (5)",
            "Software Developer (10)",
          ].map((industry, idx) => (
            <FormControlLabel
              key={idx}
              control={<Checkbox />}
              label={industry}
              className="d-block"
            />
          ))}
          <Typography variant="h6" className="mt-4 mb-2">
            Company Size
          </Typography>
          {["1-50 (25)", "51-150 (57)", "151-250 (45)"].map((size, idx) => (
            <FormControlLabel
              key={idx}
              control={<Checkbox />}
              label={size}
              className="d-block"
            />
          ))}
        </Grid>

        {/* Company Cards */}
        <Grid item xs={12} md={10}>
          <div className="flex my-2 align-center justify-between">
            <Typography variant="h5" className="mb-4">
              All Vendors
            </Typography>
            <div>
              {" "}
              <Typography variant="body2" className="mb-4">
                Sort by:
              </Typography>
            </div>
          </div>
          <Grid container spacing={3}>
            {companies.map((company, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card variant="outlined" className="h-100">
                  <CardContent>
                    <div className="flex align-center mb-4">
                      <img
                        src={CompanyLogo}
                        alt={company.name}
                        className="me-3"
                        style={{ width: 50, height: 50 }}
                      />
                      <div>
                        <Typography variant="h6">{company.name}</Typography>
                        <Typography variant="caption">
                          {company.jobs} Jobs
                        </Typography>
                      </div>
                    </div>
                    <Typography variant="body2" className="mb-2">
                      {company.description}
                    </Typography>
                    <div className="flex flex-wrap">
                      {company.tags.map((tag, idx) => (
                        <Typography
                          key={idx}
                          variant="caption"
                          className="p-1 border rounded"
                          marginTop={1}
                          marginRight={1}
                        >
                          {tag}
                        </Typography>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-4">
            <Pagination count={10} color="primary" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyVendors;
