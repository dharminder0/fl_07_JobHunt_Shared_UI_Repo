import {
  getUserDetailsByEmail,
  updateUserDetails,
} from "../../../components/sharedService/apiService";
import { Avatar, Button, MenuItem, Tab, Tabs, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import { AppDispatch } from "../../../components/redux/store";
import { useDispatch } from "react-redux";
import {
  closeBackdrop,
  openBackdrop,
} from "../../../components/features/drawerSlice";

export default function UserDetails() {
  const [tabValue, setTabValue] = React.useState("Profile");
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const dispatch: AppDispatch = useDispatch();
  const [formData, setFormData] = useState<any>();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      dob: "01-01-2000",
    },
  });

  const getUserDetails = () => {
    getUserDetailsByEmail(userData.email).then((result: any) => {
      if (result) {
        setFormData(result.content);
        reset({
          firstName: result.content?.firstName,
          lastName: result.content?.lastName,
          email: result.content?.userName,
          phone: result.content?.phone,
          gender: result.content?.gender,
          dob: moment(result.content?.dob).format("YYYY-MM-DD"),
        });
      }
    });
  };

  const onSubmit = (data: any) => {
    console.log("Form Submitted", data);

    dispatch(openBackdrop());
    updateUserDetails(data)
      .then((result: any) => {
        if (result.sucess) {
          getUserDetails();
        }
        setTimeout(() => {
          dispatch(closeBackdrop());
        }, 1000);
      })
      .catch((error: any) => {
        console.log(error);
        setTimeout(() => {
          dispatch(closeBackdrop());
        }, 1000);
      });
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
                  src={!formData?.profileAvatar ? "" : formData?.profileAvatar}
                  alt="Profile Photo"
                  sizes="large"
                  sx={{ width: 56, height: 56 }}
                />
                <input
                  type="file"
                  accept="image/*"
                  name="profilePhoto"
                  // onChange={handleInputChange}
                  className="absolute bottom-0 left-0 cursor-pointer opacity-0 w-full h-full"
                />
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="First Name"
                      fullWidth
                      size="small"
                    />
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Last Name"
                      fullWidth
                      size="small"
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      fullWidth
                      size="small"
                      disabled
                    />
                  )}
                />
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone"
                      fullWidth
                      size="small"
                    />
                  )}
                />
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Gender"
                      fullWidth
                      size="small"
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </TextField>
                  )}
                />
                <Controller
                  name="dob"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Date of Birth"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      size="small"
                    />
                  )}
                />
                <div className="flex justify-end col-span-2">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ width: 125 }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </div>

          <div className="space-y-2">
            <div className="p-4 space-y-2  border rounded-md">
              <p className="text-base">Update E-mail</p>
              {/* Form Fields */}
              {/* <TextField
                label="Email"
                name="email"
                value={formData?.userName}
                // onChange={handleInputChange}
                fullWidth
                size="small"
                disabled
              /> */}
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    size="small"
                    disabled
                  />
                )}
              />
              <TextField
                label="Enter new Email"
                name="email"
                value={""}
                // onChange={handleInputChange}
                fullWidth
                size="small"
              />

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleSubmit}
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
                // onChange={handleInputChange}
                fullWidth
                size="small"
              />
              <TextField
                label="New password"
                name="newPass"
                value={""}
                // onChange={handleInputChange}
                fullWidth
                size="small"
              />

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleSubmit}
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
