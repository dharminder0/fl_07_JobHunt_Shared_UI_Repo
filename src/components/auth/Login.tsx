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

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const creds: any = {
    email: "admin@fleek.com",
    password: "Admin",
    role: ["company"],
  };

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
      role: ["vendor", "company"],
      companyIcon:
        "https://opstree.com/wp-content/uploads/2024/10/FavIcon-OpsTree-100x100.png",
    },
  ];

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = () => {
    // Step 1: Check if credentials already exist in localStorage
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    const storedRole = localStorage.getItem("role");
    const companyIcon = localStorage.getItem("companyIcon");

    if (storedEmail && storedPassword) {
      // If credentials exist in localStorage, verify them
      if (email === storedEmail && password === storedPassword) {
        setErrorMessage("");
        redirectBasedOnRole(JSON.parse(storedRole || "[]"));
        return;
      } else {
        logWithCreds();
        setErrorMessage("Stored credentials do not match. Please try again.");
        return;
      }
    } else {
      logWithCreds();
    }
  };

  const logWithCreds = () => {
    const user = credsList.find(
      (cred) => cred.email === email && cred.password === password
    );

    if (user) {
      // Successful login: Store user credentials in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("email", user.email);
      localStorage.setItem("password", user.password);
      localStorage.setItem("companyIcon", user.companyIcon);
      localStorage.setItem("role", JSON.stringify(user.role));

      setErrorMessage(""); // Clear error message

      // Redirect based on role
      redirectBasedOnRole(user.role);
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  const redirectBasedOnRole = (roles: string[]) => {
    if (roles.includes("company")) {
      navigate("/company");
    } else if (roles.includes("vendor")) {
      navigate("/vendor");
    } else {
      navigate("/dashboard"); // Fallback route
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="container flex h-screen">
        {/* Left Section */}
        <div className="w-2/ bg-gray-50 my-auto flex flex-col justify-end px-16">
          {/* <div className="mb-8 bg-white p-4 w-40">
            <img
              src={"/assets/images/bar.png"}
              alt="JobHunty Logo"
              className="h-8 w-auto mb-4"
            />
            <h2 className="font-bold text-title">10K+</h2>
            <p className="text-gray-600 text-base">People got hired</p>
          </div>
          <div className="self-center">
            <img
              src={"/assets/images/banner-person.png"}
              alt="JobHunty Logo"
              className="w-[60%]"
            />
          </div> */}
          <div>
             <Slider />
          </div>
        </div>

        <div className="w-3/5 mx-auto flex flex-col justify-center items-center px-16">
          <div className="w-full max-w-md mb-8">
            <h1 className="text-heading font-display">Welcome Back</h1>
          </div>

          {/* Login Form */}
          <form className="w-full max-w-md space-y-4">
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              fullWidth
              variant="outlined"
              size="small"
            />

            {/* Error message */}
            {errorMessage && (
              <Typography color="error" variant="body2">
                {errorMessage}
              </Typography>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
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
            <Button
              onClick={handleLogin}
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
