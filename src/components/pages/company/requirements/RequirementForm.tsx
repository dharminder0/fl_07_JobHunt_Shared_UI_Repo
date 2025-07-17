import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  AccountCircleOutlined,
  Add,
  CorporateFareOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  Checkbox,
  Chip,
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
import MatchingSkillsDialog from "../../../sharedComponents/MatchingSkillsDialog";
import Loader from "../../../sharedComponents/Loader";
import configData from "../../../sharedService/config";
import { useForm, Controller } from "react-hook-form";
import {
  generateRequirement,
  getMatchingVendors,
  getOnboardInvitedList,
  getOrgDetailsList,
  getSkillsList,
  matchRequirementToCandidates,
  shareRequirement,
  upsertRequirement,
} from "../../../../components/sharedService/apiService";
import {
  LocationType,
  RoleType,
  Visibility,
} from "../../../../components/sharedService/enums";
import { getClientLists } from "../../../../components/sharedService/apiService";
import ReactQuill from "react-quill";
import { useOrgRequestList } from "../../../../components/hooks/useOrgRequestList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../components/redux/store";
import { closeDrawer } from "../../../../components/features/drawerSlice";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SuccessDialog from "../../../../components/sharedComponents/SuccessDialog";
import IconAi from "../../../../components/sharedComponents/IconAi";

