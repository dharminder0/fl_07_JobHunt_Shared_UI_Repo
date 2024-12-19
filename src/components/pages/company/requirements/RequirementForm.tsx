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

const steps = ["Basic Information", "Additional Information"];

const RequirementForm = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    postType: "single",
    client: "",
    title: "",
    description: "",
    experience: "",
    budget: "",
    jobLocation: "onsite",
    location: "",
    vendor: "",
    positions: "",
    contractPeriod: "",
    remarks: "",
    shareType: "specific",
    file: null, // File upload for multiple post type
  });

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files }: any = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="">
      <Button
        variant="contained"
        onClick={toggleDrawer(true)}
        startIcon={<Add />}
      >
        Post a requirement
      </Button>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div style={{ width: "calc(100vw - 250px)" }}>
          <div className="p-4 border-b">
            <h2 className="text-xl">Post Requirements</h2>
          </div>

          <div className="p-4 w-[50%] mx-auto">
            {/* Stepper */}
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Step 1 */}
            {activeStep === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="col-span-2 flex items-center gap-4">
                  <label className="text-base">Post Type:</label>
                  <RadioGroup
                    row
                    name="postType"
                    value={formData.postType}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="single"
                      control={<Radio size="small" />}
                      label="Single"
                    />
                    <FormControlLabel
                      value="multiple"
                      control={<Radio size="small" />}
                      label="Multiple"
                    />
                  </RadioGroup>
                </div>

                {/* Conditional Rendering */}
                {formData.postType === "single" ? (
                  <>
                    <div>
                      <TextField
                        label="Select Client"
                        name="client"
                        value={formData.client}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                      />
                      <label className="text-info">
                        Client information will not be shared with Vendors
                      </label>
                    </div>
                    <TextField
                      label="Title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    />
                    <TextField
                      label="Job Description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={10}
                      className="col-span-2"
                      size="small"
                    />
                    <TextField
                      label="Experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    />
                    <TextField
                      label="Budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    />
                    <div className="col-span-2 flex items-center gap-4">
                      <label className="text-base">Job Location:</label>
                      <RadioGroup
                        row
                        name="jobLocation"
                        value={formData.jobLocation}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="onsite"
                          control={<Radio size="small" />}
                          label="Onsite"
                        />
                        <FormControlLabel
                          value="hybrid"
                          control={<Radio size="small" />}
                          label="Hybrid"
                        />
                        <FormControlLabel
                          value="remote"
                          control={<Radio size="small" />}
                          label="Remote"
                        />
                      </RadioGroup>
                    </div>
                    <TextField
                      label="Enter Location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    />
                  </>
                ) : (
                  <div className="col-span-2">
                    <label className="block text-title mb-2">Upload File</label>
                    <TextField
                      type="file"
                      name="file"
                      onChange={handleChange}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                )}
                <div className="col-span-2 flex justify-end mt-4">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    sx={{ width: 125 }}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {activeStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="col-span-2 flex items-center gap-4">
                  <label className="text-base">Share It:</label>
                  <RadioGroup
                    row
                    name="shareType"
                    value={formData.shareType}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="specific"
                      control={<Radio size="small" />}
                      label="Specific Vendor"
                    />
                    <FormControlLabel
                      value="empaneled"
                      control={<Radio size="small" />}
                      label="All Empaneled Vendors"
                    />
                    <FormControlLabel
                      value="global"
                      control={<Radio size="small" />}
                      label="Global Vendor"
                    />
                  </RadioGroup>
                </div>

                <TextField
                  label="Select Vendor"
                  name="vendor"
                  value={formData.vendor}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Number of Positions"
                  name="positions"
                  value={formData.positions}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Contract Period"
                  name="contractPeriod"
                  value={formData.contractPeriod}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Remark for Vendor"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={6}
                  className="col-span-2"
                  size="small"
                />
                <div className="col-span-2 flex justify-between mt-4">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleBack}
                    sx={{ width: 125 }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ width: 125 }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default RequirementForm;
