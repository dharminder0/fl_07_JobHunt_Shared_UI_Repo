import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import CompanyInfo from "./CompanyInfo";
import CompanyService from "./CompanyService";
import CompanyTechnologiesForm from "./CompanyTechnologiesForm";
import { useNavigate } from "react-router-dom";

const steps = [
  "Company Information",
  "Company Services and Resources",
  "Technical Expertise",
];

export default function OnBoarding() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const companyName = localStorage.companyName;

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep !== steps.length) {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    } else {
      localStorage.setItem("role", JSON.stringify(["company"]));
      navigate("/company/dashboard");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="bg-white h-screen flex flex-col">
      {/* Header */}
      <div className="h-[52px] px-5 py-2 shadow-[0px_-1px_0px_0px_#D6DDEB_inset] flex justify-between">
        <div className="flex gap-3">
          <div className="icon my-auto">
            <img className="rounded-full h-8" src='https://opstree.com/wp-content/uploads/2024/10/FavIcon-OpsTree-100x100.png' alt="JobHunty Logo" />
          </div>
          <div  className="cursor-pointer flex flex-row gap-2"
            id="basic-button"
          >
            <div className="font-semibold text-title my-auto">
              {companyName}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-grow overflow-auto">
        <div className="container mx-auto py-8">
          <div className="w-full">
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: { optional?: React.ReactNode } = {};
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            <div className="flex justify-center items-center mt-9">
              {activeStep === 0 && <CompanyInfo />}
              {activeStep === 1 && <CompanyService />}
              {activeStep === 2 && <CompanyTechnologiesForm />}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t flex-shrink-0">
        <div className="flex justify-between">
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
          <div className="flex-grow" />
          {/* {isStepOptional(activeStep) && (
        <Button variant="contained" color="inherit" onClick={handleSkip} className="mr-2">
          Skip
        </Button>
      )} */}
          <Button variant="contained" color="primary" onClick={handleNext} sx={{ width: 125 }}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}

