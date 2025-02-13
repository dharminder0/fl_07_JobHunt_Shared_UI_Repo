import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import CompanyInfo from "./CompanyInfo";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import PlanSelection from "./PlanSelection";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/components/redux/store";
import { RoleType } from "../../sharedService/enums";
import {
  Avatar,
  FormControl,
  FormControlLabel,
  Grid2,
  IconButton,
  Popover,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { CorporateFareOutlined, InfoOutlined } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { upsertCompanyInfo } from "../../../components/sharedService/apiService";
import {
  closeBackdrop,
  openBackdrop,
} from "../../../components/features/drawerSlice";
import { RoleData } from "../../../components/sharedService/shareData";

const steps = ["Company Information", "Subscription Plans"];

export default function OnBoarding() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const userData = JSON.parse(localStorage.userData);
  const dispatch: AppDispatch = useDispatch();
  const isBackdropOpen = useSelector(
    (state: RootState) => state.drawer.isBackdropOpen
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [companyType, setCompanyType] = React.useState("");

  const defaultVal: any = {
    registrationType: ["1"], // Default empty or predefined value
    orgName: userData.companyName,
    portfolio: "",
    contactMail: "",
    phone: "",
    website: "",
    strength: null, // Default number
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: defaultVal,
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    dispatch(openBackdrop());
    data.userId = userData.userId;
    userData.role =
      data?.registrationType === "3" ? `"1", "2"` : data?.registrationType;

    upsertCompanyInfo(data)
      .then((result: any) => {
        console.log("Form result:", result);
        localStorage.setItem("userData", JSON.stringify(userData));
        if (result?.success) {
          setTimeout(() => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            dispatch(closeBackdrop());
          }, 1000);
        }
      })
      .catch((error: any) => {
        setTimeout(() => {
          dispatch(closeBackdrop());
        }, 1000);
      });
  };

  const handleNext = async () => {
    if (!isBackdropOpen) {
      if (activeStep !== steps.length - 1) {
        if (activeStep === 0) {
          handleSubmit(onSubmit)(); // If valid, submit the form
        }
      } else {
        // Save role type to localStorage and navigate
        localStorage.setItem(
          "role",
          JSON.stringify(
            companyType === RoleType.Client
              ? ["company"]
              : companyType === RoleType.Vendor
                ? ["vendor"]
                : companyType === RoleType.Both
                  ? ["company", "vendor"]
                  : []
          )
        );
        localStorage.setItem(
          "activeRole",
          companyType === RoleType.Client
            ? "company"
            : companyType === RoleType.Vendor
              ? "vendor"
              : "company"
        );
        navigate(
          `/${
            companyType === RoleType.Client
              ? "company"
              : companyType === RoleType.Vendor
                ? "vendor"
                : "company"
          }`
        );
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const handleCompanyTypeChange = (value: any) => {
    setCompanyType(value);
    setValue("registrationType", value === "3" ? ["1", "2"] : [value]);
  };

  return (
    <div className="bg-white h-screen flex flex-col">
      {/* Header */}
      <div className="h-[52px] px-5 py-2 flex justify-between">
        <div className="flex gap-3">
          <div className="icon my-auto">
            <Avatar
              alt="Org Icon"
              src={undefined}
              className="rounded-full !h-8 !w-8"
            >
              <CorporateFareOutlined fontSize="small" />
            </Avatar>
          </div>
          <div className="cursor-pointer flex flex-row gap-2" id="basic-button">
            <div className="font-semibold text-title my-auto">
              {userData.companyName}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-grow overflow-auto">
        <div className="container mx-auto py-3">
          <div className="w-full">
            <div className="w-3/5 mx-auto">
              <Stepper activeStep={activeStep}>
                {steps.map((label) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: { optional?: React.ReactNode } = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </div>

            <div className="flex justify-center items-center mt-9">
              {/* {activeStep === 0 && <CompanyInfo ref={childRef} />} */}
              {activeStep === 0 && (
                <>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-3/5 m-auto p-6 bg-white rounded-lg space-y-4"
                  >
                    {/* Registration Type - MUI Select */}
                    <div className="flex items-center space-x-6">
                      <p className="text-base">
                        Select your registration type
                        <IconButton
                          size="small"
                          onClick={handlePopoverOpen}
                          aria-label="registration details"
                        >
                          <InfoOutlined fontSize="inherit" />
                        </IconButton>
                      </p>

                      <FormControl
                        size="small"
                        error={!!errors.registrationType}
                      >
                        <RadioGroup
                          row
                          onChange={(e) => {
                            handleCompanyTypeChange(e.target?.value); // Call external handler
                          }}
                          defaultValue={RoleType.Vendor}
                        >
                          {RoleData.map((item: any) => (
                            <FormControlLabel
                              key={item.id}
                              value={item.id}
                              control={<Radio size="small" />}
                              label={item.name}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </div>

                    {/* Company Name */}
                    <Controller
                      name="orgName"
                      control={control}
                      rules={{ required: "Company Name is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Company Name"
                          fullWidth
                          variant="outlined"
                          size="small"
                          error={!!errors.orgName}
                        />
                      )}
                    />

                    {/* Company Portfolio */}
                    <Controller
                      name="portfolio"
                      control={control}
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
                      <Grid2 size={6}>
                        <Controller
                          name="contactMail"
                          control={control}
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
                      <Grid2 size={6}>
                        <Controller
                          name="phone"
                          control={control}
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
                      <Grid2 size={6}>
                        <Controller
                          name="website"
                          control={control}
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
                      <Grid2 size={6}>
                        <Controller
                          name="strength"
                          control={control}
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
                        "Register as a vendor to find job opportunities and
                        connect with clients."
                      </p>
                      <p className="text-base my-1">Client</p>
                      <p className="text-info">
                        "Register as a client to post job requirements and
                        manage vendors."
                      </p>
                      <p className="text-base my-1">Both</p>
                      <p className="text-info">
                        "Register as both a vendor and a client to access all
                        features."
                      </p>
                    </div>
                  </Popover>
                </>
              )}
              {/* {activeStep === 1 && <CompanyService />} */}
              {activeStep === 1 && <PlanSelection />}
              {/* {activeStep === 2 && <CompanyTechnologiesForm />} */}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 flex-shrink-0">
        <div className="flex justify-end space-x-10">
          <Button
            color="inherit"
            variant="outlined"
            disabled={activeStep === 0}
            onClick={handleBack}
            className="mr-2"
            sx={{ width: 125 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{ width: 125 }}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
