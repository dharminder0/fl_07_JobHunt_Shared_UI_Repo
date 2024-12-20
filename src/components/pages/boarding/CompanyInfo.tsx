import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CompanyInfo = () => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [companyStrength, setCompanyStrength] = useState("");
  const [companyPortfolio, setCompanyPortfolio] = useState("");
  const [contactMail, setContactMail] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [location, setLocation] = useState({ state: "", city: "" });
  const [tierLevel, setTierLevel] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const tiers = ["Tier 1", "Tier 2", "Tier 3"];

  const handleSignup = () => {
    if (
      companyName &&
      companyStrength &&
      companyPortfolio &&
      contactMail &&
      companyWebsite &&
      mobileNumber &&
      location.state &&
      location.city &&
      tierLevel
    ) {
      // Save user details to localStorage
      localStorage.setItem("companyName", companyName);
      localStorage.setItem("companyStrength", companyStrength);
      localStorage.setItem("companyPortfolio", companyPortfolio);
      localStorage.setItem("contactMail", contactMail);
      localStorage.setItem("companyWebsite", companyWebsite);
      localStorage.setItem("mobileNumber", mobileNumber);
      localStorage.setItem("location", JSON.stringify(location));
      localStorage.setItem("tierLevel", tierLevel);
      localStorage.setItem("isLoggedIn", "true");

      setErrorMessage("");
      alert("Signup successful!");
      navigate("/");
    } else {
      setErrorMessage("Please fill in all required fields.");
    }
  };

  return (
    <form className="w-3/5 m-auto p-6 bg-white rounded-lg shadow-md space-y-4 h-auto">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Company Name"
            fullWidth
            variant="outlined"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Company Strength"
            type="number"
            fullWidth
            variant="outlined"
            placeholder="Number of Employees"
            value={companyStrength}
            onChange={(e) => setCompanyStrength(e.target.value)}
            required
            size="small"
          />
        </Grid>
      </Grid>

      <TextField
        label="Company Portfolio"
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        value={companyPortfolio}
        onChange={(e) => setCompanyPortfolio(e.target.value)}
        placeholder="Brief description of your company portfolio"
        required
        size="small"
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Contact Mail ID"
            type="email"
            fullWidth
            variant="outlined"
            value={contactMail}
            onChange={(e) => setContactMail(e.target.value)}
            placeholder="Enter your contact email"
            required
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Mobile Number"
            type="tel"
            fullWidth
            variant="outlined"
            placeholder="Enter your contact number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
            size="small"
          />
        </Grid>
      </Grid>
      <TextField
        label="Company Website"
        type="url"
        fullWidth
        variant="outlined"
        value={companyWebsite}
        onChange={(e) => setCompanyWebsite(e.target.value)}
        placeholder="Enter your website URL"
        required
        size="small"
      />

      {/* Location Fields */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="State"
            fullWidth
            variant="outlined"
            placeholder="Enter the State"
            value={location.state}
            onChange={(e) =>
              setLocation({ ...location, state: e.target.value })
            }
            required
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="City"
            fullWidth
            variant="outlined"
            placeholder="Enter the City"
            value={location.city}
            onChange={(e) => setLocation({ ...location, city: e.target.value })}
            required
            size="small"
          />
        </Grid>
      </Grid>

      {/* Error Message */}
      {errorMessage && (
        <Typography color="error" variant="body2">
          {errorMessage}
        </Typography>
      )}
      {/* <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Submit
      </Button> */}
    </form>
  );
};

export default CompanyInfo;
