import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  MenuItem,
  Tooltip,
  IconButton,
} from "@mui/material";
import { RoleType } from "../sharedService/enums";
import { addNewMember } from "../sharedService/apiService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  closeBackdrop,
  closeDrawer,
  openBackdrop,
} from "../features/drawerSlice";
import React from "react";
import SuccessDialog from "./SuccessDialog";
import { CloseOutlined } from "@mui/icons-material";

const AddNewMemberForm = ({ isEditable = false, data = {} }: any) => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const dispatch: AppDispatch = useDispatch();
  const [isSuccessPopup, setIsSuccessPopup] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      orgCode: userData?.orgCode,
      firstName: data?.firstName ? data?.firstName : "",
      lastName: data?.lastName ? data?.lastName : "",
      email: data?.userName ? data?.userName : "",
      phone: data?.phone ? data?.phone : "",
      access: data?.role
        ? data?.role?.length > 1
          ? [RoleType.Both]
          : [data?.role == "Vendor" ? RoleType.Vendor : RoleType.Client]
        : [],
    },
  });

  const onSubmit = (data: any) => {
    setValue("orgCode", userData?.orgCode);
    let payload = data;
    payload["access"] = data.access[0] == "3" ? userData.role : data.access;

    dispatch(openBackdrop());
    addNewMember(data)
      .then((result: any) => {
        if (result.success) {
          setTimeout(() => {
            dispatch(closeBackdrop());
            dispatch(closeDrawer());
            setIsSuccessPopup(true);
          }, 500);
        }
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(closeBackdrop());
        }, 500);
      });
  };

  return (
    <>
      <div className="h-full">
        <div className="px-4 border-b flex h-[45px] items-center">
          <svg
            className="absolute cursor-pointer left-[8px] top-[15px]"
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
          <div className="px-3">
            <h2 className="text-heading">
              {!isEditable ? "Add new team member" : "Update Details"}
            </h2>
          </div>
        </div>

        <div className="w-full overflow-auto h-[calc(100%-90px)]">
          <div className="p-4 md:w-[95%] lg:w-[95%] xl:w-[70%] mx-auto">
            <form className="space-y-4">
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "First Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    error={!!errors.firstName}
                    // helperText={errors.firstName?.message}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    size="small"
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    size="small"
                    error={!!errors.email}
                    // helperText={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid phone number format",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    type="tel"
                    variant="outlined"
                    fullWidth
                    size="small"
                    error={!!errors.phone}
                    // helperText={errors.phone?.message}
                  />
                )}
              />
              <Controller
                name="access"
                control={control}
                rules={{ required: "Access is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Access"
                    variant="outlined"
                    fullWidth
                    size="small"
                    error={!!errors.access}
                    // helperText={errors.access?.message}
                    onChange={(event) => field.onChange([event.target.value])} // Ensure value is stored as an array
                    value={field.value[0] || ""} // Extract first value for proper binding
                  >
                    {userData?.role?.length == 1 &&
                      userData?.role[0] == RoleType.Vendor && (
                        <MenuItem value={RoleType.Vendor}>Vendor</MenuItem>
                      )}
                    {userData?.role?.length == 1 &&
                      userData?.role[0] == RoleType.Client && (
                        <MenuItem value={RoleType.Client}>Partner</MenuItem>
                      )}
                    {userData?.role?.length > 1 && [
                      <MenuItem value={RoleType.Vendor}>Vendor</MenuItem>,
                      <MenuItem value={RoleType.Client}>Partner</MenuItem>,
                      <MenuItem value={RoleType.Both}>Both</MenuItem>,
                    ]}
                  </TextField>
                )}
              />
            </form>
          </div>
        </div>

        {/* footer */}
        <div className="px-4 border-t flex justify-end h-[45px] items-center">
          <Button
            variant="outlined"
            size="small"
            onClick={() => reset()}
            className="!mr-2"
          >
            Reset
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </div>
      </div>
      {isSuccessPopup && (
        <SuccessDialog
          title="New Member Added successfully"
          isOpenModal={isSuccessPopup}
          setIsOpenModal={setIsSuccessPopup}
        />
      )}
    </>
  );
};

export default AddNewMemberForm;
