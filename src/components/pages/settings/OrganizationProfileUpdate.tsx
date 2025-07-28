import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { TextField, Button, MenuItem, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { AppDispatch } from "@/components/redux/store";
import { useDispatch } from "react-redux";
import {
  getOrgProfileDetails,
  getStateList,
  updateOrgProfileDetails,
} from "../../../components/sharedService/apiService";
import {
  closeBackdrop,
  closeDrawer,
  openBackdrop,
} from "../../../components/features/drawerSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadLogo from "../../../components/sharedComponents/UploadLogo";

const platforms = ["linkedin", "facebook", "github", "twitter", "instagram"];

const defaultValues = {
  logo: [
    {
      fileName: "",
      fileData: "",
    },
  ],
  orgName: "",
  regAddress: "",
  description: "",
  email: "",
  phone: "",
  website: "",
  officeLocation: [
    {
      city: "",
      state: 0,
    },
  ],
  socialLinks: [
    {
      platform: "",
      name: "",
      url: "",
    },
  ],
};

export default function OrganizationProfileUpdate() {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [orgData, setOrgData] = useState<any>();
  const [stateData, setStateData] = useState<any>();
  const dispatch: AppDispatch = useDispatch();
  const [discription, setDiscription] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    getStateListData();
    getOrgProfile();
  }, []);

  const getOrgProfile = () => {
    const payload = {
      orgCode: userData.orgCode,
      relatedOrgCode: "",
    };
    getOrgProfileDetails(payload)
      .then((result: any) => {
        if (result.success) {
          setOrgData(result.content);
          reset(result.content);
          setValue("logo", [{ fileName: "", fileData: result.content.logo }]);
          setDiscription(result.content.description);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const getStateListData = () => {
    getStateList("state")
      .then((result: any) => {
        if (result && result?.length >= 0) {
          setStateData(result);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const {
    fields: locationFields,
    append: appendLocation,
    remove: removeLocation,
  } = useFieldArray({
    control,
    name: "officeLocation",
  });

  const onSubmit = (data: any) => {
    dispatch(openBackdrop());
    updateOrgProfileDetails(data)
      .then((result: any) => {
        if (result.success) {
          setTimeout(() => {
            dispatch(closeBackdrop());
            handleOpenDrawer();
          }, 1000);
        }
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(closeBackdrop());
        }, 1000);
      });
  };

  const handleOpenDrawer = () => {
    dispatch(closeDrawer());
  };

  return (
    <div className="!overflow-hidden">
      <div className="d-flex content-header">
        <svg
          className="absolute cursor-pointer left-[8px] top-[19px]"
          onClick={() => handleOpenDrawer()}
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
        <div className="px-8 py-4 border-b">
          <h2 className="text-heading">Update Company Details</h2>
        </div>
      </div>
      <div className="h-[calc(100vh-120px)] !overflow-y-auto">
        <div className="md:w-[95%] lg:w-[95%] xl:w-[70%] p-4 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-2 flex justify-center items-center">
              <UploadLogo
                title="Upload Logo"
                fileSize="128 x 128"
                iconType="image"
                onUpload={(file: any) => setValue("logo", file)}
                file={watch("logo")}
              />
            </div>

            <p className="text-title">Company Information</p>
            <Controller
              name="orgName"
              control={control}
              rules={{
                required: "Company name is required",
                validate: (value) =>
                  !/\s{2,}/.test(value) || "Multiple spaces are not allowed",
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Company Name"
                  {...field}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value.replace(/\s{2,}/g, " "); // replace multiple spaces
                    value = value.trimStart(); // prevent leading space while typing
                    field.onChange(value);
                  }}
                  onBlur={(e) => {
                    const value = e.target.value.trim(); // trim on blur (leading & trailing)
                    field.onChange(value);
                  }}
                  error={!!errors.orgName}
                  helperText={errors.orgName?.message}
                  size="small"
                />
              )}
            />

            <Controller
              name="regAddress"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Address"
                  {...field}
                  error={!!errors.regAddress}
                  helperText={errors.regAddress?.message}
                  size="small"
                />
              )}
            />

            {/* <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Description"
                  multiline
                  rows={4}
                  {...field}
                  size="small"
                />
              )}
            /> */}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  {...field}
                  theme="snow"
                  value={field.value || ""}
                  onChange={field.onChange} // Important to update form state
                />
              )}
            />
            <p className="text-title mt-3">Contact Details</p>
            <div className="grid grid-cols-2 gap-x-3">
              <div>
                <Controller
                  name="email"
                  control={control}
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
              </div>
              <div>
                {" "}
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Phone"
                      {...field}
                      size="small"
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  name="website"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Website"
                      {...field}
                      size="small"
                    />
                  )}
                />
              </div>
            </div>

            <p className="text-title mt-3">Office Locations</p>
            <div className="grid grid-cols-2">
              {locationFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2 mt-2">
                  <Controller
                    name={`officeLocation.${index}.state`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="State"
                        select
                        {...field}
                        size="small"
                        className="w-[100%]"
                        placeholder="Select State"
                      >
                        {stateData?.length > 0 &&
                          stateData.map((state: any) => (
                            <MenuItem key={state.id} value={state.id}>
                              {state.value}
                            </MenuItem>
                          ))}
                      </TextField>
                    )}
                  />
                  <Controller
                    name={`officeLocation.${index}.city`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="City"
                        {...field}
                        size="small"
                      />
                    )}
                  />
                  <IconButton
                    color="error"
                    onClick={() => removeLocation(index)}
                    className="!mr-2"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              ))}
            </div>
            <Button
              startIcon={<AddIcon />}
              onClick={() => appendLocation({ city: "", state: 0 })}
              className="!mt-2"
            >
              Add Office Location
            </Button>

            <p className="text-title my-3">Social Links</p>

            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-4 gap-2 mt-2">
                <Controller
                  control={control}
                  name={`socialLinks.${index}.platform`}
                  render={({ field }) => (
                    <TextField label="Platform" select {...field} size="small">
                      {platforms.map((platform) => (
                        <MenuItem key={platform} value={platform}>
                          {platform}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <Controller
                  name={`socialLinks.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <TextField label="Display name" {...field} size="small" />
                  )}
                />
                <div className="col-span-2">
                  <Controller
                    name={`socialLinks.${index}.url`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Link"
                        {...field}
                        className="w-[calc(100%-51px)]"
                        size="small"
                      />
                    )}
                  />
                  <IconButton
                    color="error"
                    onClick={() => remove(index)}
                    className="!ms-2"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            ))}

            <Button
              startIcon={<AddIcon />}
              onClick={() => append({ name: "", url: "", platform: "" })}
              className="!mt-2"
            >
              Add Social Link
            </Button>
          </form>
        </div>
      </div>
      <div className="p-4 border-t flex justify-between">
        <Button
          variant="outlined"
          className="!mr-4 !w-[110px]"
          onClick={handleOpenDrawer}
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
  );
}
