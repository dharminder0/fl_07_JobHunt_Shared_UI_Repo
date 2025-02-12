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

const platforms = ["linkedin", "facebook", "github", "twitter", "instagram"];

const defaultValues = {
  logo: "",
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

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    getStateListData();
    getOrgProfile();
  }, []);

  const getOrgProfile = () => {
    getOrgProfileDetails(userData.orgCode)
      .then((result: any) => {
        if (result.success) {
          setOrgData(result.content);
          reset(result.content);
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
      <h2 className="text-heading border-b p-4">Update Company Details</h2>
      <div className="h-[calc(100vh-120px)] !overflow-y-auto">
        <div className="md:w-[95%] lg:w-[95%] xl:w-[70%] p-4 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-title">Company Information</p>
            <Controller
              name="orgName"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Company Name"
                  {...field}
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
            <Controller
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
                    <TextField label="Username" {...field} size="small" />
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
