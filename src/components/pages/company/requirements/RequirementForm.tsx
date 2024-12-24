import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AccountCircle, AccountCircleOutlined, Add } from "@mui/icons-material";
import {
  CircularProgress,
  Drawer,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Tab,
  Tabs,
  Tooltip,
} from "@mui/material";
import MatchingSkillsDialog from "../../../../components/shared/MatchingSkillsDialog";
import Loader from "../../../../components/shared/Loader";

const steps = ["Paste Requirement", "Basic Information", "Vendors"];

const activeData = [
  {
    id: 1,
    name: "Fleek IT Solutions",
    description:
      "Stripe is a software platform for starting and running internet businesses.",
    tags: ["Onsite", "50-100", "QA Testing"],
    place: "Noida",
    contracts: "20",
    logo: "https://fleekitsolutions.com/wp-content/uploads/2023/09/favicon-32x32-1.png",
    candidate: 5,
    avgScore: 70,
  },
  {
    id: 2,
    name: "DevStringX Technologies",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "10-50", "App Tech"],
    place: "Delhi(NCR)",
    contracts: "10",
    logo: "https://www.devstringx.com/wp-content/uploads/2018/03/favicon.ico",
    candidate: 3,
    avgScore: 60,
  },
  {
    id: 3,
    name: "Binemiles Technologies",
    description:
      "Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Onsite", "500+", "Other Tech"],
    place: "Gurgaon",
    contracts: "12",
    logo: "https://binmile.com/wp-content/uploads/2022/07/bmt-favicon.png",
    candidate: 2,
    avgScore: 80,
  },
];

const allVendors = [
  {
    id: 1,
    name: "Cyient Limited",
    description:
      "Stripe is a software platform for starting and running internet businesses with this platform.",
    tags: ["Onsite", "50-100", "QA Testing"],
    place: "Noida",
    logo: "https://www.cyient.com/hubfs/enhancer.png",
    candidate: 5,
    avgScore: 75,
  },
  {
    id: 2,
    name: "3Pillar Global Noida",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "10-50", "App Tech"],
    place: "Delhi(NCR)",
    logo: "https://www.3pillarglobal.com/favicon.png",
    candidate: 3,
    avgScore: 60,
  },
  {
    id: 3,
    name: "Exzeo Software Pvt Ltd",
    description:
      "Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Onsite", "500+", "Other Tech"],
    place: "Gurgaon",
    logo: "https://binmile.com/wp-content/uploads/2022/07/bmt-favicon.png",
    candidate: 2,
    avgScore: 70,
  },
  {
    id: 4,
    name: "Nucleus Software Exports ",
    description:
      "Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Onsite", "0-10", "App Tech"],
    place: "Mumbai",
    logo: "https://sdettech.com/wp-content/themes/sdetech/assets/images/favicon.png",
    candidate: 7,
    avgScore: 65,
  },
  {
    id: 5,
    name: "Ucodice Technologies IT ",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "100-200", "Other Tech"],
    place: "Pune",
    logo: "https://www.ucodice.com/images/new_logo_for_white_background.png",
    candidate: 6,
    avgScore: 55,
  },
];

