import {
  changePassword,
  getUserDetailsByEmail,
  updateUserDetails,
  updateUserEmail,
} from "../../../components/sharedService/apiService";
import {
  Avatar,
  Button,
  IconButton,
  MenuItem,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import { AppDispatch } from "../../../components/redux/store";
import { useDispatch } from "react-redux";
import {
  closeBackdrop,
  openBackdrop,
} from "../../../components/features/drawerSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SuccessDialog from "../../sharedComponents/SuccessDialog";
import FileUploadBox from "../../sharedComponents/FileUploadBox";
import UploadLogo from "../../sharedComponents/UploadLogo";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Notifications } from "./Notifications";

export default function UserDetails() {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const location = useLocation();
  const navigate = useNavigate();
  const pathSegments = location.pathname.split("/");
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");
  const [tabValue, setTabValue] = React.useState(!type ? "profile" : type);

  const dispatch: AppDispatch = useDispatch();
  const [formData, setFormData] = useState<any>();
  const [isSuccessPopup, setIsSuccessPopup] = useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword1, setShowPassword1] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    if (tabValue === "profile") {
      getUserDetails();
    }
    navigate(`?type=${tabValue}`);
  }, [tabValue]);

  useEffect(() => {
    setTabValue(!type ? "profile" : type);
  }, [type]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      dob: "01-01-2000",
      profileAvatar: [
        {
          fileName: "",
          fileData: "",
        },
      ],
    },
  });

  const {
    control: control1,
    handleSubmit: handleSubmit1,
    formState: { errors: error1 },
    reset: reset1,
  } = useForm({
    defaultValues: { oldEmail: userData?.email, newEmail: "" },
    mode: "onChange",
  });

  const {
    control: control2,
    handleSubmit: handleSubmit2,
    setError: setError1,
    formState: { errors: error2 },
    reset: reset2,
  } = useForm({
    defaultValues: { email: "", oldPassword: "", newPassword: "" },
    mode: "onChange",
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
          profileAvatar: [
            {
              fileName: "",
              fileData: result.content?.profileAvatar,
            },
          ],
        });

        userData.firstName = result.content?.firstName;
        userData.lastName = result.content?.lastName;
        userData.phone = result.content?.phone;
        userData.gender = result.content?.gender;
        userData.profileAvatar = result.content?.profileAvatar;
        userData.dob = moment(result.content?.dob).format("YYYY-MM-DD");
        localStorage.setItem("userData", JSON.stringify(userData));
        reset1({ oldEmail: result.content?.userName });
        reset2({ email: result.content?.userName });
      }
    });
  };

  const onSubmit = (data: any) => {
    dispatch(openBackdrop());
    updateUserDetails(data)
      .then((result: any) => {
        if (result.success) {
          getUserDetails();
        }
        setTimeout(() => {
          dispatch(closeBackdrop());
        }, 1000);
      })
      .catch((error: any) => {
        setTimeout(() => {
          dispatch(closeBackdrop());
        }, 1000);
      });
  };

  const onSubmit1 = (data: any) => {
    dispatch(openBackdrop());
    updateUserEmail(data?.oldEmail, data?.newEmail)
      .then((result: any) => {
        if (result.success) {
          userData.email = data.newEmail;
          localStorage.setItem("userData", JSON.stringify(userData));
        }
        setTimeout(() => {
          getUserDetails();
          dispatch(closeBackdrop());
        }, 2000);
      })
      .catch((error: any) => {
        setTimeout(() => {
          dispatch(closeBackdrop());
        }, 1000);
      });
  };
  const onSubmit2 = (data: any) => {
    if (data.newPassword === data.oldPassword) {
      setError1("newPassword", {
        type: "manual",
        message: "Use Different Password",
      });
    } else {
      dispatch(openBackdrop());
      changePassword(data)
        .then((result: any) => {
          if (result.success) {
            reset2();
            setTimeout(() => {
              setIsSuccessPopup(true);
            }, 1000);
          } else {
            setError1("newPassword", {
              type: "manual",
              message: "Incorrect Password",
            });
          }
          setTimeout(() => {
            dispatch(closeBackdrop());
          }, 1000);
        })
        .catch((error: any) => {
          setTimeout(() => {
            dispatch(closeBackdrop());
          }, 1000);
        });
    }
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
        <Tab value="profile" label="Personal Information" />
        <Tab value="notifications" label="Notifications" />
      </Tabs>

      {tabValue === "profile" && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-3">
          {/* <h2 className="text-title my-3">Personal Information</h2> */}
          <div className="p-4 border rounded-md">
            {/* Profile Photo Section */}
            <div className="flex items-start gap-4 mb-6">
              <div className="relative">
                {/* <Avatar
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
                /> */}
                {/* <FileUploadBox
                  title="Upload Logo"
                  fileSize="128 x 128"
                  iconType="image"
                  onUpload={(file: any) => setValue("profileAvatar", file)}
                  file={watch("profileAvatar")}
                /> */}
                <UploadLogo
                  title="Upload Profile"
                  fileSize="128 x 128"
                  iconType="image"
                  onUpload={(file: any) => setValue("profileAvatar", file)}
                  file={watch("profileAvatar")}
                />
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Controller
                  name="firstName"
                  control={control}
                  rules={{
                    required: "First name is required",
                    validate: (value) =>
                      !/\s{2,}/.test(value) ||
                      "Multiple spaces are not allowed",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="First Name"
                      fullWidth
                      size="small"
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/\s{2,}/g, " "); // remove multiple spaces
                        value = value.trimStart(); // avoid leading space while typing
                        field.onChange(value);
                      }}
                      onBlur={(e) => {
                        const value = e.target.value.trim(); // trim on blur
                        field.onChange(value);
                      }}
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  )}
                />

                <Controller
                  name="lastName"
                  control={control}
                  rules={{
                    validate: (value) =>
                      !/\s{2,}/.test(value) ||
                      "Multiple spaces are not allowed",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Last Name"
                      fullWidth
                      size="small"
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/\s{2,}/g, " "); // remove multiple spaces
                        value = value.trimStart(); // avoid leading space
                        field.onChange(value);
                      }}
                      onBlur={(e) => {
                        const value = e.target.value.trim(); // trim leading & trailing spaces
                        field.onChange(value);
                      }}
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
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
            {/* <div className="p-4 space-y-2  border rounded-md">
              <p className="text-base">Update E-mail</p>
              <form onSubmit={handleSubmit1(onSubmit1)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Controller
                      name="oldEmail"
                      control={control1}
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
                  </div>
                  <div className="col-span-2">
                    <Controller
                      name="newEmail"
                      control={control1}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="New Email"
                          fullWidth
                          size="small"
                        />
                      )}
                    />
                  </div>
                  <div className="flex justify-end col-span-2">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ width: 125 }}
                    >
                      Update email
                    </Button>
                  </div>
                </div>
              </form>
            </div> */}
            <div className="p-4 space-y-2  border rounded-md">
              <p className="text-base">Change Password</p>
              <form onSubmit={handleSubmit2(onSubmit2)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Controller
                      name="oldPassword"
                      control={control2}
                      rules={{ required: "required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Old Password"
                          fullWidth
                          size="small"
                          type={showPassword ? "text" : "password"}
                          error={!!error2.oldPassword}
                          slotProps={{
                            input: {
                              endAdornment: (
                                <IconButton
                                  type="button"
                                  aria-label="search"
                                  size="small"
                                  onClick={() =>
                                    setShowPassword((prev) => !prev)
                                  }
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              ),
                              sx: { pr: 0.5 },
                            },
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="col-span-2">
                    <Controller
                      name="newPassword"
                      control={control2}
                      rules={{ required: "Required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="New Password"
                          fullWidth
                          type={showPassword1 ? "text" : "password"}
                          size="small"
                          error={!!error2.newPassword}
                          helperText={error2.newPassword?.message}
                          slotProps={{
                            input: {
                              endAdornment: (
                                <IconButton
                                  type="button"
                                  aria-label="search"
                                  size="small"
                                  onClick={() =>
                                    setShowPassword1((prev) => !prev)
                                  }
                                >
                                  {showPassword1 ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              ),
                              sx: { pr: 0.5 },
                            },
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="flex justify-end col-span-2">
                    <Button type="submit" variant="contained" color="primary">
                      Change Password
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {tabValue === "notifications" && <Notifications />}
      {isSuccessPopup && (
        <SuccessDialog
          title="Password changed successfully"
          isOpenModal={isSuccessPopup}
          setIsOpenModal={setIsSuccessPopup}
        />
      )}
    </div>
  );
}
