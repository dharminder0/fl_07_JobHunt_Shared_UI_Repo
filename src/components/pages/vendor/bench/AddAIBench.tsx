import { useState } from "react";
import {
  Stepper,
  Drawer,
  Step,
  StepLabel,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { fontSize } from "@mui/system";

const AddAIBench = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [cvText, setCvText] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);

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

  const handleSubmit = () => {
    alert(`CV Submitted:\n\n cv`);
  };

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
        Add AI Bench
      </Button>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div style={{ width: "calc(100vw - 250px)" }}>
          <div className="p-4 border-b">
            <h2 className="text-heading">Add AI Bench</h2>
          </div>

          <div className="p-4 w-[75%] mx-auto">
            <Box className="w-full max-w-2xl">
              {/* Stepper */}
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  return (
                    <Step key={label}>
                      <StepLabel
                        sx={{
                          "& .MuiStepLabel-label": { fontSize: "12px" },
                          "& .MuiStepIcon-root": {
                            height: "16px",
                            width: "16px",
                          },
                        }}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>

              {/* Step Content */}
              <Box className="mt-4">
                {activeStep === 0 && (
                  <Box className="flex flex-col space-y-4">
                    {/* <Typography variant="h6">Paste Your CV Data</Typography> */}
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
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={!cvText}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        Preview
                      </Button>
                    </div>
                  </Box>
                )}

                {activeStep === 1 && (
                  <Box className="flex flex-col space-y-4">
                    {/* <Typography variant="h6">Preview Your CV</Typography> */}
                    <Typography
                      variant="body1"
                      className="p-4 border border-gray-300 rounded bg-gray-50"
                    >
                      {cvText || "No CV data pasted yet."}
                    </Typography>
                    <div className="flex justify-between space-x-2">
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
                    </div>
                  </Box>
                )}
              </Box>
            </Box>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default AddAIBench;
