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
      localStorage.setItem("activeRole", user.role[0]);
      localStorage.setItem(
        "companyType",
        user.role[0] === "company" ? "client" : "vendor"
      );

      setErrorMessage(""); // Clear error message

      // Redirect based on role
      redirectBasedOnRole(user.role);
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  const redirectBasedOnRole = (roles: string[]) => {
    const activeRole = localStorage.getItem("activeRole") || "";
    if (roles.includes(activeRole)) {
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
