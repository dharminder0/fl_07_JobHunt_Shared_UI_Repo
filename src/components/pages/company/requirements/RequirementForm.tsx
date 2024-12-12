import React, { useState } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Add, HdrPlus } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

const steps = [
  { label: "Select Post Type", description: "" },
  { label: "Fill Post Details", description: "" },
  { label: "Share Preferences", description: "" },
];

const RequirementForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [postType, setPostType] = useState("single");
  const [formValues, setFormValues] = useState({
    title: "",
    jobDescription: "",
    type: "",
    budget: "",
    shareIt: "specificVendor",
  });

  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handlePostTypeChange = (event: any) => {
    setPostType(event.target.value);
  };

  const handleFormChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Form Submitted", formValues);
    alert("Form submitted successfully!");
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="">
      {/* <Button
        variant="contained"
        onClick={toggleDrawer(true)}
        startIcon={<Add />}
      >
        Post requirements
      </Button> */}
      <Button
        variant="contained"
        className="bg-[#4640DE]"
        onClick={toggleDrawer(true)}
      >
        <svg
          className="mr-[10px]"
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_279_16506)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.5 4C13.0523 4 13.5 4.44772 13.5 5V19C13.5 19.5523 13.0523 20 12.5 20C11.9477 20 11.5 19.5523 11.5 19V5C11.5 4.44772 11.9477 4 12.5 4Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.5 12C4.5 11.4477 4.94772 11 5.5 11H19.5C20.0523 11 20.5 11.4477 20.5 12C20.5 12.5523 20.0523 13 19.5 13H5.5C4.94772 13 4.5 12.5523 4.5 12Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_279_16506">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(0.5)"
              />
            </clipPath>
          </defs>
        </svg>
        <span>Post a requirement</span>
      </Button>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div style={{ width: "calc(100vw - 250px)" }}>
          <div className="p-4 border-b">
            <h2 className="text-xl">Post Requirements</h2>
          </div>

          <Stepper activeStep={activeStep} orientation="vertical" className="mx-auto w-[90%] my-4">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  {index === 0 && (
                    <FormControl fullWidth className="mb-4">
                      <FormLabel>Post Type</FormLabel>
                      <Select
                        value={postType}
                        onChange={handlePostTypeChange}
                        className="my-4"
                      >
                        <MenuItem value="single">Single</MenuItem>
                        <MenuItem value="multiple">Multiple</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                  {index === 1 && postType === "single" && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <TextField
                        label="Title"
                        name="title"
                        fullWidth
                        variant="outlined"
                        value={formValues.title}
                        onChange={handleFormChange}
                      />

                      <TextField
                        label="Job Description"
                        name="jobDescription"
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        value={formValues.jobDescription}
                        onChange={handleFormChange}
                      />

                      <FormControl fullWidth>
                        <FormLabel>Type</FormLabel>
                        <Select
                          name="type"
                          value={formValues.type}
                          onChange={handleFormChange}
                          className="mt-2"
                        >
                          <MenuItem value="fullTime">Full Time</MenuItem>
                          <MenuItem value="partTime">Part Time</MenuItem>
                          <MenuItem value="freelance">Freelance</MenuItem>
                        </Select>
                      </FormControl>

                      <TextField
                        label="Budget"
                        name="budget"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={formValues.budget}
                        onChange={handleFormChange}
                      />
                    </form>
                  )}
                  {index === 1 && postType !== "single" && (
                    <div>
                      <p>Import Excel or CSV file for multiple posts.</p>
                      <Button
                        variant="contained"
                        component="label"
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        Upload File
                        <input type="file" accept=".csv, .xlsx" hidden />
                      </Button>
                    </div>
                  )}
                  {index === 2 && (
                    <FormControl component="fieldset">
                      <FormLabel>Share It</FormLabel>
                      <RadioGroup
                        name="shareIt"
                        value={formValues.shareIt}
                        onChange={handleFormChange}
                      >
                        <FormControlLabel
                          value="specificVendor"
                          control={<Radio />}
                          label="Specific Vendor"
                        />
                        <FormControlLabel
                          value="allEmpanelledVendors"
                          control={<Radio />}
                          label="All Empanelled Vendors"
                        />
                        <FormControlLabel
                          value="globalVendor"
                          control={<Radio />}
                          label="Global Vendor"
                        />
                      </RadioGroup>
                    </FormControl>
                  )}

                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      onClick={
                        index === steps.length - 1 ? handleSubmit : handleNext
                      }
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Submit" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default RequirementForm;
