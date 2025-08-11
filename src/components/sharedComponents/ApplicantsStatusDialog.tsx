import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  getApplicantsStatusHistory,
  updateApplicantsStatus,
  updateRequirementStatus,
  upsertApplications,
} from "../sharedService/apiService";
import SuccessDialog from "./SuccessDialog";
import Loader from "./Loader";
import { InfoOutlined } from "@mui/icons-material";
import { ApplicationEnums } from "../sharedService/enums";

export default function ApplicantsStatusDialog({
  title = "",
  isDialogOpen = false,
  setIsDialogOpen = (value: boolean) => {},
  statusData = [],
  selectedStatus = "",
  onStatusChange = (newStatus: string) => {},
  isVendor = false,
  selectedRow = {},
  onFinish = () => {},
}: any) {
  // Local state to manage selected status before confirmation
  const [localStatus, setLocalStatus] = useState(selectedStatus);
  const [comment, setComment] = useState<any>("");
  const [isSuccessPopup, setIsSuccessPopup] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [history, setHistory] = useState<any>([]);

  useEffect(() => {
    setHistory([]);
    setComment("");
    setLocalStatus(selectedStatus);
    if (selectedRow?.applicationId) {
      getStatusHistory();
    }
  }, [selectedRow]);

  // Find the index of the selected status
  const currentStep = statusData.findIndex(
    (status: any) => status.name === localStatus
  );
  // const reachedStatuses = statusData.slice(0, currentStep + 1);

  const selectedId =
    statusData.find(
      (status: any) =>
        status.name === localStatus || status.value === localStatus
    )?.id ?? null;

  console.log(selectedId);

  // Handle status change
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalStatus(event.target.value);
  };

  // Handle dialog close
  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const getStatusHistory = () => {
    setIsLoader(true);
    getApplicantsStatusHistory(selectedRow?.applicationId)
      .then((result: any) => {
        if (result && result?.length > 0) {
          setHistory(result);
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

  const lastHistoryId = history[history.length - 1]?.status;

  // Find index of last status in ApplicantsStatus
  const lastHistoryIndex = statusData.findIndex(
    (s: any) => s.id === lastHistoryId
  );

  const handleUpdate = () => {
    const payload = {
      applicantId: selectedRow?.applicationId,
      status: selectedId,
      changedBy: selectedRow?.orgCode,
      comment: comment,
    };
    updateApplicantsStatus(payload)
      .then((result: any) => {
        if (result) {
          setIsSuccessPopup(true);
          onFinish();
        }
      })
      .catch((error: any) => {
        setIsSuccessPopup(false);
      });

    onStatusChange(localStatus);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Dialog
        open={isDialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="!text-heading">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="!text-base"
          >
            <div className="flex min-w-[400px] max-w-[600px]">
              {!isVendor && (
                <div className="min-w-[250px] max-w-[350px]">
                  <RadioGroup
                    name="Status"
                    value={localStatus}
                    onChange={handleStatusChange}
                    className="!flex !flex-col"
                  >
                    {statusData.map((item: any, index: any) => (
                      <FormControlLabel
                        key={item.id}
                        value={item.name}
                        control={<Radio size="small" />}
                        label={item.name}
                        checked={item.name === localStatus}
                        disabled={index < lastHistoryIndex}
                        sx={{
                          "& .MuiRadio-root": {
                            padding: "5px",
                          },
                        }}
                      />
                    ))}
                  </RadioGroup>
                </div>
              )}
              <div
                className={`min-w-[250px] max-w-[350px] px-4 ${
                  !isVendor ? "border-s" : ""
                }`}
              >
                <Stepper activeStep={currentStep} orientation="vertical">
                  {history &&
                    history?.length > 0 &&
                    history.map((status: any, index: number) => (
                      <Step key={status.status}>
                        <StepLabel
                          sx={{
                            "& .MuiStepLabel-label": {
                              // color:
                              //   index <= currentStep ? "#1D4ED8" : "#6B7280", // Tailwind `blue-700` or `gray-500`
                              fontSize: 12,
                            },
                          }}
                        >
                          <div className="flex items-center">
                            {status.statusName}
                            <Tooltip
                              title={status.comment}
                              arrow
                              className="ms-2 cursor-pointer"
                            >
                              <InfoOutlined fontSize="inherit" />
                            </Tooltip>
                          </div>
                          <p className="truncate text-info">{status.comment}</p>
                        </StepLabel>
                      </Step>
                    ))}
                  {history?.length <= 0 && isLoader ? (
                    <div className="flex justify-center items-center">
                      <CircularProgress
                        size={18}
                        className="!text-indigo-500"
                      />
                    </div>
                  ) : (
                    history?.length <= 0 && (
                      <p>Application history not created</p>
                    )
                  )}
                </Stepper>
              </div>
            </div>
            {!isVendor && (
              <div className="w-full">
                <TextField
                  label="Comments"
                  name="Comments"
                  fullWidth
                  multiline
                  rows={6}
                  value={comment}
                  onChange={(e: any) => setComment(e.target.value)}
                  className="!mt-3"
                  size="small"
                />
              </div>
            )}
          </DialogContentText>
          <DialogActions className="!mt-4">
            <Button onClick={handleClose} variant="outlined" autoFocus>
              {!isVendor ? "Cancel" : "Close"}
            </Button>
            {!isVendor && (
              <Button onClick={handleUpdate} variant="contained" autoFocus>
                Update
              </Button>
            )}
          </DialogActions>
        </DialogContent>
      </Dialog>

      {isSuccessPopup && (
        <SuccessDialog
          title="Status updated successfully"
          isOpenModal={isSuccessPopup}
          setIsOpenModal={setIsSuccessPopup}
        />
      )}
    </>
  );
}
