import { useState } from "react";
import {
  Stepper,
  Drawer,
  Step,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UpsertBenchDetail } from "../../../../components/sharedService/apiService";
import Loader from "../../../../components/sharedComponents/Loader";
import { AvailabilityStatus } from "../../../../components/sharedService/shareData";

interface AddAIBenchProps {
  handleGetBenchDetail: () => void;
}

const AddAIBench: React.FC<AddAIBenchProps> = ({ handleGetBenchDetail }) => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [cvText, setCvText] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      title: "",
      email: "",
      phone: "",
      linkedin: "",
      cv: "",
      availability: 1,
      orgCode: userData.orgCode,
      userId: userData.userId,
    },
  });

  const onSubmit = (data: any) => {
    setIsLoader(true);
    UpsertBenchDetail(data)
      .then((result: any) => {
        if (result.success) {
          setTimeout(() => {
            reset();
            setIsLoader(false);
            setDrawerOpen(false);
            handleGetBenchDetail();
          }, 1000);
        } else {
          console.log("error", result.message);
          setTimeout(() => {
            setIsLoader(false);
          }, 1000);
        }
      })
      .catch((error: any) => {
        setTimeout(() => {
          setIsLoader(false);
        }, 1000);
      });
  };

  const steps = ["Paste CV", "Preview"];

  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCvText("");
    setCvFile(null);
  };

  // const handleSubmit = () => {
  //   alert(`CV Submitted:\n\n cv`);
  // };

  return (
    <div className="flex flex-col my-auto">
      <Button variant="outlined" onClick={toggleDrawer(true)}>
        <svg
          width="14px"
          height="14px"
          viewBox="0 0 512 512"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          <g
            id="Page-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g
              id="icon"
              fill="#4640DE"
              transform="translate(64.000000, 64.000000)"
            >
              <path
                d="M320,64 L320,320 L64,320 L64,64 L320,64 Z M171.749388,128 L146.817842,128 L99.4840387,256 L121.976629,256 L130.913039,230.977 L187.575039,230.977 L196.319607,256 L220.167172,256 L171.749388,128 Z M260.093778,128 L237.691519,128 L237.691519,256 L260.093778,256 L260.093778,128 Z M159.094727,149.47526 L181.409039,213.333 L137.135039,213.333 L159.094727,149.47526 Z M341.333333,256 L384,256 L384,298.666667 L341.333333,298.666667 L341.333333,256 Z M85.3333333,341.333333 L128,341.333333 L128,384 L85.3333333,384 L85.3333333,341.333333 Z M170.666667,341.333333 L213.333333,341.333333 L213.333333,384 L170.666667,384 L170.666667,341.333333 Z M85.3333333,0 L128,0 L128,42.6666667 L85.3333333,42.6666667 L85.3333333,0 Z M256,341.333333 L298.666667,341.333333 L298.666667,384 L256,384 L256,341.333333 Z M170.666667,0 L213.333333,0 L213.333333,42.6666667 L170.666667,42.6666667 L170.666667,0 Z M256,0 L298.666667,0 L298.666667,42.6666667 L256,42.6666667 L256,0 Z M341.333333,170.666667 L384,170.666667 L384,213.333333 L341.333333,213.333333 L341.333333,170.666667 Z M0,256 L42.6666667,256 L42.6666667,298.666667 L0,298.666667 L0,256 Z M341.333333,85.3333333 L384,85.3333333 L384,128 L341.333333,128 L341.333333,85.3333333 Z M0,170.666667 L42.6666667,170.666667 L42.6666667,213.333333 L0,213.333333 L0,170.666667 Z M0,85.3333333 L42.6666667,85.3333333 L42.6666667,128 L0,128 L0,85.3333333 Z"
                id="Combined-Shape"
              ></path>
            </g>
          </g>
        </svg>
        Add Bench
      </Button>

      <Drawer anchor="right" open={drawerOpen}>
        <div className="w-[calc(100vw-250px)] h-full">
          <div className="d-flex content-header">
            <svg
              className="absolute cursor-pointer left-[8px] top-[11px]"
              onClick={(event) => toggleDrawer(false)(event)}
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20 20L4 4.00003M20 4L4.00002 20"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <div className="px-8 py-2 border-b">
              <h2 className="text-heading">Add Bench</h2>
            </div>
          </div>

          {/* <div className="p-4 w-full mx-auto h-[calc(100%-108px)] overflow-auto">
            <Box className="w-full h-full">
             
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  return (
                    <Step key={label}>
                      <StepLabel
                        sx={{
                          "& .MuiStepLabel-label": { fontSize: "14px" },
                          "& .MuiStepIcon-root": {
                            height: "18px",
                            width: "18px",
                          },
                        }}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>

            
              <div className="mt-4">
                {activeStep === 0 && (
                  <div className="flex flex-col space-y-4">
                    <TextField
                      multiline
                      rows={16}
                      minRows={10}
                      variant="outlined"
                      label="CV Data"
                      value={cvText}
                      onChange={(e) => setCvText(e.target.value)}
                      className="w-full"
                    />
                  </div>
                )}

                {activeStep === 1 && <BenchPreview />}
              </div>
            </Box>
          </div> 
          <div
            className={`flex space-x-2 border-t px-4 py-2 ${
              activeStep === 0 ? "justify-end" : "justify-between"
            }`}
          >
            {activeStep === 1 && (
              <>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  className="text-blue-500 border-blue-500 hover:bg-blue-50"
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Submit CV
                </Button>
              </>
            )}
            {activeStep === 0 && (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!cvText}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Preview
              </Button>
            )}
          </div>*/}

          <div className="!overflow-hidden">
            {!isLoader ? (
              <div className="h-[calc(100vh-90px)] !overflow-y-auto">
                <div className="md:w-[95%] lg:w-[95%] xl:w-[70%] p-4 mx-auto">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-x-3">
                      <div className="col-span-2">
                        {/* Title */}
                        <Controller
                          name="title"
                          control={control}
                          rules={{ required: "Title is required" }}
                          render={({ field }) => (
                            <TextField
                              fullWidth
                              margin="normal"
                              label="Title"
                              {...field}
                              error={!!errors.title}
                              helperText={errors.title?.message}
                              size="small"
                            />
                          )}
                        />
                      </div>

                      {/* First Name */}
                      <Controller
                        name="firstName"
                        control={control}
                        rules={{ required: "First name is required" }}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            margin="normal"
                            label="First Name"
                            {...field}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                            size="small"
                          />
                        )}
                      />

                      {/* Last Name */}
                      <Controller
                        name="lastName"
                        control={control}
                        rules={{ required: "Last name is required" }}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            margin="normal"
                            label="Last Name"
                            {...field}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                            size="small"
                          />
                        )}
                      />
                    </div>

                    {/* CV */}
                    <Controller
                      name="cv"
                      control={control}
                      rules={{ required: "CV is required" }}
                      render={({ field }) => (
                        <div className="requirement-quill mt-3">
                          <ReactQuill
                            {...field}
                            theme="snow"
                            value={field.value || ""}
                            onChange={field.onChange}
                            placeholder="Paste CV Data"
                          />
                          {errors.cv && (
                            <p className="text-red-500 text-xs">
                              {errors.cv.message}
                            </p>
                          )}
                        </div>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-x-3">
                      {/* Email */}
                      <Controller
                        name="email"
                        control={control}
                        rules={{
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            {...field}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            size="small"
                          />
                        )}
                      />
                      {/* Phone */}
                      <Controller
                        name="phone"
                        control={control}
                        rules={{
                          required: "Phone number is required",
                          maxLength: 13,
                          pattern: {
                            value: /^[0-9]{10,15}$/,
                            message:
                              "Invalid phone number (must be 10-15 digits)",
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            margin="normal"
                            label="Phone"
                            {...field}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                            size="small"
                          />
                        )}
                      />
                      {/* LinkedIn */}
                      <Controller
                        name="linkedin"
                        control={control}
                        rules={{
                          required: "LinkedIn is required",
                        }}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            margin="normal"
                            label="LinkedIn Profile"
                            {...field}
                            error={!!errors.linkedin}
                            helperText={errors.linkedin?.message}
                            size="small"
                          />
                        )}
                      />
                      {/* Availability */}
                      <Controller
                        name="availability"
                        control={control}
                        rules={{ required: "Availability is required" }}
                        render={({ field }) => (
                          <FormControl
                            fullWidth
                            margin="normal"
                            size="small"
                            error={!!errors.availability}
                          >
                            <InputLabel>Availability</InputLabel>
                            <Select {...field} label="Availability">
                              {AvailabilityStatus.map((option: any) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.availability && (
                              <FormHelperText>
                                {errors.availability.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        )}
                      />
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="h-[calc(100vh-90px)] !overflow-y-auto">
                <Loader />
              </div>
            )}

            <div className="px-4 border-t flex justify-between items-center h-[50px]">
              <Button
                variant="outlined"
                className="!mr-4 !w-[110px]"
                onClick={() => setDrawerOpen(false)}
              >
                Close
              </Button>
              <Button
                variant="contained"
                className="!w-[110px]"
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default AddAIBench;
