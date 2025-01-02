import { useForm, Controller } from "react-hook-form";
import { TextField, Button, MenuItem } from "@mui/material";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  access: string;
};

const AddNewMemberForm = ({ isEditable = false }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: !isEditable ? "" : "Somya",
      lastName: !isEditable ? "" : "Srivastava",
      email: !isEditable ? "" : "somya@opstree.com",
      phone: !isEditable ? "" : "9087654321",
      access: !isEditable ? "" : "admin",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    // Add your submit logic here
  };

  return (
    <div className="h-full">
      <div className="px-4 border-b flex h-[45px] items-center">
        <h2 className="text-heading">
          {!isEditable ? "Add new team member" : "Update Details"}
        </h2>
      </div>

      <div className="w-full overflow-auto h-[calc(100%-90px)]">
        <div className="p-4 md:w-[95%] lg:w-[95%] xl:w-[70%] mx-auto">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
                  helperText={errors.firstName?.message}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              rules={{ required: "Last Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
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
                  helperText={errors.email?.message}
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
                  helperText={errors.phone?.message}
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
                  helperText={errors.access?.message}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="vendor">Vendor</MenuItem>
                  <MenuItem value="company">Company</MenuItem>
                </TextField>
              )}
            />
          </form>
        </div>
      </div>

      {/* footer */}
      <div className="px-4 border-t flex justify-end h-[45px] items-center">
        {/* <Button
          variant="outlined"
          size="small"
          onClick={() => reset()}
          className="ml-2"
        >
          Reset
        </Button> */}
        <Button
          variant="contained"
          size="small"
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddNewMemberForm;
