import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import {
  Box,
  Drawer,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@mui/system/styled";
import FileUploadBox from "../../../common/FileUploadBox";

const steps = [
  { label: "Select Post Type", description: "" },
  { label: "Fill Post Details", description: "" },
  { label: "Share Preferences", description: "" },
];

const CreateClientForm = () => {
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

  const FileInput = styled("input")({
    display: "none",
  });

  const [formData, setFormData] = useState({
    name: "",
    about: "",
    mobile: "",
    email: "",
    website: "",
    address: "",
    logo: null as File | null,
    logoPreview: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    mobile: false,
    email: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        logo: file,
        logoPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: formData.name === "",
      mobile: formData.mobile === "",
      email: formData.email === "",
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).includes(true)) {
      console.log("Form Submitted Successfully", formData);
    } else {
      console.log("Please fill all required fields.");
    }
  };

  return (
    <div className="">
      <Button
        variant="contained"
        onClick={toggleDrawer(true)}
        startIcon={<Add />}
      >
        Add new client
      </Button>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div style={{ width: "calc(100vw - 250px)" }}>
          <div className="p-4 border-b">
            <h2 className="text-xl">Add new client</h2>
          </div>
          <div className="p-4 w-[50%] mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-4">
                <div className="space-y-4">
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    helperText={errors.name && "Name is required"}
                    required
                    size="small"
                  />

                  {/* About Client */}
                  <TextareaAutosize
                    minRows={3}
                    placeholder="About Client"
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                    {/* Mobile */}
                    <TextField
                      label="Contact Mobile"
                      variant="outlined"
                      fullWidth
                      name="mobile"
                      size="small"
                      value={formData.mobile}
                      onChange={handleChange}
                      error={errors.mobile}
                      helperText={errors.mobile && "Mobile number is required"}
                      required
                    />

                    {/* Email */}
                    <TextField
                      label="Contact Email"
                      variant="outlined"
                      fullWidth
                      type="email"
                      name="email"
                      size="small"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      helperText={errors.email && "Email is required"}
                      required
                    />
                  </div>
                  <TextField
                    minRows={2}
                    placeholder="Address"
                    name="address"
                    size="small"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                    {/* Website */}
                    <TextField
                      label="Website URL"
                      variant="outlined"
                      fullWidth
                      size="small"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Logo Upload */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                    <FileUploadBox title="upload logo" fileSize="500 x 500" />
                    <FileUploadBox
                      title="upload favicon"
                      fileSize="200 x 200"
                    />
                  </div>
                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default CreateClientForm;
