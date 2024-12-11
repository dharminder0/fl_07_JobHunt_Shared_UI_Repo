import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = () => {
    if (companyName && email && password) {
      // Save user details to localStorage
      localStorage.setItem("companyName", companyName);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("isLoggedIn", "true");

      setErrorMessage("");
      alert("Account created successfully!");

      // Redirect to home page after signup
      navigate("/login");
    } else {
      setErrorMessage("Please fill in all the fields.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-2/5 bg-gray-50 flex flex-col justify-end px-16">
        <div className="mb-8 bg-white p-4 w-40">
          <img src={require('../../assets/images/bar.png')} alt="JobHunty Logo" className="h-8 w-auto mb-4" />
          <h2 className="font-bold text-xl">10K+</h2>
          <p className="text-gray-600 font-medium">People got hired</p>
        </div>
        <div className="self-center">
          <img src={require('../../assets/images/banner-person.png')} alt="JobHunty Logo" className="w-auto" />
        </div>
      </div>
      <div className="w-3/5 mx-auto flex flex-col justify-center items-center px-16">
        <div className="w-full max-w-md mb-8">
          <h1 className="text-4xl font-bold font-display text-gray-700 mb-4">
            Get more opportunities
          </h1>
        </div>

        {/* Signup Form */}
        <form className="w-full max-w-md space-y-4">
          <TextField
            label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            fullWidth
            variant="outlined"
          />
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

          <Button
            onClick={handleSignup}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Continue
          </Button>
        </form>

        <p className="text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
        <p className="text-sm text-gray-500 mt-4">
          By clicking 'Continue', you acknowledge that you have read and accept
          the Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
