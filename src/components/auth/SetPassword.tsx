import React, { useEffect, useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "./slider";
import { Controller, useForm } from "react-hook-form";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import EverifyDialog from "../sharedComponents/EverifyDialog";
import { setMemberPassword } from "../sharedService/apiService";
import SuccessDialog from "../sharedComponents/SuccessDialog";
import { closeBackdrop, openBackdrop } from "../features/drawerSlice";
import { RoleType } from "../sharedService/enums";
import { RoleData } from "../sharedService/shareData";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function SetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [isSuccessPopup, setIsSuccessPopup] = React.useState<boolean>(false);
  const pathSegments = location.pathname.split("/"); // Split path by "/"

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [result, setResult] = useState<any>("");

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
      userToken: pathSegments[pathSegments?.length - 1],
    },
  });

  const onSubmit = (data: any) => {
    setValue("userToken", pathSegments[pathSegments?.length - 1]);
    if (data.newPassword === data.confirmPassword) {
      dispatch(openBackdrop());
      setMemberPassword(data)
        .then((result: any) => {
          if (result) {
            setResult(result);
            if (result.content && result.content?.role?.length > 0) {
              const roles: any =
                result.content?.role?.length === 1 &&
                result.content?.role[0] === RoleType.Vendor
                  ? ["vendor"]
                  : result.content?.role?.length === 1 &&
                      result.content?.role[0] === RoleType.Client
                    ? ["company"]
                    : result.content?.role?.length > 1
                      ? ["company", "vendor"]
                      : [];
              localStorage.setItem("role", JSON.stringify(roles));
              localStorage.setItem(
                "activeRole",
                result.content?.role?.length > 0
                  ? result.content?.role[0] === RoleType.Vendor
                    ? "vendor"
                    : "company"
                  : ""
              );
            }
            if (result.success) {
              localStorage.setItem("isLoggedIn", "true");
              localStorage.setItem("userData", JSON.stringify(result?.content));
              setTimeout(() => {
                const activeRole = localStorage.getItem("activeRole") || "";
                if (
                  activeRole &&
                  RoleData.find((item: any) => item.role === activeRole)
                ) {
                  navigate(`/${activeRole}`);
                }
              }, 1000);
            }
            setTimeout(() => {
              dispatch(closeBackdrop());
              setIsSuccessPopup(true);
            }, 1000);
          }
        })
        .catch(() => {
          dispatch(closeBackdrop());
          setIsSuccessPopup(false);
        });
    } else {
      setError("confirmPassword", {
        type: "manual",
        message: "Password Mismatch",
      });
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
            <div className="w-full max-w-md mb-3">
              <img
                src={"/assets/images/logo.svg"}
                alt="Vendors Cloud Logo"
                className="h-[70px] mx-auto"
              />
            </div>
            <div className="w-full max-w-md mb-4">
              <h1 className="text-heading">Set password</h1>
            </div>

            <form className="w-full max-w-md space-y-4">
              {/* Password Field */}
              <Controller
                name="newPassword"
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
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <IconButton
                            type="button"
                            aria-label="search"
                            size="small"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        ),
                        sx: { pr: 0.5 },
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                rules={{
                  required: "Confirm Password is required",
                  minLength: {
                    value: 5,
                    message: "Password must be at least 5 characters long",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Confirm Password"
                    type={showPassword1 ? "text" : "password"}
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <IconButton
                            type="button"
                            aria-label="search"
                            size="small"
                            onClick={() => setShowPassword1((prev) => !prev)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        ),
                        sx: { pr: 0.5 },
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
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>

      {isSuccessPopup && (
        <SuccessDialog
          title={result?.success ? "Set Password successfully" : result.message}
          isOpenModal={isSuccessPopup}
          setIsOpenModal={setIsSuccessPopup}
          type={!result?.success ? "error" : "success"}
        />
      )}
    </>
  );
}
