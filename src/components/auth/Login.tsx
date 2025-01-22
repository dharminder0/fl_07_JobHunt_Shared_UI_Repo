import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "./slider";
import { Controller, useForm } from "react-hook-form";
import { userLogin } from "../sharedService/apiService";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { closeBackdrop, openBackdrop } from "../features/drawerSlice";
import { RoleType } from "../sharedService/enums";
import { RoleData } from "../sharedService/shareData";

type FormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const credsList: any[] = [
    {
      email: "company@vendorscloud.com",
      password: "password",
      role: ["company"],
      companyIcon:
        "https://sdettech.com/wp-content/themes/sdetech/assets/images/favicon.png",
    },
    {
      email: "vendor@vendorscloud.com",
      password: "password",
      role: ["vendor"],
      companyIcon:
        "https://fleekitsolutions.com/wp-content/uploads/2023/09/favicon-32x32-1.png",
    },
    {
      email: "both@vendorscloud.com",
      password: "password",
      role: ["company", "vendor"],
      companyIcon:
        "https://opstree.com/wp-content/uploads/2024/10/FavIcon-OpsTree-100x100.png",
    },
  ];

  useEffect(() => {
    const activeRole = localStorage.getItem("activeRole") || "";
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn && activeRole) {
      navigate(`/${activeRole}`);
    } else {
      navigate("/login");
    }
  }, []);

  const onSubmit = (data: FormData) => {
    console.log("Form Data: ", data);
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    if (userData && userData?.email) {
      if (data.email === userData?.email) {
        redirectBasedOnRole();
        return;
      } else {
        logWithCreds(data);
        return;
      }
    } else {
      logWithCreds(data);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit(onSubmit);
    }
  };

  const logWithCreds = (data: any) => {
    if (data && data?.email) {
      const payload = {
        email: data?.email ?? "",
        password: data?.password ?? "",
      };
      dispatch(openBackdrop());
      userLogin(payload)
        .then((res: any) => {
          if (res?.success) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem(
              "activeRole",
              res.content?.role === RoleType.Vendor ? "vendor" : "company"
            );
            localStorage.setItem("userData", JSON.stringify(res?.content));
            const roles: any =
              res.content?.role === RoleType.Vendor
                ? ["vendor"]
                : res.content?.role === RoleType.Client
                ? ["company"]
                : res.content?.role === RoleType.Both
                ? ["company", "vendor"]
                : [];
            localStorage.setItem("role", JSON.stringify(roles));
            redirectBasedOnRole();
          } else {
            setError("password", {
              type: "manual",
              message: res.message || "Invalid email or password",
            });
          }
          setTimeout(() => {
            dispatch(closeBackdrop());
          }, 1000);
          console.log("login data", res);
        })
        .catch((error: any) => {
          setTimeout(() => {
            dispatch(closeBackdrop());
          }, 1000);
        });
    }
  };

  const redirectBasedOnRole = () => {
    const activeRole = localStorage.getItem("activeRole") || "";
    if (activeRole && RoleData.find((item: any) => item.role === activeRole)) {
      navigate(`/${activeRole}`);
    } else {
      navigate("/login"); // Fallback route
    }
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
            <h1 className="text-heading font-display">Welcome Back</h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-4"
          >
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

            {/* Password Field */}
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  onKeyDown={handleKeyPress}
                />
              )}
            />

            {/* Remember Me Checkbox */}
            <Controller
              name="rememberMe"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      color="primary"
                      checked={field.value}
                      size="small"
                    />
                  }
                  label="Remember me"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "12px",
                    },
                  }}
                />
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </form>

          <p className="text-base text-gray-500 mt-4">
            Don’t have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
