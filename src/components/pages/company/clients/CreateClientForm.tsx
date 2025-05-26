import { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import FileUploadBox from "../../../sharedComponents/FileUploadBox";
import { Controller, useForm } from "react-hook-form";
import { upsertClient } from "../../../../components/sharedService/apiService";
import SuccessDialog from "../../../sharedComponents/SuccessDialog";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../components/redux/store";
import {
  closeBackdrop,
  closeDrawer,
  openBackdrop,
} from "../../../../components/features/drawerSlice";

const CreateClientForm = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [isSuccessPopup, setIsSuccessPopup] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      userId: userData?.userId,
      orgCode: userData?.orgCode,
      status: 1,
      clientName: "",
      description: "",
      contactPhone: "",
      contactEmail: "",
      address: "",
      website: "",
      logoURL: [
        {
          fileName: "",
          fileData: "",
        },
      ],
      faviconURL: [
        {
          fileName: "",
          fileData: "",
        },
      ],
    },
  });

  const onSubmit = (data: any) => {
    dispatch(openBackdrop());
    upsertClient(data)
      .then((result: any) => {
        if (result.success) {
          setIsSuccessPopup(true);
          setTimeout(() => {
            dispatch(closeBackdrop());
            handleCloseDrawer();
          }, 1000);
        }
      })
      .catch((error: any) => {
        setTimeout(() => {
          setIsSuccessPopup(false);
          dispatch(closeBackdrop());
        }, 1000);
      });
  };

  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };

  return (
    <div className="flex flex-col my-auto">
      <div className="h-full w-[calc(100vw-250px)]">
        <div className="d-flex content-header">
          <svg
            className="absolute cursor-pointer left-[8px] top-[11px]"
            onClick={handleCloseDrawer}
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
            <h2 className="text-heading">Add new client</h2>
          </div>
        </div>
        <div className="overflow-auto mx-auto flex justify-center">
          <div className="p-4 w-[50%] h-[calc(100vh-90px)]">
            <form className="space-y-6">
              <div className="p-4">
                <div className="space-y-4">
                  {/* Name */}
                  <Controller
                    name="clientName"
                    control={control}
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        size="small"
                        error={!!errors.clientName}
                        helperText={errors.clientName?.message}
                      />
                    )}
                  />

                  {/* About Client */}
                  {/* <Controller
                    name="description"
                    control={control}
                    rules={{ required: "About Client is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="About Client"
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={4}
                        placeholder="About Client"
                        size="small"
                        error={!!errors.description}
                        helperText={errors.description?.message}
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

                  {/* Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                    {/* Mobile */}
                    <Controller
                      name="contactPhone"
                      control={control}
                      rules={{
                        required: "Mobile number is required",
                        minLength: {
                          value: 10,
                          message: "Mobile number must be 10 digits",
                        },
                        maxLength: {
                          value: 10,
                          message: "Mobile number must be 10 digits",
                        },
                        pattern: {
                          value: /^[6-9]\d{9}$/, // Adjust if you need to accept other ranges
                          message: "Invalid mobile number format",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Contact Mobile"
                          variant="outlined"
                          fullWidth
                          size="small"
                          error={!!errors.contactPhone}
                          helperText={errors.contactPhone?.message}
                        />
                      )}
                    />

                    {/* Email */}
                    <Controller
                      name="contactEmail"
                      control={control}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Invalid email format",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Contact Email"
                          variant="outlined"
                          fullWidth
                          type="email"
                          size="small"
                          error={!!errors.contactEmail}
                          helperText={errors.contactEmail?.message}
                        />
                      )}
                    />
                  </div>

                  {/* Address */}
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        minRows={2}
                        placeholder="Address"
                        size="small"
                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />

                  {/* Website */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                    <Controller
                      name="website"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Website URL"
                          variant="outlined"
                          fullWidth
                          size="small"
                        />
                      )}
                    />
                  </div>

                  {/* Logo & Favicon Upload */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                    {/* Logo Upload */}
                    <FileUploadBox
                      title="Upload Logo"
                      fileSize="128 x 128"
                      iconType="image"
                      onUpload={(file: any) => setValue("logoURL", file)}
                      file={watch("logoURL")}
                    />

                    {/* Favicon Upload */}
                    <FileUploadBox
                      title="Upload Favicon"
                      fileSize="32 x 32"
                      iconType="image"
                      onUpload={(file: any) => setValue("faviconURL", file)}
                      file={watch("faviconURL")}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Submit Button */}
        <div className="px-4 py-2 border-t">
          <div className="flex justify-end">
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
          title="Client Added successfully"
          isOpenModal={isSuccessPopup}
          setIsOpenModal={setIsSuccessPopup}
        />
      )}
    </div>
  );
};

export default CreateClientForm;
