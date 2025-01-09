import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  TextField,
  Typography,
  Popover,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Grid2,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { InfoOutlined } from "@mui/icons-material";

type ChildProps = {};
const CompanyInfo = forwardRef((props: ChildProps, ref: any) => {
  const navigate = useNavigate();

  const company = localStorage.companyName;
  const [companyType, setCompanyType] = useState("Vendor");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      localStorage.setItem("companyType", companyType);
      handleSubmit(onSubmit)();
    },
  }));

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };

  useEffect(() => {
    setValue("companyName", company);
  }, []);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // useImperativeHandle(ref, () => ({
  //   handleSignup() {
  //     // Save user details to localStorage
  //     localStorage.setItem("companyName", companyName);
  //     localStorage.setItem("companyStrength", companyStrength);
  //     localStorage.setItem("companyPortfolio", companyPortfolio);
  //     localStorage.setItem("contactMail", contactMail);
  //     localStorage.setItem("companyWebsite", companyWebsite);
  //     localStorage.setItem("mobileNumber", mobileNumber);
  //     localStorage.setItem("location", JSON.stringify(location));
  //     localStorage.setItem("tierLevel", tierLevel);
  //     localStorage.setItem("isLoggedIn", "true");
  //   },
  // }));

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-3/5 m-auto p-6 bg-white rounded-lg space-y-4 h-auto"
      >
        {/* Registration Type - MUI Select */}

        <div className="flex items-center space-x-6">
          <div>
            <p className="text-base">
              Select your registration type
              <IconButton
                size="small"
                onClick={(event) => handlePopoverOpen(event)}
                aria-label={`registration details`}
              >
                <InfoOutlined fontSize="inherit" />
              </IconButton>
            </p>
          </div>
          <div>
            <Controller
              name="registrationType"
              control={control}
              defaultValue=""
              rules={{ required: "Registration Type is required" }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  size="small"
                  error={!!errors.registrationType}
                >
                  <RadioGroup
                    {...field}
                    aria-labelledby="registration-type-label"
                    row // Add this prop to align the radios horizontally
                  >
                    <FormControlLabel
                      value="vendor"
                      control={<Radio size="small" />}
                      label="Vendor"
                      defaultChecked={true}
                      onClick={(e: any) => setCompanyType(e.target.value)}
                    />
                    <FormControlLabel
                      value="client"
                      control={<Radio size="small" />}
                      label="Client"
                      onClick={(e: any) => setCompanyType(e.target.value)}
                    />
                    <FormControlLabel
                      value="both"
                      control={<Radio size="small" />}
                      label="Both"
                      onClick={(e: any) => setCompanyType(e.target.value)}
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
        </div>

        {/* Company Name Field */}
        <Controller
          name="companyName"
          control={control}
          defaultValue=""
          rules={{ required: "Company Name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Company Name"
              fullWidth
              variant="outlined"
              size="small"
              error={!!errors.companyName}
            />
          )}
        />

        {/* Company Portfolio Field */}
        <Controller
          name="companyPortfolio"
          control={control}
          defaultValue=""
          rules={{ required: "Company Portfolio is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Company Portfolio"
              multiline
              rows={8}
              fullWidth
              variant="outlined"
              placeholder="Brief description of your company portfolio"
              size="small"
              error={!!errors.companyPortfolio}
            />
          )}
        />

        <Grid2 container spacing={2}>
          {/* Contact Mail ID */}
          <Grid2 size={6}>
            <Controller
              name="contactMail"
              control={control}
              defaultValue=""
              rules={{ required: "Contact Mail ID is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contact Mail ID"
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your contact email"
                  size="small"
                  error={!!errors.contactMail}
                />
              )}
            />
          </Grid2>

          {/* Mobile Number */}
          <Grid2 size={6}>
            <Controller
              name="mobileNumber"
              control={control}
              defaultValue=""
              rules={{ required: "Mobile Number is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mobile Number"
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your contact number"
                  size="small"
                  error={!!errors.mobileNumber}
                />
              )}
            />
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2}>
          {/* Company Website */}
          <Grid2 size={6}>
            <Controller
              name="companyWebsite"
              control={control}
              defaultValue=""
              rules={{ required: "Company Website is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Company Website"
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your website URL"
                  size="small"
                  error={!!errors.companyWebsite}
                />
              )}
            />
          </Grid2>

          {/* Company Strength */}
          <Grid2 size={6}>
            <Controller
              name="companyStrength"
              control={control}
              defaultValue=""
              rules={{ required: "Company Strength is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Company Strength"
                  type="number"
                  fullWidth
                  variant="outlined"
                  placeholder="Number of Employees"
                  size="small"
                  error={!!errors.companyStrength}
                />
              )}
            />
          </Grid2>
        </Grid2>

        {/* Error Message */}
        {errors && (
          <Typography color="error" variant="body2">
            {Object.values(errors).map((err: any) => (
              <div key={err.message}>{err.message}</div>
            ))}
          </Typography>
        )}
      </form>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className="p-3">
          <p className="text-base mb-1">Vendor</p>
          <p className="text-info">
            "Register as a vendor to find job opportunities and connect with
            clients."
          </p>
          <p className="text-base my-1">Client</p>
          <p className="text-info">
            "Register as a client to post job requirements and manage vendors."
          </p>
          <p className="text-base my-1">Both</p>
          <p className="text-info">
            "Register as both a vendor and a client to access all features."
          </p>
        </div>
      </Popover>
    </>
  );
});

export default CompanyInfo;
