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
            {/* <DialogTitle id="alert-dialog-title" className="!text-heading">
              {"Registration Successful!"}
            </DialogTitle> */}
            <DialogContent>
              <DialogContentText id="alert-dialog-description" className="!text-base">
                <div className="flex flex-col gap-4 ">
                  <div className="flex text-heading font-bold justify-center">
                    Registration Successful!
                  </div>
                  <div className="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 84 84" fill="none">
                      <path d="M29 33.3337L43.118 43.9243C43.9927 44.5803 45.0829 44.8814 46.1703 44.7673C47.2576 44.6532 48.2616 44.1323 48.981 43.309L76.6667 11.667" stroke="#3CCE4B" stroke-width="5" stroke-linecap="round" />
                      <path d="M81 42.0003C81.0002 50.1492 78.4477 58.0935 73.7012 64.7174C68.9547 71.3413 62.2525 76.312 54.536 78.9313C46.8195 81.5507 38.4763 81.6871 30.6783 79.3215C22.8803 76.9558 16.0192 72.207 11.0586 65.7418C6.098 59.2767 3.28715 51.4201 3.02084 43.2755C2.75453 35.1309 5.04612 27.1075 9.57377 20.3321C14.1014 13.5568 20.6377 8.36982 28.2645 5.49981C35.8913 2.62981 44.2256 2.22093 52.0967 4.33061" stroke="#3CCE4B" stroke-width="5" stroke-linecap="round" />
                    </svg>
                  </div>
                  <div >
                    You're almost there. Please check your email ({email}) inbox for a verification link to complete your registration.
                    Make sure to verify your email to access all features of the platform.
                  </div>
                </div>
              </DialogContentText>
              <DialogActions>
                <Button onClick={handleClose} variant="outlined" autoFocus>
                  Got it
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
