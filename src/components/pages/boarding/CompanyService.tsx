import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const CompanyService = () => {
  // Form state
  const [companyModule, setCompanyModule] = useState("");
  const [resources, setResources] = useState("");
  const [clientsServed, setClientsServed] = useState("");
  const [internationalProjects, setInternationalProjects] = useState("");
  const [rateCard, setRateCard] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const companyModules: Array<string> = [
    "Staff Augmentation",
    "Fixed Project",
    "Dedicated Team",
    "Software Outsourcing",
    "All of the Above",
  ];

  const resourcesOptions: Array<string> = ["Onsite", "Offsite", "Hybrid", "All of the Above"];

  const handleFileUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setRateCard(file);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (
      companyModule &&
      resources &&
      clientsServed &&
      internationalProjects &&
      rateCard
    ) {
      alert("Form submitted successfully!");

      // Optionally save the data to localStorage or process it
      console.log({
        companyModule,
        resources,
        clientsServed,
        internationalProjects,
        rateCard: rateCard.name,
      });
    } else {
      setErrorMessage("Please fill in all required fields.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-2/5 m-auto p-6 bg-white rounded-lg shadow-md h-auto"
    >
      <Typography variant="h5" className="font-bold mb-4">
        Company Services and Resources
      </Typography>

      {/* Company Module Selection */}
      <FormControl fullWidth margin="normal" required>
        <InputLabel id="company-module-label">Company Module</InputLabel>
        <Select
          labelId="company-module-label"
          value={companyModule}
          label="Company Module"
          onChange={(e) => setCompanyModule(e.target.value)}
        >
          {companyModules.map((module) => (
            <MenuItem key={module} value={module}>
              {module}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Resources Available For */}
      <FormControl fullWidth margin="normal" required>
        <InputLabel id="resources-label">Resources Available For</InputLabel>
        <Select
          labelId="resources-label"
          value={resources}
          label="Resources Available For"
          onChange={(e) => setResources(e.target.value)}
        >
          {resourcesOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Upload Rate Card */}
      <Box mt={2}>
        <Typography>Company Rate Card (Upload)</Typography>
        <input type="file" onChange={handleFileUpload} className="mt-2" />
        {rateCard && <p>Selected File: {rateCard.name}</p>}
      </Box>

      {/* Total Number of Clients Served */}
      <TextField
        label="Total Number of Clients Served"
        type="number"
        fullWidth
        margin="normal"
        variant="outlined"
        placeholder="Enter the total number of clients"
        value={clientsServed}
        onChange={(e) => setClientsServed(e.target.value)}
        required
      />

      {/* Have you worked on any international projects? */}
      <Typography sx={{ mt: 2 }}>International Projects Experience</Typography>
      <RadioGroup
        row
        value={internationalProjects}
        onChange={(e) => setInternationalProjects(e.target.value)}
      >
        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="No" control={<Radio />} label="No" />
      </RadioGroup>

      {/* Error Message */}
      {errorMessage && (
        <Typography color="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      )}

      {/* Submit Button */}
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

export default CompanyService;
