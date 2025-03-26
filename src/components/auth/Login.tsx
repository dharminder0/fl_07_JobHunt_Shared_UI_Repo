import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "./slider";
import { Controller, useForm } from "react-hook-form";
import { userLogin } from "../sharedService/apiService";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  closeBackdrop,
  closeEVerifyDialog,
  openBackdrop,
} from "../features/drawerSlice";
import { RoleType } from "../sharedService/enums";
import { RoleData } from "../sharedService/shareData";
import EverifyDialog from "../sharedComponents/EverifyDialog";
import { openEVerifyDialog } from "../features/drawerSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type FormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const isOpen = useSelector(
    (state: RootState) => state.drawer.isEVerifyDialogOpen
  );

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const activeRole = localStorage.getItem("activeRole") || "";
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn && activeRole && userData?.isVerified) {
      userData.role && userData.role?.length > 0
        ? navigate(`/${activeRole}`)
        : navigate("/onboard");
    } else {
      navigate("/login");
    }
  }, []);

  const onSubmit = (data: FormData) => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    if (userData && userData?.email && userData?.isVerified) {
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
            if (res.content?.role?.length > 0) {
              const roles: any =
                res.content?.role?.length === 1 &&
                res.content?.role[0] === RoleType.Vendor
                  ? ["vendor"]
                  : res.content?.role?.length === 1 &&
                      res.content?.role[0] === RoleType.Client
                    ? ["company"]
                    : res.content?.role?.length > 1
                      ? ["company", "vendor"]
                      : [];
              localStorage.setItem("role", JSON.stringify(roles));
              localStorage.setItem(
                "activeRole",
                res.content?.role?.length > 0
                  ? res.content?.role[0] === RoleType.Vendor
                    ? "vendor"
                    : "company"
                  : ""
              );
            }
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userData", JSON.stringify(res?.content));
            if (!res?.content?.isVerified) {
              dispatch(openEVerifyDialog());
            } else {
              redirectBasedOnRole();
            }
          } else {
            setError("password", {
              type: "manual",
              message: res.message || "Invalid email or password",
            });
          }
          setTimeout(() => {
            dispatch(closeBackdrop());
          }, 1000);
        })
        .catch((error: any) => {
          setTimeout(() => {
            dispatch(closeBackdrop());
          }, 1000);
        });
    }
  };

  const redirectBasedOnRole = () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    dispatch(closeEVerifyDialog());
    if (userData?.role?.length === 0) {
      setTimeout(() => {
        navigate("/onboard");
      }, 500);
    } else {
      const activeRole = localStorage.getItem("activeRole") || "";
      if (
        activeRole &&
        RoleData.find((item: any) => item.role === activeRole)
      ) {
        navigate(`/${activeRole}`);
      } else {
        navigate("/login"); // Fallback route
      }
    }
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
                    value: 5,
                    message: "Password must be at least 5 characters long",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    onKeyDown={handleKeyPress}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOff fontSize="small" />
                            ) : (
                              <Visibility fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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

      <EverifyDialog />
    </>
  );
}
