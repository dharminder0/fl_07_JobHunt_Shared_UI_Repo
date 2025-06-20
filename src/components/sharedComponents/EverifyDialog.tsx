import { useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Snackbar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { resendEVerify } from "../sharedService/apiService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { closeEVerifyDialog } from "../features/drawerSlice";

function EverifyDialog() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const isOpen = useSelector(
    (state: RootState) => state.drawer.isEVerifyDialogOpen
  );

  const handleResendEVerify = () => {
    setIsLoader(true);
    resendEVerify(userData?.email)
      .then((result: any) => {
        if (result.success) {
          setOpen(true);
        }
        setTimeout(() => {
          setIsLoader(false);
        }, 1000);
      })
      .catch((error: any) => {
        setTimeout(() => {
          setIsLoader(false);
        }, 1000);
      });
  };

  const handleLogin = () => {
    setOpen(false);
    dispatch(closeEVerifyDialog());
    navigate("/login");
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(closeEVerifyDialog());
  };

  return (
    <>
      <div>
        <Dialog
          open={isOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              className="!text-base"
            >
              <div className="flex flex-col gap-4 ">
                <div className="flex text-heading font-bold justify-center">
                  Registration Successful!
                </div>
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 84 84"
                    fill="none"
                  >
                    <path
                      d="M29 33.3337L43.118 43.9243C43.9927 44.5803 45.0829 44.8814 46.1703 44.7673C47.2576 44.6532 48.2616 44.1323 48.981 43.309L76.6667 11.667"
                      stroke="#3CCE4B"
                      stroke-width="5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M81 42.0003C81.0002 50.1492 78.4477 58.0935 73.7012 64.7174C68.9547 71.3413 62.2525 76.312 54.536 78.9313C46.8195 81.5507 38.4763 81.6871 30.6783 79.3215C22.8803 76.9558 16.0192 72.207 11.0586 65.7418C6.098 59.2767 3.28715 51.4201 3.02084 43.2755C2.75453 35.1309 5.04612 27.1075 9.57377 20.3321C14.1014 13.5568 20.6377 8.36982 28.2645 5.49981C35.8913 2.62981 44.2256 2.22093 52.0967 4.33061"
                      stroke="#3CCE4B"
                      stroke-width="5"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <div className="text-secondary-text">
                  You're almost there! A verification link has been sent to{" "}
                  <b>{userData?.email}</b>. Please check your inbox (and spam
                  folder) to complete your registration.
                </div>
              </div>
            </DialogContentText>
            <div className="flex mt-5 text-base justify-between text-secondary-text">
              <p>
                Already verified?{" "}
                <Link
                  to={""}
                  onClick={handleLogin}
                  className="text-indigo-500 hover:text-indigo-700"
                >
                  Log in
                </Link>
              </p>
              <p>
                Didn't receive the email?{" "}
                <Link
                  to={""}
                  onClick={handleResendEVerify}
                  className="text-indigo-500 hover:text-indigo-700"
                >
                  {isLoader && (
                    <CircularProgress
                      size={10}
                      className="mx-1 !text-indigo-500"
                    />
                  )}
                  Resend Verification
                </Link>
              </p>
            </div>
            <DialogActions>
              {/* <Button
                onClick={handleResendEVerify}
                variant="outlined"
                autoFocus
                loading={isLoader}
              >
                Resend
              </Button> */}
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Email send Successfully!!
        </Alert>
      </Snackbar>
    </>
  );
}

export default EverifyDialog;
