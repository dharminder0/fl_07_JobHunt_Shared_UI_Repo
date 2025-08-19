import {
  getClientLists,
  getSkillsList,
  upsertRequirement,
} from "../../../../components/sharedService/apiService";
import {
  closeBackdrop,
  closeDrawer,
  openBackdrop,
} from "../../../../components/features/drawerSlice";
import { AppDispatch } from "@/components/redux/store";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  Autocomplete,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import ReactQuill from "react-quill";
import { LocationType } from "../../../../components/sharedService/enums";
import SuccessDialog from "../../../../components/sharedComponents/SuccessDialog";

function RequirementUpdate({ requirementData = {} }: any) {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const dispatch: AppDispatch = useDispatch();
  const [isLoader, setIsLoader] = useState(false);
  const [clientListData, setClientListData] = useState<any>([]);
  const [skillsData, setSkillsData] = useState<any[]>([]);
  const [isSuccessPopup, setIsSuccessPopup] = useState<boolean>(false);

  const { control, handleSubmit, watch, reset, setValue } = useForm({
    defaultValues: {
      id: requirementData?.id,
      clientCode: requirementData?.clientCode,
      title: requirementData?.title,
      description: requirementData?.description,
      experience: requirementData?.experience,
      budget: requirementData?.budget,
      locationType: requirementData?.locationType,
      location: requirementData?.location,
      positions: requirementData?.positions,
      duration: requirementData?.duration,
      remarks: requirementData?.remarks,
      status: requirementData?.status,
      userId: userData?.userId,
      orgCode: userData?.orgCode,
      skills: requirementData?.skills,
    },
  });

  const locationType = watch("locationType");

  const onSubmit = (data: any) => {
    dispatch(openBackdrop());
    upsertRequirement(data)
      .then((result: any) => {
        if (result.success) {
          setIsSuccessPopup(true);
          setTimeout(() => {
            dispatch(closeBackdrop());
            dispatch(closeDrawer());
          }, 1000);
        }
        setTimeout(() => {
          dispatch(closeBackdrop());
        }, 1500);
      })
      .catch((error: any) => {
        setTimeout(() => {
          dispatch(closeBackdrop());
        }, 1500);
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
    getSkillList();
    getClientListData();
  }, []);

  return (
    <>
      <div className="px-2 py-3 h-full">
        <div className="flex content-header border-b flex justify-between items-center pb-2">
          <div className="px-8 flex">
            <svg
              className="absolute cursor-pointer left-[8px] top-[14px]"
              onClick={() => dispatch(closeDrawer())}
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
            <h2 className="text-heading">Requirement update</h2>
          </div>
        </div>

        <div className="p-4 w-full overflow-auto h-[calc(100vh-92px)]">
          <div className="p-4 md:w-[95%] lg:w-[95%] xl:w-[70%] mx-auto">
            <div className="grid grid-cols-1 gap-4 mt-6">
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
                              <MenuItem key={option.value} value={option.value}>
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
                          onChange={(_, newValue) => field.onChange(newValue)}
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
            </div>
          </div>
        </div>

        <div className="px-4 py-2 border-t">
          <div className="col-span-2 flex justify-between">
            <div>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => dispatch(closeDrawer())}
                sx={{ width: 125 }}
              >
                Close
              </Button>
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              sx={{ width: 125 }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
      {isSuccessPopup && (
        <SuccessDialog
          title="Requirement updated successfully"
          isOpenModal={isSuccessPopup}
          setIsOpenModal={setIsSuccessPopup}
        />
      )}
    </>
  );
}

export default RequirementUpdate;
