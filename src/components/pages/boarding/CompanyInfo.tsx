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
import { useForm, Controller } from "react-hook-form"

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

  const { control, handleSubmit, formState: { errors }, setValue } = useForm();
  const onSubmit = (data: any) => {
    console.log(data); // Handle form submission
  };

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
    <form onSubmit={handleSubmit(onSubmit)} className="w-3/5 m-auto p-6 bg-white rounded-lg space-y-4 h-auto">
    {/* Company Name Field */}
    <Controller
        name="companyName"
        control={control}
        defaultValue=""
        rules={{ required: "Company Name is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Company Name"
            fullWidth
            variant="outlined"
            size="small"
            error={!!errors.companyName}
          />
        )}
      />

    {/* Company Portfolio Field */}
    <Controller
      name="companyPortfolio"
      control={control}
      defaultValue=""
      rules={{ required: "Company Portfolio is required" }}
      render={({ field }) => (
        <TextField
          {...field}
          label="Company Portfolio"
          multiline
          rows={8}
          fullWidth
          variant="outlined"
          placeholder="Brief description of your company portfolio"
          size="small"
          error={!!errors.companyPortfolio}
        />
      )}
    />

    <Grid container spacing={2}>
      {/* Contact Mail ID */}
      <Grid item xs={6}>
        <Controller
          name="contactMail"
          control={control}
          defaultValue=""
          rules={{ required: "Contact Mail ID is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Contact Mail ID"              
              fullWidth
              variant="outlined"
              placeholder="Enter your contact email"
              size="small"
              error={!!errors.contactMail}
            />
          )}
        />
      </Grid>

      {/* Mobile Number */}
      <Grid item xs={6}>
        <Controller
          name="mobileNumber"
          control={control}
          defaultValue=""
          rules={{ required: "Mobile Number is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Mobile Number"
              fullWidth
              variant="outlined"
              placeholder="Enter your contact number"
              size="small"
              error={!!errors.mobileNumber}
            />
          )}
        />
      </Grid>
    </Grid>

    <Grid container spacing={2}>
      {/* Company Website */}
      <Grid item xs={6}>
        <Controller
          name="companyWebsite"
          control={control}
          defaultValue=""
          rules={{ required: "Company Website is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Company Website"
              fullWidth
              variant="outlined"
              placeholder="Enter your website URL"
              size="small"
              error={!!errors.companyWebsite}
            />
          )}
        />
      </Grid>

      {/* Company Strength */}
      <Grid item xs={6}>
        <Controller
          name="companyStrength"
          control={control}
          defaultValue=""
          rules={{ required: "Company Strength is required"}}
          render={({ field }) => (
            <TextField
              {...field}
              label="Company Strength"
              type="number"
              fullWidth
              variant="outlined"
              placeholder="Number of Employees"
              size="small"
              error={!!errors.companyStrength}
            />
          )}
        />
      </Grid>
    </Grid>

    {/* Error Message */}
    {errors && (
      <Typography color="error" variant="body2">
        {Object.values(errors).map((err: any) => (
          <div key={err.message}>{err.message}</div>
        ))}
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
