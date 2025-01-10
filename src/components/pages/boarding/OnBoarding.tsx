import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import CompanyInfo from "./CompanyInfo";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import PlanSelection from "./PlanSelection";

const steps = ["Company Information", "Subscription Plans"];

export default function OnBoarding() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const companyName = localStorage.companyName;
  const companyType = localStorage.companyType;
  const childRef = useRef<{ submitForm: () => void }>(null);

  const handleNext = () => {
    if (activeStep !== steps.length - 1) {
      if (activeStep === 0 && childRef.current) {
        childRef.current.submitForm();
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      localStorage.setItem(
        "role",
        JSON.stringify(
          companyType === "client"
            ? ["company"]
            : companyType === "vendor"
            ? ["vendor"]
            : companyType === "both"
            ? ["company", "vendor"]
            : []
        )
      );
      localStorage.setItem(
        "activeRole",
        companyType === "client"
          ? "company"
          : companyType === "vendor"
          ? "vendor"
          : "company"
      );
      navigate(
        `/${
          companyType === "client"
            ? "company"
            : companyType === "vendor"
            ? "vendor"
            : "company"
        }`
      );
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="bg-white h-screen flex flex-col">
      {/* Header */}
      <div className="h-[52px] px-5 py-2 flex justify-between">
        <div className="flex gap-3">
          <div className="icon my-auto">
            <img
              className="rounded-full h-8"
              src="https://opstree.com/wp-content/uploads/2024/10/FavIcon-OpsTree-100x100.png"
              alt="JobHunty Logo"
            />
          </div>
          <div className="cursor-pointer flex flex-row gap-2" id="basic-button">
            <div className="font-semibold text-title my-auto">
              {companyName}
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
              {activeStep === 0 && <CompanyInfo ref={childRef} />}
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
