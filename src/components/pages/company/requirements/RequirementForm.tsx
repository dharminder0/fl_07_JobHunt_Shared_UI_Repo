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
import { Divider, Drawer } from "@mui/material";

const RequirementForm = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [postType, setPostType] = useState("single");
  const [formValues, setFormValues] = useState({
    title: "",
    jobDescription: "",
    type: "",
    budget: "",
    shareIt: "specificVendor",
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handlePostTypeChange = (event) => {
    setPostType(event.target.value);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted", formValues);
  };

  return (
    <div className="p-4">
      <Button
        variant="contained"
        onClick={toggleDrawer(true)}
        startIcon={<Add />}
      >
        Post requirements
      </Button>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div style={{ width: "calc(100vw - 250px)" }}>
          
          <div className="p-4 border-b">
            <h2 className="text-xl">Post Requirements</h2>
          </div>

          <div className="p-6">
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

            {postType === "single" ? (
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
                      value="allEmploymentVendors"
                      control={<Radio />}
                      label="All Employment Vendors"
                    />
                    <FormControlLabel
                      value="globalVendor"
                      control={<Radio />}
                      label="Global Vendor"
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Submit
                </Button>
              </form>
            ) : (
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
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default RequirementForm;
