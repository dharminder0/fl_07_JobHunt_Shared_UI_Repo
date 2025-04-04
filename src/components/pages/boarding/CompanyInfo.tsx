import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  TextField,
  Typography,
  Popover,
  FormControl,
  IconButton,
  Grid2,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { InfoOutlined } from "@mui/icons-material";
import { RoleType } from "../../sharedService/enums";
import { upsertCompanyInfo } from "../../../components/sharedService/apiService";
import { AppDispatch } from "../../../components/redux/store";
import { useDispatch } from "react-redux";
import {
  closeBackdrop,
  openBackdrop,
} from "../../../components/features/drawerSlice";

type ChildProps = {};
const CompanyInfo = forwardRef((props: ChildProps, ref: any) => {
  const userData = JSON.parse(localStorage.userData);
  const company = localStorage.companyName;
  const [companyType, setCompanyType] = useState(RoleType.Vendor);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const dispatch: AppDispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      setValue("userId", userData.userId);
      localStorage.setItem("companyType", companyType);
      handleSubmit(onSubmit)();
    },
  }));

  const onSubmit = (data: any) => {
    // dispatch(openBackdrop());
    data.registrationType =
      data?.registrationType === "3" ? ["1", "2"] : [data?.registrationType];

    userData.role =
      data?.registrationType === "3" ? ["1", "2"] : [data?.registrationType];
    debugger;
    // upsertCompanyInfo(data)
    //   .then((result: any) => {
    //     console.log("Form result:", result);
    //     localStorage.setItem("userData", JSON.stringify(userData));
    //     if (result?.success) {
    //       setTimeout(() => {
    //         dispatch(closeBackdrop());
    //       }, 1000);
    //     }
    //   })
    //   .catch((error: any) => {
    //     setTimeout(() => {
    //       dispatch(closeBackdrop());
    //     }, 1000);
    //   });
  };

  useEffect(() => {
    setValue("orgName", userData?.companyName);
  }, []);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
                      value={RoleType?.Vendor}
                      control={<Radio size="small" />}
                      label="Vendor"
                      defaultChecked={true}
                      onClick={(e: any) => setCompanyType(e.target.value)}
                    />
                    <FormControlLabel
                      value={RoleType?.Client}
                      control={<Radio size="small" />}
                      label="Client"
                      onClick={(e: any) => setCompanyType(e.target.value)}
                    />
                    <FormControlLabel
                      value={RoleType?.Both}
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
          name="orgName"
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
              defaultValue={userData?.orgName}
              error={!!errors.orgName}
            />
          )}
        />

        {/* Company Portfolio Field */}
        <Controller
          name="portfolio"
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
              error={!!errors.portfolio}
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
              name="phone"
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
                  error={!!errors.phone}
                />
              )}
            />
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2}>
          {/* Company Website */}
          <Grid2 size={6}>
            <Controller
              name="website"
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
                  error={!!errors.website}
                />
              )}
            />
          </Grid2>

          {/* Company Strength */}
          <Grid2 size={6}>
            <Controller
              name="strength"
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
                  error={!!errors.strength}
                />
              )}
            />
          </Grid2>
        </Grid2>
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
