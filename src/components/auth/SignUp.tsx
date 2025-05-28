import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  InputAdornment,
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
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function SignUp() {
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

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
          res.content["firstName"] = data?.firstName;
          res.content["lastName"] = data?.lastName;
          localStorage.setItem("userData", JSON.stringify(res?.content));
          dispatch(openEVerifyDialog());
        }
        if (!res.success) {
          setError(res.message);
        }
        setTimeout(() => {
          handleBackDropClose();
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

  const getPasswordStrength = (password: string): string => {
    if (password.length < 6) return "Too short";

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return "Weak";
    if (strength === 3 || strength === 4) return "Medium";
    if (strength === 5) return "Strong";
    return "";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setStrength(getPasswordStrength(pwd));
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "Too short":
        return "text-gray-500";
      case "Weak":
        return "text-red-500";
      case "Medium":
        return "text-yellow-500";
      case "Strong":
        return "text-green-500";
      default:
        return "";
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
          {" "}
          <div className="w-full max-w-md mb-3">
            <img
              src={"/assets/images/logo.svg"}
              alt="Vendors Cloud Logo"
              className="h-[70px] mx-auto"
            />
          </div>
          <div className="w-full max-w-md mb-4">
            <h1 className="text-gray-700">Let's get started</h1>
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
              type={showPassword ? "text" : "password"}
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
              onChange={handlePasswordChange}
              error={!!errors.password}
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

            {password && (
              <p className={`!mt-1 text-info ${getStrengthColor(strength)}`}>
                {strength === "Too short"
                  ? "Password must be at least 6 characters"
                  : `Password strength: ${strength}`}
              </p>
            )}

            {/* Error message */}
            {error && <p className="text-info text-red-500">{error}</p>}

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