const RequirementForm = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(true);
  const [tabValue, setTabValue] = React.useState("empaneled");
  const [isMatchOpen, setIsMatchOpen] = React.useState(false);
  const [matchingScore, setMatchingScore] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    postType: "single",
    client: "Airtel",
    title: "Sr. React js developer",
    description:
      "We are looking for a Senior React Frontend Developer who will be responsible for developing the user side of our agent management product and improving the user experience. They will need to collaborate with the design and development teams to create web applications. The candidate must be able to build testable, reusable, and scalable applications. \n\nThe backend is developed in RUST and is accessible via REST APIs.",
    experience: "5 years",
    budget: "1.5",
    jobLocation: "onsite",
    location: "Noida",
    positions: "2",
    contractPeriod: "6 months",
    remarks: "",
    // shareType: "specific",
    file: null, // File upload for multiple post type
  });

  const handleNext = () => {
    setIsLoader(true);
    setActiveStep((prevStep) => prevStep + 1);
    setTimeout(() => {
      setIsLoader(false);
    }, 1500);
  };

  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files }: any = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
  };

  const handleMatchingDialog = (score: number) => {
    setIsMatchOpen(true);
    setMatchingScore(score);
  };

  return (
    <div className="h-screen">
      <Button
        variant="contained"
        onClick={toggleDrawer(true)}
        startIcon={<Add />}
      >
        Post a requirement
      </Button>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className="h-full w-[calc(100vw-250px)]">
          <div className="px-4 py-2 border-b">
            <h2 className="text-heading">Post Requirements</h2>
          </div>

          <div className="w-full overflow-auto h-[calc(100%-90px)]">
            <div className="p-4 md:w-[95%] lg:w-[95%] xl:w-[70%] mx-auto ">
              {/* Stepper */}
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

              {/* Step 1 */}
              {activeStep === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {/* Conditional Rendering */}

                  <div className="col-span-2">
                    <p className="text-info mb-1">
                      Paste the raw requirement text in the box below. Our AI
                      will format and structure it to match the required format,
                      making it easier to manage and process.
                    </p>
                    <TextField
                      label="Paste Requirements"
                      name="requirements"
                      // value={formData.requirements}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={25}
                      size="small"
                    />
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {activeStep === 1 &&
                (!isLoader ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {/* Conditional Rendering */}
                    {formData.postType === "single" ? (
                      <>
                        <div className="col-span-2">
                          <TextField
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                          />
                        </div>

                        <TextField
                          label="Job Description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          fullWidth
                          multiline
                          rows={10}
                          className="col-span-2"
                          size="small"
                        />

                        <TextField
                          label="Experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                        />
                        <TextField
                          label="Budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                        />

                        <TextField
                          label="Number of Positions"
                          name="positions"
                          value={formData.positions}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                        />
                        <TextField
                          label="Contract Period"
                          name="contractPeriod"
                          value={formData.contractPeriod}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                        />
                        <div className="flex items-center">
                          <label className="text-base me-3">
                            Job Location:
                          </label>
                          <RadioGroup
                            row
                            name="jobLocation"
                            value={formData.jobLocation}
                            onChange={handleChange}
                          >
                            <FormControlLabel
                              value="onsite"
                              control={<Radio size="small" />}
                              label="Onsite"
                            />
                            <FormControlLabel
                              value="hybrid"
                              control={<Radio size="small" />}
                              label="Hybrid"
                            />
                            <FormControlLabel
                              value="remote"
                              control={<Radio size="small" />}
                              label="Remote"
                            />
                          </RadioGroup>
                        </div>

                        {formData.jobLocation === "onsite" && (
                          <TextField
                            label="Enter Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                          />
                        )}

                        <div>
                          <TextField
                            label="Select Client"
                            name="client"
                            value={formData.client}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                          />
                          <label className="text-info">
                            Client information will not be shared with Vendors
                          </label>
                        </div>
                        <TextField
                          label="Remark for Vendor"
                          name="remarks"
                          value={formData.remarks}
                          onChange={handleChange}
                          fullWidth
                          multiline
                          rows={6}
                          className="col-span-2"
                          size="small"
                        />
                      </>
                    ) : (
                      <div className="col-span-2">
                        <label className="block text-title mb-2">
                          Upload File
                        </label>
                        <TextField
                          type="file"
                          name="file"
                          onChange={handleChange}
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <Loader
                    subText1="Processing your requirement..."
                    subtext2="Please wait while our AI structures your input for optimal usability."
                  />
                ))}

              {/* Step 3 */}
              {activeStep === 2 &&
                (!isLoader ? (
                  <div className="mt-2">
                    <Tabs
                      value={tabValue}
                      onChange={handleTabChange}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="secondary tabs example"
                    >
                      <Tab value="empaneled" label="Empaneled" />
                      <Tab value="allVendors" label="All Vendors" />
                    </Tabs>

                    {tabValue === "empaneled" && (
                      <div className="mt-2">
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={12}>
                            <Grid container spacing={1}>
                              {activeData.map((company, idx) => (
                                <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  md={4}
                                  key={idx}
                                  // onClick={() => handleDetails(company.id)}
                                >
                                  <div className="h-100 border p-3 rounded-md cursor-pointer">
                                    <div className="flex items-center mb-4">
                                      <img
                                        src={
                                          !company.logo
                                            ? "/assets/images/Companylogo.png"
                                            : company.logo
                                        }
                                        alt={company.name}
                                        className="me-3"
                                        style={{ width: 30, height: 30 }}
                                      />
                                      <div>
                                        <Tooltip title={company.name} arrow>
                                          <span className="text-ellipsis overflow-hidden truncate text-base font-bold">
                                            {company.name}
                                          </span>
                                        </Tooltip>
                                        <p className="text-base">
                                          {company.place}
                                        </p>
                                      </div>
                                    </div>

                                    <div>
                                      <span className="text-base me-4 flex items-center mb-1">
                                        <AccountCircleOutlined
                                          fontSize="inherit"
                                          className="text-indigo-600 mr-1"
                                        />
                                        Matching Candidate: {company.candidate}
                                      </span>

                                      <div
                                        className="text-base flex hover:text-indigo-700"
                                        onClick={() =>
                                          handleMatchingDialog(company.avgScore)
                                        }
                                      >
                                        <svg
                                          width="14px"
                                          height="14px"
                                          viewBox="0 0 512 512"
                                          version="1.1"
                                          xmlns="http://www.w3.org/2000/svg"
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
                                        Avg Score: {company.avgScore}%
                                      </div>
                                    </div>
                                  </div>
                                </Grid>
                              ))}
                            </Grid>
                          </Grid>
                        </Grid>
                      </div>
                    )}

                    {tabValue === "allVendors" && (
                      <div className="mt-2">
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={12}>
                            <Grid container spacing={1}>
                              {allVendors.map((company, idx) => (
                                <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  md={4}
                                  key={idx}
                                  // onClick={() => handleDetails(company.id)}
                                >
                                  <div className="h-100 border p-3 rounded-md cursor-pointer">
                                    <div className="flex items-center mb-4">
                                      <img
                                        src={
                                          !company.logo
                                            ? "/assets/images/Companylogo.png"
                                            : company.logo
                                        }
                                        alt={company.name}
                                        className="me-3"
                                        style={{ width: 30, height: 30 }}
                                      />
                                      <div>
                                        <Tooltip title={company.name} arrow>
                                          <span className="text-ellipsis overflow-hidden truncate text-base font-bold">
                                            {company.name}
                                          </span>
                                        </Tooltip>
                                        <p className="text-base">
                                          {company.place}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="">
                                      <span className="text-base me-4 flex items-center mb-1">
                                        <AccountCircleOutlined
                                          fontSize="inherit"
                                          className="text-indigo-600 mr-1"
                                        />
                                        Matching Candidate: {company.candidate}
                                      </span>

                                      <div
                                        className="text-base flex hover:text-indigo-700"
                                        onClick={() =>
                                          handleMatchingDialog(company.avgScore)
                                        }
                                      >
                                        <svg
                                          width="14px"
                                          height="14px"
                                          viewBox="0 0 512 512"
                                          version="1.1"
                                          xmlns="http://www.w3.org/2000/svg"
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
                                        Avg Score: {company.avgScore}%
                                      </div>
                                    </div>
                                  </div>
                                </Grid>
                              ))}
                            </Grid>
                          </Grid>
                        </Grid>
                      </div>
                    )}

                    <MatchingSkillsDialog
                      title="Matching Score Analysis"
                      isMatchOpen={isMatchOpen}
                      setIsMatchOpen={setIsMatchOpen}
                      aiScore={matchingScore}
                    />
                  </div>
                ) : (
                  <Loader
                    subText1="Our AI is analyzing your requirements to find the best-matching vendors. This involves evaluating skills, availability, and other factors to provide you with tailored recommendations."
                    subtext2="Your matches will be ready soon!"
                  />
                ))}
            </div>
          </div>

          <div className="px-4 py-2 border-t">
            <div className="col-span-2 flex justify-between">
              <div>
                {(activeStep == 1 || activeStep == 2) && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleBack}
                    sx={{ width: 125 }}
                  >
                    Back
                  </Button>
                )}
              </div>
              {activeStep !== steps?.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  sx={{ width: 125 }}
                >
                  Next
                </Button>
              )}
              {activeStep === steps?.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  sx={{ width: 125 }}
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default RequirementForm;
