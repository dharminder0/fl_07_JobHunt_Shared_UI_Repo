import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import FileUploadBox from "../../common/FileUploadBox";

const CompanyService = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [rateCard, setRateCard] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const companyModules: Array<string> = [
    "Staff Augmentation",
    "Fixed Project",
    "Dedicated Team",
    "Software Outsourcing",
    "All of the Above",
  ];

  const resourcesOptions: Array<string> = [
    "Onsite",
    "Offsite",
    "Hybrid",
    "All of the Above",
  ];

  const handleFileUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setRateCard(file);
    }
  };

  const onSubmit = (data: any) => {
    if (
      data.companyModule &&
      data.resources &&
      data.clientsServed &&
      data.internationalProjects &&
      rateCard
    ) {
      alert("Form submitted successfully!");
      // Optionally save the data to localStorage or process it
      console.log({
        companyModule: data.companyModule,
        resources: data.resources,
        clientsServed: data.clientsServed,
        internationalProjects: data.internationalProjects,
        rateCard: rateCard.name,
      });
    } else {
      setErrorMessage("Please fill in all required fields.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-2/5 m-auto p-6 bg-white rounded-lg  h-auto"
    >
      {/* Company Module Selection */}
      <FormControl size="small" fullWidth margin="normal" required>
        <InputLabel id="company-module-label">Company Module</InputLabel>
        <Controller
          name="companyModule"
          control={control}
          defaultValue=""
          rules={{ required: "Company Module is required" }}
          render={({ field }) => (
            <Select
              {...field}
              labelId="company-module-label"
              id="company-module-select"
              label="Company Module"
            >
              {companyModules.map((module, index) => (
                <MenuItem key={index} value={module}>
                  {module}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      {/* Resources Available For */}
      <FormControl size="small" fullWidth margin="normal" required>
        <InputLabel id="resources-label">Resources Available For</InputLabel>
        <Controller
          name="resources"
          control={control}
          defaultValue=""
          rules={{ required: "Resources Available For is required" }}
          render={({ field }) => (
            <Select
              {...field}
              labelId="resources-label"
              label="Resources Available For"
            >
              {resourcesOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      {/* Upload Rate Card */}
      <Box mt={2}>
        <Typography className="!text-base">
          Company Rate Card (Upload)
        </Typography>
        {/* <input type="file" onChange={handleFileUpload} className="mt-2" />
        {rateCard && <p>Selected File: {rateCard.name}</p>} */}
        <div className="mt-2">
          <FileUploadBox title="upload file" iconType="file" />
        </div>
      </Box>

      {/* Total Number of Clients Served */}
      <Controller
        name="clientsServed"
        control={control}
        defaultValue=""
        rules={{ required: "Total Number of Clients Served is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Total Number of Clients Served"
            type="number"
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="Enter the total number of clients"
            size="small"
            error={!!errors.clientsServed}
          />
        )}
      />

      {/* International Projects Experience */}
      <Typography className="!text-base" sx={{ mt: 2 }}>
        International Projects Experience
      </Typography>
      <Controller
        name="internationalProjects"
        control={control}
        defaultValue=""
        rules={{ required: "Please select an option" }}
        render={({ field }) => (
          <RadioGroup row {...field}>
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        )}
      />

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
