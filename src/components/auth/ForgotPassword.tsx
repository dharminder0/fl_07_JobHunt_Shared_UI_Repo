import React from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Slider from "./slider";
import { Controller, useForm } from "react-hook-form";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import SuccessDialog from "../sharedComponents/SuccessDialog";
import { forgotPassword } from "../sharedService/apiService";
import { closeBackdrop, openBackdrop } from "../features/drawerSlice";

export default function SetPassword() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [isSuccessPopup, setIsSuccessPopup] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<any>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: any) => {
    dispatch(openBackdrop());
    forgotPassword(data.email)
      .then((result: any) => {
        if (result) {
          setIsSuccessPopup(true);
          setResult(result);
        }
        setTimeout(() => {
          dispatch(closeBackdrop());
        }, 500);
      })
      .catch((error: any) => {
        setTimeout(() => {
          dispatch(closeBackdrop());
          setIsSuccessPopup(false);
        }, 1000);
      });
  };

  return (
    <>
      <div className="bg-white">
        <div className="container flex h-screen">
          {/* Left Section */}
          <div className="w-1/2 bg-white my-auto flex flex-col justify-end px-16">
            <div>
              <Slider />
            </div>
          </div>

          <div className="w-1/2 mx-auto flex flex-col justify-center items-center px-16">
            <div className="w-full max-w-md mb-3">
              <img
                src={"/assets/images/logo.svg"}
                alt="Vendors Cloud Logo"
                className="h-[70px] mx-auto"
              />
            </div>
            <div className="w-full max-w-md mb-4">
              <h1 className="text-heading">Forgot your password?</h1>
              <p className="text-base my-2 text-gray-500">
                Enter your email address and we'll send you instructions to
                reset your password.
              </p>
            </div>

            <form className="w-full max-w-md space-y-4">
              {/* Email Field */}
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email address",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handleSubmit(onSubmit)}
              >
                Send Reset Instructions
              </Button>
            </form>
            <p className="text-base text-gray-500 mt-2">
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Return to Login
              </span>
            </p>
          </div>
        </div>
      </div>

      {isSuccessPopup && (
        <SuccessDialog
          title={result?.message}
          isOpenModal={isSuccessPopup}
          setIsOpenModal={setIsSuccessPopup}
          type={!result?.success ? "error" : "success"}
        />
      )}
    </>
  );
}
