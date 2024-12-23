import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Slider from "./slider";

export default function SignUp() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = React.useState(false);

    const handleSignup = () => {
      if (companyName && email && password) {
        // Save user details to localStorage
        localStorage.setItem("companyName", companyName);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("isLoggedIn", "true");

        setErrorMessage("");
        setOpen(true);
      } else {
        setErrorMessage("Please fill in all the fields.");
      }
    };

    const handleClose = () => {
      setOpen(false);
      navigate("/onboard");
    };

    return (
      <div className="bg-white">
        <div className="container flex h-screen">
          {/* Left Section */}
          <div className="w-1/2 bg-white my-auto flex flex-col justify-end px-16">  
          <div>
        <Slider />
          </div>
            {/* <div className="bg-white p-4 w-40">
              <img
                src={"/assets/images/bar.png"}
                alt="JobHunty Logo"
                className="h-8 w-auto mb-4"
              />
              <h2 className="font-bold text-title">10K+</h2>
              <p className="text-gray-600 text-base">People got hired</p>
            </div> */}
            {/* <div className="self-center">
              <img
                src={"/assets/images/banner-person.png"}
                alt="JobHunty Logo"
                className="w-[60%]"
              />
            </div> */}
          </div>
          <div className="w-1/2 mx-auto flex flex-col justify-center items-center px-16">
            <div className="w-full max-w-md mb-8">
              <h1 className="text-heading text-gray-700">
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
                size="small"
              />
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
                fullWidth
                variant="outlined"
                size="small"
              />

              {/* Error message */}
              {errorMessage && (
                <p className="text-info text-red-500">{errorMessage}</p>
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

          <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" className="!text-heading">
              {"Registration sucessful"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                className="!text-base"
              >
                Please check you given email({email}) to onboard you
                company/vendor and activate your account.
              </DialogContentText>
              <DialogActions className="!mt-4">
                <Button onClick={handleClose} variant="outlined" autoFocus>
                  Continue
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
