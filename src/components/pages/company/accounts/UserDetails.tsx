import { Avatar, Button, MenuItem, Tab, Tabs, TextField } from "@mui/material";
import React, { useState } from "react";

export default function UserDetails() {
  const [tabValue, setTabValue] = React.useState("Profile");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const [formData, setFormData] = useState({
    firstName: "Somya",
    lastName: "Srivastava",
    email: "somya@opstree.com",
    phone: "9087654321",
    gender: "female",
    dob: "01-01-2000",
    profilePhoto: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = () => {
    console.log("Form Submitted", formData);
  };

  return (
    <div className="px-6">
      {/* Header */}

      <Tabs
        value={tabValue}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab value="Profile" label="Personal Information" />
        <Tab value="Notifications" label="Notifications" />
      </Tabs>

      {tabValue === "Profile" && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-3">
          {/* <h2 className="text-title my-3">Personal Information</h2> */}
          <div className="p-4 border rounded-md">
            {/* Profile Photo Section */}
            <div className="flex items-start gap-4 mb-6">
              <div className="relative">
                <Avatar
                  src={
                    !formData.profilePhoto
                      ? "/assets/images/Avatar.png"
                      : "/assets/images/Avatar.png"
                  }
                  alt="Profile Photo"
                  sizes="large"
                  sx={{ width: 56, height: 56 }}
                />
                <input
                  type="file"
                  accept="image/*"
                  name="profilePhoto"
                  onChange={handleInputChange}
                  className="absolute bottom-0 left-0 cursor-pointer opacity-0 w-full h-full"
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                fullWidth
                size="small"
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                fullWidth
                size="small"
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                size="small"
                disabled
              />
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                fullWidth
                size="small"
              />
              <TextField
                select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                fullWidth
                size="small"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
              <TextField
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true, // Ensure the label doesn't overlap the value
                }}
                fullWidth
                size="small"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
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

          <div className="space-y-2">
            <div className="p-4 space-y-2  border rounded-md">
              <p className="text-base">Update E-mail</p>
              {/* Form Fields */}
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                size="small"
                disabled
              />
              <TextField
                label="Enter new Email"
                name="email"
                value={""}
                onChange={handleInputChange}
                fullWidth
                size="small"
              />

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  sx={{ width: 125 }}
                >
                  Update email
                </Button>
              </div>
            </div>
            <div className="p-4 space-y-2  border rounded-md">
              <p className="text-base">Change Password</p>
              <TextField
                label="Old password"
                name="oldPass"
                value={""}
                onChange={handleInputChange}
                fullWidth
                size="small"
              />
              <TextField
                label="New password"
                name="newPass"
                value={""}
                onChange={handleInputChange}
                fullWidth
                size="small"
              />

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Change password
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
