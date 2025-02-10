import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Slider from "./slider";
import { SubmitHandler, useForm } from "react-hook-form";
import { usertUser } from "../sharedService/apiService";
import {
  closeBackdrop,
  openBackdrop,
  openEVerifyDialog,
} from "../features/drawerSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { RoleType } from "../sharedService/enums";
import EverifyDialog from "../sharedComponents/EverifyDialog";

export default function SignUp() {
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = (data: any) => {
    localStorage.setItem("companyName", data?.companyName);
    handleBackDropOpen();
    usertUser(data)
      .then((res: any) => {
        if (res?.success) {
          localStorage.setItem("isLoggedIn", "true");
          res.content["companyName"] = data?.companyName;
          res.content["userName"] = data?.firstName + " " + data?.lastName;
          localStorage.setItem("userData", JSON.stringify(res?.content));
        }
        setTimeout(() => {
          handleBackDropClose();
          dispatch(openEVerifyDialog());
        }, 1000);
      })
      .catch((error: any) => {
        setTimeout(() => {
          handleBackDropClose();
        }, 1000);
      });
  };

  const handleBackDropClose = () => {
    dispatch(closeBackdrop());
  };
  const handleBackDropOpen = () => {
    dispatch(openBackdrop());
  };

  return (
    <div className="bg-white">
      <div className="container flex h-screen">
        {/* Left Section */}
        <div className="w-1/2 bg-white my-auto flex flex-col justify-end px-16">
          <div>
            <Slider />
          </div>
        </div>
        <div className="w-1/2 mx-auto flex flex-col justify-center items-center px-16">
          <div className="w-full max-w-md mb-8">
            <h1 className="text-heading text-gray-700">
              Get more opportunities
            </h1>
          </div>

          {/* Signup Form */}
          <form
            className="w-full max-w-md space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              label="First Name"
              fullWidth
              variant="outlined"
              size="small"
              {...register("firstName", {
                required: "First Name",
              })}
              error={!!errors.companyName}
            />
            <TextField
              label="Last Name"
              fullWidth
              variant="outlined"
              size="small"
              {...register("lastName")}
            />
            <TextField
              label="Company Name"
              fullWidth
              variant="outlined"
              size="small"
              {...register("companyName", {
                required: "Company Name",
              })}
              error={!!errors.companyName}
            />
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              size="small"
              {...register("email", {
                required: "Email Address",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              size="small"
              {...register("password", {
                required: "Password ",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={!!errors.password}
            />

            {/* Error message */}
            {errors && (
              <p className="text-info text-red-500">
                {/* {Object.values(errors)
                  .map((err) => err?.message)
                  .join(", ")} */}
              </p>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Continue
            </Button>
          </form>

          <p className="text-base text-gray-500 mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
          <p className="text-info text-gray-500 mt-4">
            By clicking 'Continue', you acknowledge that you have read and
            accept the Terms of Service and Privacy Policy.
          </p>
        </div>

        <EverifyDialog />
      </div>
    </div>
  );
}
