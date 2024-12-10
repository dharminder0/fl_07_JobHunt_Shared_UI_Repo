import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import bannerPerson from "../../assets/images/banner-person.png";
import bar from "../../assets/images/bar.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Password } from "@mui/icons-material";

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
    role: ['company']
  };

  const credList:any[] = [
    {
      email: "admin@fleek.com",
      password: "Admin",
      role: ['company']
    },
    {
      email: "vendor@fleek.com",
      password: "vendor",
      role: ['vendor']
    }
  ]

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/onboard");
    }
  }, []);

  const handleLogin = () => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (storedEmail && storedPassword) {
      // Check if provided email/password match stored credentials
      if (email === storedEmail && password === storedPassword) {
        localStorage.setItem("isLoggedIn", "true");
        setErrorMessage(""); // Clear any previous errors
        navigate("/onboard");
        return;
      }
    }

    // Compare provided email/password with hardcoded creds
    if (email === creds.email && password === creds.password) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("isLoggedIn", "true");

      setErrorMessage(""); // Clear any previous errors
      navigate("/");
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-2/5 bg-gray-50 flex flex-col justify-end px-16">
        <div className="mb-8 bg-white p-4 w-40">
          <img src={bar} alt="JobHunty Logo" className="h-8 w-auto mb-4" />
          <h2 className="font-bold text-xl">10K+</h2>
          <p className="text-gray-600 font-medium">People got hired</p>
        </div>
        <div className="self-center">
          <img src={bannerPerson} alt="JobHunty Logo" className="w-auto" />
        </div>
      </div>

      <div className="w-3/5 mx-auto flex flex-col justify-center items-center px-16">
        <div className="w-full max-w-md mb-8">
          <h1 className="text-4xl font-bold font-display text-gray-700 mb-4">
            Welcome Back, Dude
          </h1>
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
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            variant="outlined"
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
              />
            }
            label="Remember me"
            className="text-sm"
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

        <p className="text-sm text-gray-500 mt-4">
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
  );
}