const steps = ["Paste Requirement", "Basic Information", "Vendors"];

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const RequirementForm = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [isVendorLoader, setIsVendorLoader] = useState(false);
  const [tabValue, setTabValue] = React.useState("share");
  const [isMatchOpen, setIsMatchOpen] = React.useState(false);
  const [matchingScore, setMatchingScore] = React.useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [shareWith, setShareWith] = useState<any>(1);
  const [promptJson, setPromptJson] = useState<any>();
  const [requirementData, setRequirementData] = useState<any>({});
  const [companiesfilterData, setcompaniesfilterData] = useState<any[]>([]);
  const [selectedVendors, setSelectedVendors] = useState<any>([]);
  const [clientListData, setClientListData] = useState<any>([]);
  const [skillsData, setSkillsData] = useState<any[]>([]);
  const [matchingVendors, setMatchingVendors] = useState<any>({});
  const [isSuccessPopup, setIsSuccessPopup] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const orgCode = userData?.orgCode;

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const [activeStep, setActiveStep] = useState(0);

  const { control, handleSubmit, watch, reset, setValue } = useForm({
    defaultValues: {
      id: 0,
      clientCode: "",
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
      userId: "",
      skills: [],
    },
  });

  const locationType = watch("locationType");

  const handleCardClick = (company: any, useFor: any) => {
    setSelectedCards((prevSelected: any) => {
      const isSelected = prevSelected.some(
        (item: any) => item[useFor] === company[useFor]
      );

      if (isSelected) {
        // Remove card if already selected
        return prevSelected.filter(
          (item: any) => item[useFor] !== company[useFor]
        );
      } else {
        // Add card if not selected
        return [...prevSelected, company];
      }
    });
  };

  const isCardSelected = (company: any, useFor: any) =>
    selectedCards.some((item: any) => item[useFor] === company[useFor]);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const onSubmit = (data: any) => {
    data.orgCode = userData?.orgCode;
    data.userId = userData?.userId;
    data.id = !requirementData?.Id ? 0 : requirementData?.Id;
    setIsLoader(true);
    upsertRequirement(data)
      .then((result: any) => {
        if (result.success) {
          handleNext();
          setTimeout(() => {
            setRequirementData(result.content);
            getOrgDetailsListData();
          }, 500);
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
    getClientListData();
    const payload = {
      promptCode: configData.RequirementPromtCode,
      loginUserId: userData?.userId,
      promptJson: promptJson,
    };
    setIsLoader(true);
    generateRequirement(payload)
      .then((result: any) => {
        if (result && !!result) {
          reset(result);
          setValue("status", 1);
          setValue("locationType", LocationType[result?.locationType]);
          handleNext();
          setIsLoader(false);
        }
        getSkillList();
      })
      .catch((error: any) => {
        setTimeout(() => {
          setIsLoader(false);
        }, 1000);
      });
  };

  const handleShareWith = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setShareWith(Number(e.target.value));
  };

  const handleStepSubmit = async (data: any) => {
    if (activeStep === 0) {
      await onPromtSubmit();
    } else if (activeStep === 1) {
      await onSubmit(data);
    } else if (activeStep === 2) {
      await handleSubmitStep2();
    }
    // handleNext(); // Move to the next step after API call
  };

  const handleSubmitStep2 = () => {
    setIsLoader(true);
    const payload = {
      requirementId: requirementData?.UniqueId,
      visibility: shareWith,
      orgCode: shareWith == 1 ? selectedVendors : [],
    };
    shareRequirement(payload)
      .then((res: any) => {
        if (res) {
          setIsSuccessPopup(true);
        }
        setTimeout(() => {
          closeReqDrawer();
          setIsLoader(false);
          setIsSuccessPopup(false);
        }, 1500);
      })
      .catch((error: any) => {
        setTimeout(() => {
          setIsLoader(false);
          setIsSuccessPopup(false);
        }, 1000);
      });
  };

  const getOrgDetailsListData = () => {
    const payload = {
      orgCode: userData.orgCode,
      relationshipType: [RoleType.Client],
      status: 2,
      page: 1,
      pageSize: 50,
    };
    setIsLoader(true);
    getOnboardInvitedList(payload)
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

  const getClientListData = () => {
    getClientLists(userData?.orgCode).then((result: any) => {
      if (result) {
        setClientListData(result);
      }
    });
  };

  const getSkillList = () => {
    getSkillsList().then((result: any) => {
      if (result) {
        setSkillsData(result);
      }
    });
  };

  useEffect(() => {
    if (tabValue === "recommendation") {
      getCandidates();
    } else if (tabValue === "share" && activeStep == 2) {
      getOrgDetailsListData();
    }
  }, [tabValue]);

  const closeReqDrawer = () => {
    dispatch(closeDrawer());
  };

  const getCandidates = async () => {
    setIsVendorLoader(true);
    try {
      const data = await matchRequirementToCandidates([requirementData?.Id]);
      if (data && data?.length > 0) {
        setTimeout(() => {
          getMatchingVendorsList();
        }, 1000);
        setTimeout(() => {
          setIsVendorLoader(false);
        }, 2000);
      }
    } catch (err) {
      setTimeout(() => {
        setIsVendorLoader(false);
      }, 1000);
    }
  };

  const getMatchingVendorsList = () => {
    const payload = {
      requirementId: requirementData.Id,
      orgCode: userData.orgCode,
    };
    setIsLoader(true);
    getMatchingVendors(payload)
      .then((result: any) => {
        if (result) {
          setMatchingVendors(result);
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
  return (
    <div>
      <div className="h-full w-[calc(100vw-250px)]">
        <div className="d-flex content-header">
          <svg
            className="absolute cursor-pointer left-[8px] top-[11px]"
            onClick={closeReqDrawer}
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
            <h2 className="text-heading">Post Requirements</h2>
          </div>
        </div>

        <div className="w-full overflow-auto h-[calc(100vh-90px)]">
          <div className="p-4 md:w-[95%] lg:w-[95%] xl:w-[70%] mx-auto">
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
            {!isLoader && activeStep === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {/* Conditional Rendering */}

                <div className="col-span-2 requirement-quill">
                  <p className="text-info mb-4">
                    Paste the raw requirement text in the box below. Our AI will
                    format and structure it to match the required format, making
                    it easier to manage and process.
                  </p>
                  <TextField
                    label="Paste Requirements"
                    name="promptJson"
                    onChange={(e: any) => setPromptJson(e.target.value)}
                    defaultValue={promptJson}
                    fullWidth
                    multiline
                    minRows={25}
                    maxRows={40}
                    size="small"
                  />

                  {/* <ReactQuill
                    theme="snow"
                    value={promptJson}
                    defaultValue={promptJson}
                    onChange={setPromptJson}
                    placeholder="Paste Requirements"
                  /> */}
                </div>
              </div>
            ) : (
              isLoader &&
              activeStep === 0 && (
                <Loader
                  subText1="Processing your requirement..."
                  subtext2="Please wait while our AI structures your input for optimal usability."
                />
              )
            )}

            {/* Step 2 */}
            {!isLoader && activeStep === 1 ? (
              <div className="grid grid-cols-1 gap-4 mt-6">
                {/* Conditional Rendering */}
                {/* {formData.postType === "single" ? ( */}
                <>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    {/* <div className="">
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
                    </div> */}

                    <Controller
                      name="description" // your form field name
                      control={control}
                      defaultValue=""
                      render={({ field: { onChange, value } }) => (
                        <ReactQuill
                          theme="snow"
                          value={value}
                          onChange={onChange}
                          placeholder="Job Description"
                        />
                      )}
                    />

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
                        <label className="text-base me-3">Job Location:</label>
                        <Controller
                          name="locationType"
                          control={control}
                          rules={{ required: "Job location is required" }}
                          render={({ field, fieldState: { error } }) => (
                            <div>
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
                              {error && (
                                <p className="text-sm text-red-500 mt-1">
                                  {error.message}
                                </p>
                              )}
                            </div>
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
                        <Controller
                          name="clientCode"
                          control={control}
                          render={({ field }) => (
                            <FormControl fullWidth size="small">
                              <InputLabel>Select Client</InputLabel>
                              <Select
                                {...field}
                                label="Select Client"
                                onChange={(event) =>
                                  field.onChange(event.target.value)
                                } // Ensure correct value handling
                              >
                                {clientListData?.map((option: any) => (
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          )}
                        />
                      </div>

                      <div className="col-span-2">
                        <Controller
                          name="skills"
                          control={control}
                          render={({ field }) => (
                            <Autocomplete
                              multiple
                              options={skillsData}
                              value={field.value || []}
                              onChange={(_, newValue) =>
                                field.onChange(newValue)
                              }
                              renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                  <Chip
                                    variant="outlined"
                                    size="small" // ✅ This makes the chip smaller
                                    label={option}
                                    {...getTagProps({ index })}
                                  />
                                ))
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Skills"
                                  placeholder="Search skills"
                                />
                              )}
                            />
                          )}
                        />
                      </div>

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
              isLoader && activeStep === 1 && <Loader />
            )}

            {/* Step 3 */}
            {activeStep === 2 && (
              <div className="mt-4">
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  textColor="primary"
                  indicatorColor="primary"
                  aria-label="secondary tabs example"
                >
                  <Tab
                    value="share"
                    label="Share"
                    iconPosition="start"
                    icon={<ShareOutlined fontSize="inherit" />}
                  />
                  <Tab
                    icon={<IconAi />}
                    value="recommendation"
                    label="AI Recommendation"
                    iconPosition="start"
                  />
                </Tabs>

                {tabValue === "recommendation" && (
                  <div className="mt-2">
                    <p className="text-base my-3">Top matching vendors</p>

                    {!isLoader && !isVendorLoader && (
                      <>
                        <h5 className="text-heading mb-3">Empaneled</h5>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {matchingVendors?.empaneledVendor?.length > 0 ? (
                            matchingVendors.empaneledVendor.map(
                              (company: any, idx: number) => (
                                <div
                                  key={idx}
                                  onClick={() =>
                                    handleCardClick(company, "matchingOrgCode")
                                  }
                                >
                                  <div
                                    className={`h-100 border p-3 rounded-md cursor-pointer ${
                                      isCardSelected(company, "matchingOrgCode")
                                        ? "!bg-indigo-100 border-indigo-600"
                                        : ""
                                    }`}
                                  >
                                    <div className="flex items-center mb-4">
                                      <img
                                        src={
                                          !company.orgLogo
                                            ? "/assets/images/Companylogo.png"
                                            : company.orgLogo
                                        }
                                        alt={company.orgName}
                                        className="me-3"
                                        style={{ width: 30, height: 30 }}
                                      />
                                      <div>
                                        <Tooltip title={company.orgName} arrow>
                                          <span className="text-ellipsis overflow-hidden truncate text-base font-bold">
                                            {company.orgName}
                                          </span>
                                        </Tooltip>
                                        <p className="text-base">
                                          {company?.city}
                                        </p>
                                      </div>
                                    </div>

                                    <div>
                                      <span className="text-base me-4 flex items-center mb-1">
                                        <AccountCircleOutlined
                                          fontSize="inherit"
                                          className="text-indigo-600 mr-1"
                                        />
                                        Matching Candidate:{" "}
                                        {company?.numberOfCandidates || 0}
                                      </span>

                                      <div className="text-base flex">
                                        <IconAi />
                                        Avg Score:{" "}
                                        {company?.averageMatchingScore} %
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            )
                          ) : (
                            <>
                              <p className="text-base">No data available</p>
                            </>
                          )}
                        </div>

                        <h5 className="text-heading mb-3 mt-5">All Vendors</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {matchingVendors?.publicVendor?.length > 0 &&
                            matchingVendors.publicVendor?.map(
                              (company: any, idx: any) => (
                                <div
                                  key={idx}
                                  onClick={() =>
                                    handleCardClick(company, "matchingOrgCode")
                                  }
                                >
                                  <div
                                    className={`h-100 border p-3 rounded-md cursor-pointer ${
                                      isCardSelected(company, "matchingOrgCode")
                                        ? "!bg-indigo-100 border-indigo-600"
                                        : ""
                                    }`}
                                  >
                                    <div className="flex items-center mb-4">
                                      <img
                                        src={
                                          !company.orgLogo
                                            ? "/assets/images/Companylogo.png"
                                            : company.orgLogo
                                        }
                                        alt={company.orgName}
                                        className="me-3"
                                        style={{ width: 30, height: 30 }}
                                      />
                                      <div>
                                        <Tooltip title={company.orgName} arrow>
                                          <span className="text-ellipsis overflow-hidden truncate text-base font-bold">
                                            {company.orgName}
                                          </span>
                                        </Tooltip>
                                        <p className="text-base">
                                          {company?.city}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="">
                                      <span className="text-base me-4 flex items-center mb-1">
                                        <AccountCircleOutlined
                                          fontSize="inherit"
                                          className="text-indigo-600 mr-1"
                                        />
                                        Matching Candidate:{" "}
                                        {company?.numberOfCandidates}
                                      </span>

                                      <div className="text-base flex">
                                        <IconAi />
                                        Avg Score:{" "}
                                        {company?.averageMatchingScore} %
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                        </div>
                      </>
                    )}
                    {isVendorLoader && tabValue === "recommendation" && (
                      <>
                        <Loader
                          subText1="Our AI is analyzing your requirements to find the best-matching vendors. This involves evaluating skills, availability, and other factors to provide you with tailored recommendations."
                          subtext2="Your matches will be ready soon!"
                        />
                      </>
                    )}
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
                          size="medium"
                          id="tags-readOnly"
                          options={companiesfilterData}
                          getOptionLabel={(option) => option.orgName}
                          isOptionEqualToValue={(option, value) =>
                            option.orgName === value.orgName
                          }
                          onChange={(event, newValue) => {
                            const selectedOrgCodes = newValue.map(
                              (item) => item.relatedOrgCode
                            );
                            setSelectedVendors(selectedOrgCodes);
                          }}
                          renderOption={(props, option) => (
                            <li {...props} className="flex items-center">
                              <Avatar
                                alt="Org Icon"
                                src={option.logo || undefined}
                                className="rounded-full !h-7 !w-7 mx-2 my-1"
                              >
                                {!option.logo && (
                                  <CorporateFareOutlined fontSize="small" />
                                )}
                              </Avatar>
                              {option.orgName}
                            </li>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="medium"
                              label="Search vendor"
                              placeholder="Search"
                            />
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
            )}
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
                disabled={!promptJson}
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
                disabled={
                  (shareWith == 1 &&
                    selectedVendors?.length <= 0 &&
                    tabValue === "share") ||
                  (selectedCards?.length <= 0 && tabValue === "recommendation")
                }
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </div>
      {isSuccessPopup && (
        <SuccessDialog
          title="Requirement created and shared successfully"
          isOpenModal={isSuccessPopup}
          setIsOpenModal={setIsSuccessPopup}
        />
      )}
    </div>
  );
};

export default RequirementForm;
