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
    postType: "single",
    title: "",
    jobDescription: "",
    experience: "",
    budget: "",
    remarkforvendor: "",
    jobLocation: "",
    shareIt: "",
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

          <div className="mx-auto w-[90%] my-4">
            <FormControl component="fieldset">
              <FormLabel>Post Type</FormLabel>
              <RadioGroup name="postType" value={formValues.postType} row onChange={handleFormChange}>
                <FormControlLabel value="single" control={<Radio size="small" />} label="Single" />
                <FormControlLabel value="multiple"  control={<Radio size="small" />} label="Multiple" />
              </RadioGroup>
            </FormControl>

            {formValues.postType === 'single' ? (
              <div>
                <form onSubmit={handleSubmit} className="space-y-4">

                <div className="flex gap-4">
                    <div className="w-2/4 flex flex-col gap-2">
                  <TextField
                    label="Title"
                    name="title"
                    fullWidth
                    variant="outlined"
                    value={formValues.title}
                    onChange={handleFormChange}
                    size="small"
                  />

                   <FormControl component="fieldset">
                      <FormLabel className="mt-2">Job Location</FormLabel>
                      <RadioGroup row name="jobLocation" value={formValues.jobLocation} onChange={handleFormChange}>
                        <FormControlLabel value="onsite"  control={<Radio size="small" />} label="Onsite" />
                        <FormControlLabel value="hybrid"  control={<Radio size="small" />} label="Hybrid" />
                        <FormControlLabel value="remote"  control={<Radio size="small" />} label="Remote" />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className="w-2/4">
                  <TextField
                    label="Job Description"
                    name="jobDescription"
                    multiline
                    rows={5}
                    fullWidth
                    variant="outlined"
                    value={formValues.jobDescription}
                    onChange={handleFormChange}
                     size="small"
                  />
                  </div>
                  </div>
                  
                   

                  <div className="flex gap-4">
                    <div className="w-2/4 flex flex-col gap-2">
                      <TextField
                        label="Experience"
                        name="experience"
                        type="string"
                        fullWidth
                        size="small"
                        variant="outlined"
                        value={formValues.experience}
                        onChange={handleFormChange}
                      />

                      <TextField                       
                        label="Budget"
                        name="budget"
                        type="number"
                        fullWidth
                        size="small"
                        variant="outlined"
                        value={formValues.budget}
                        onChange={handleFormChange}
                      />
                    </div>
                   
                   <div className="w-2/4">
                      <TextField
                        label="Remark for vendor"
                        name="remarkforvendor"
                        type="string"
                        multiline
                        rows={4}
                        size="small"
                        fullWidth
                        variant="outlined"
                        value={formValues.remarkforvendor}
                        onChange={handleFormChange}
                      />
                   </div>                   
                  </div>
                  
                </form>

                <div className="mt-2">
                  <FormControl component="fieldset">
                    <FormLabel>Share It</FormLabel>
                    <RadioGroup row
                      name="shareIt"
                      value={formValues.shareIt}
                      onChange={handleFormChange}
                    >
                      <FormControlLabel
                        value="specificVendor"
                        control={<Radio size="small" />}
                        label="Specific Vendor"
                      />
                      <FormControlLabel
                        value="allEmpanelledVendors"
                        control={<Radio size="small" />}
                        label="All Empanelled Vendors"
                      />
                      <FormControlLabel
                        value="globalVendor"
                        control={<Radio size="small" />}
                        label="Global Vendor"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <Button
                  variant="contained"
                  onClick={handleSubmit} // The function is correctly called here without parentheses
                  sx={{ mt: 1, mr: 1 }}
                >Submit</Button>
              </div>
            ) : (
              <form>
                <div>
                  <p className="mt-3">Import Excel or CSV file for multiple posts.</p>
                  <Button
                    variant="contained"
                    component="label"
                    className="bg-blue-500 hover:bg-blue-600 text-white !mt-5" >
                    Upload File
                    <input type="file" accept=".csv, .xlsx" hidden aria-label="Upload Excel or CSV file" />
                  </Button>
                </div>
              </form>

            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default RequirementForm;
