import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AccountCircleOutlined, Add, CorporateFareOutlined, ShareOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  Tab,
  Tabs,
  Tooltip,
} from "@mui/material";
import MatchingSkillsDialog from "../../../../components/shared/MatchingSkillsDialog";
import Loader from "../../../../components/shared/Loader";
import { useForm, Controller } from "react-hook-form";
import {
  generateRequirement,
  getOrgDetailsList,
  shareRequirement,
  upsertRequirement,
} from "../../../../components/sharedService/apiService";
import {
  LocationType,
  RoleType,
  Visibility,
} from "../../../../components/sharedService/enums";
import { getClientLists } from "../../../../components/sharedService/apiService";

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
  {
    id: 4,
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
    id: 5,
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
  {
    id: 6,
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
];

const allVendors = [
  {
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];

const RequirementForm = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [tabValue, setTabValue] = React.useState("recommendation");
  const [isMatchOpen, setIsMatchOpen] = React.useState(false);
  const [matchingScore, setMatchingScore] = React.useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [shareWith, setShareWith] = useState<any>(1);
  const [promptJson, setPromptJson] = useState<string>("");
  const [requirementId, setRequirementId] = useState<number>(0);  
  const [companiesfilterData, setcompaniesfilterData] = useState<any[]>([]);
  const [selectedVendors, setSelectedVendors] = useState<any>([]);  
  const [clientListData, setClientListData] = useState<any>([]);  

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

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

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      clientId: "",
      title: "",
      description: "",
      experience: "",
      budget: "",
      locationType: "",
      location: "",
      positions: "",
      duration: "",
      remarks: "",
      status: 1,
    },
  });

  const locationType = watch("locationType");

  const handleCardClick = (company: any) => {
    setSelectedCards((prevSelected: any) => {
      const isSelected = prevSelected.some(
        (item: any) => item.id === company.id
      );

      if (isSelected) {
        // Remove card if already selected
        return prevSelected.filter((item: any) => item.id !== company.id);
      } else {
        // Add card if not selected
        return [...prevSelected, company];
      }
    });
  };

  const isCardSelected = (company: any) =>
    selectedCards.some((item: any) => item.id === company.id);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const onSubmit = (data: any) => {
    data.orgCode = userData?.orgCode;
    setIsLoader(true);
    getOrgDetailsListData();
    upsertRequirement(data)
      .then((result: any) => {
        if (result.success) {
          console.log(result.content);
          setRequirementId(result.content);    
        }
        setTimeout(() => {
          setIsLoader(false);
        }, 1500);
      })
      .catch((error: any) => {
        setTimeout(() => {
          setIsLoader(false);
        }, 1500);
      });
  };

  const onPromtSubmit = () => {
    getClientListData('4ejCqgvm');
    const payload = {
      promptCode: "REQRMNT",
      loginUserId: userData?.userId,
      promptJson: promptJson,
    };
    setIsLoader(true);
    generateRequirement(payload)
      .then((result: any) => {
        if (result && !!result) {
          console.log(result);
          reset(result);
        }
        setTimeout(() => {
          setIsLoader(false);
        }, 1000);
      })
      .catch((error: any) => {
        setTimeout(() => {
          setIsLoader(false);
        }, 1000);
      });
  };

  const handleMatchingDialog = (score: number) => {
    setIsMatchOpen(true);
    setMatchingScore(score);
  };

  const handleShareWith = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setShareWith(e.target.value);
  };

  const handleStepSubmit = async (data: any) => {
    if (activeStep === 0) {
      await onPromtSubmit();
    } else if (activeStep === 1) {
      await onSubmit(data);
    } else if (activeStep === 2) {
      await handleSubmitStep2();
    }
    handleNext(); // Move to the next step after API call
  };

  const handleSubmitStep2 = () => {
    setIsLoader(true);
    const payload = {
      requirementId: requirementId,
      visibility: Visibility.Public,
      orgCode: shareWith == 1 ? selectedVendors : [],
    };
    shareRequirement(payload).then((res: any) => {
      if (res) {
        console.log(res);
        setDrawerOpen(false);
      }
      setTimeout(() => {
        setIsLoader(false);
      }, 1500);
    })
      .catch((error: any) => {
        setTimeout(() => {
          setIsLoader(false);
        }, 1000);
      });
  };

  const getOrgDetailsListData = () => {
    const payload = {
      role: [RoleType.Vendor],
      page: 1,
      pageSize: 10,
      searchText: '',
      technology: [],
      resource: [],
      strength: [],
    };
    setIsLoader(true);
    getOrgDetailsList(payload)
      .then((result: any) => {
        if (result.count > 0) {
          setcompaniesfilterData(result.list);
        } else {
          setcompaniesfilterData([]);
        }
        setTimeout(() => {
          setIsLoader(false);
        }, 1000);
      })
      .catch((error: any) => {
        console.error("Error fetching data:", error);
        setTimeout(() => {
          setIsLoader(false);
        }, 1000);
      });
  };  

     const getClientListData = (orgCode:any) => {
      getClientLists(orgCode).then((result: any) => {
          if (result) {
            setClientListData(result);
          }
        });
      }

  return (
    <div>
      <Button
        variant="contained"
        onClick={toggleDrawer(true)}
        startIcon={<Add />}
      >
        Post a requirement
      </Button>

      <Drawer anchor="right" open={drawerOpen}>    
        <div className="h-full w-[calc(100vw-250px)]">    
          <div className="d-flex content-header">
            <svg className="absolute cursor-pointer left-[8px] top-[11px]"  onClick={(event) => toggleDrawer(false)(event)} xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M20 20L4 4.00003M20 4L4.00002 20" stroke="black" stroke-width="2" stroke-linecap="round" />
            </svg>
            <div className="px-8 py-2 border-b">
              <h2 className="text-heading">Post Requirements</h2>
            </div>
          </div>             

          <div className="w-full overflow-auto h-[calc(100%-90px)]">
            <div className="p-4 md:w-[95%] lg:w-[95%] xl:w-[70%] mx-auto ">
              {/* Stepper */}
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>

              {/* Step 1 */}
              {activeStep === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {/* Conditional Rendering */}

                  <div className="col-span-2">
                    <p className="text-info mb-4">
                      Paste the raw requirement text in the box below. Our AI
                      will format and structure it to match the required format,
                      making it easier to manage and process.
                    </p>
                    <TextField
                      label="Paste Requirements"
                      name="promptJson"
                      onChange={(e: any) => setPromptJson(e.target.value)}
                      defaultValue={promptJson}
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
                  <div className="grid grid-cols-1 gap-4 mt-6">
                    {/* Conditional Rendering */}
                    {/* {formData.postType === "single" ? ( */}
                    <>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                      >
                        <div className="">
                          <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Title"
                                fullWidth
                                size="small"
                              />
                            )}
                          />
                        </div>
                        <div className="">
                          <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Job Description"
                                fullWidth
                                multiline
                                rows={10}
                                size="small"
                              />
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <Controller
                            name="experience"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Experience"
                                fullWidth
                                size="small"
                              />
                            )}
                          />

                          <Controller
                            name="budget"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Budget"
                                fullWidth
                                size="small"
                              />
                            )}
                          />

                          <Controller
                            name="positions"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Number of Positions"
                                fullWidth
                                size="small"
                              />
                            )}
                          />

                          <Controller
                            name="duration"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Contract Period"
                                fullWidth
                                size="small"
                              />
                            )}
                          />
                          <div className="flex items-center">
                            <label className="text-base me-3">
                              Job Location:
                            </label>
                            <Controller
                              name="locationType"
                              control={control}
                              render={({ field }) => (
                                <RadioGroup row {...field}>
                                  <FormControlLabel
                                    value={LocationType.Onsite}
                                    control={<Radio size="small" />}
                                    label="Onsite"
                                  />
                                  <FormControlLabel
                                    value={LocationType.Hybrid}
                                    control={<Radio size="small" />}
                                    label="Hybrid"
                                  />
                                  <FormControlLabel
                                    value={LocationType.Remote}
                                    control={<Radio size="small" />}
                                    label="Remote"
                                  />
                                </RadioGroup>
                              )}
                            />
                          </div>

                          {locationType == LocationType.Onsite && (
                            <Controller
                              name="location"
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  label="Enter Location"
                                  fullWidth
                                  size="small"
                                />
                              )}
                            />
                          )}
                        <div className="mt-3">
                        <FormControl fullWidth>
                        <InputLabel>{"Select Client"}</InputLabel>

                          <Controller
                            name="clientId"
                            control={control}
                            rules={{ required: "Resources Available For is required" }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                label="Select Client"
                                  fullWidth
                                  size="small"
                              >
                                {clientListData.map((option:any) => (
                                  <MenuItem key={option} value={option.clientCode}>
                                    {option.clientName}
                                  </MenuItem>
                                ))}
                              </Select>
                            )}
                          />
                        </FormControl>
                          
                        </div> 

                          {/* <div>
                            <Controller
                              name="clientId"
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  label="Select Client"
                                  fullWidth
                                  size="small"
                                />
                              )}
                            />
                            <label className="text-info">
                              Client information will not be shared with Vendors
                            </label>
                          </div> */}
                          <div className="col-span-2">
                            <Controller
                              name="remarks"
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  label="Remark for Vendor"
                                  fullWidth
                                  multiline
                                  rows={6}
                                  size="small"
                                />
                              )}
                            />
                          </div>
                        </div>
                      </form>
                    </>
                    {/* ) : (
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
                    )} */}
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
                  <div className="mt-4">
                    <Tabs
                      value={tabValue}
                      onChange={handleTabChange}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="secondary tabs example"
                    >
                      <Tab
                        icon={<ShareOutlined fontSize="inherit" />}
                        value="recommendation"
                        label="AI Recommendation"
                        iconPosition="start"
                      />
                      <Tab
                        value="share"
                        label="Share"
                        iconPosition="start"
                        icon={<ShareOutlined fontSize="inherit" />}
                      />
                    </Tabs>

                    {tabValue === "recommendation" && (
                      <div className="mt-2">
                        <p className="text-base my-3">Top matching vendors</p>
                        <h5 className="text-heading mb-3">Empaneled</h5>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {activeData.map((company, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleCardClick(company)}
                            >
                              <div
                                className={`h-100 border p-3 rounded-md cursor-pointer ${
                                  isCardSelected(company)
                                    ? "!bg-indigo-100 border-indigo-600"
                                    : ""
                                }`}
                              >
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
                                    <p className="text-base">{company.place}</p>
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
                            </div>
                          ))}
                        </div>

                        <h5 className="text-heading mb-3 mt-5">All Vendors</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {allVendors.map((company, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleCardClick(company)}
                            >
                              <div
                                className={`h-100 border p-3 rounded-md cursor-pointer ${
                                  isCardSelected(company)
                                    ? "!bg-indigo-100 border-indigo-600"
                                    : ""
                                }`}
                              >
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
                                    <p className="text-base">{company.place}</p>
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
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {tabValue === "share" && (
                      <div className="mt-2">
                        <FormControl>
                          <p className="text-base my-2">
                            Share your requirement with:
                          </p>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={handleShareWith}
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio size="small" />}
                              checked={shareWith == 1}
                              label="Specific Vendors"
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio size="small" />}
                              label="Empaneled"
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio size="small" />}
                              label="Public"
                            />
                          </RadioGroup>
                        </FormControl>
                        {shareWith == 1 && (                          
                        <div className="mt-3">
                          <Autocomplete
                            multiple
                            id="tags-readOnly"
                            options={companiesfilterData}
                            getOptionLabel={(option) => option.orgName} 
                            isOptionEqualToValue={(option, value) => option.orgName === value.orgName}                         
                            onChange={(event, newValue) => {
                              const selectedOrgCodes = newValue.map((item) => item.orgCode); 
                              setSelectedVendors(selectedOrgCodes);
                              console.log("Updated Selection:", selectedOrgCodes);
                            }}
                            renderOption={(props, option) => (
                              <li {...props} className="flex items-center">
                                <Avatar
                                  alt="Org Icon"
                                  src={option.logo || undefined}
                                  className="rounded-full !h-7 !w-7 mx-2 my-1"
                                >
                                  {!option.logo && <CorporateFareOutlined fontSize="small" />}
                                </Avatar>
                                {option.orgName}
                              </li>
                            )}
                            renderInput={(params) => (
                              <TextField {...params} label="Search vendor"placeholder="Search" />
                            )}
                          />
                        </div>                          
                        )}
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
                  onClick={handleSubmit(handleStepSubmit)}
                  sx={{ width: 125 }}
                >
                  Next
                </Button>
              )}
              {activeStep === steps?.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitStep2}
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
