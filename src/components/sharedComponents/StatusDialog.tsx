import {
  Button,
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
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  updateRequirementStatus,
  upsertApplications,
} from "../sharedService/apiService";
import SuccessDialog from "./SuccessDialog";

export default function StatusDialog({
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

  useEffect(() => {
    setLocalStatus(selectedStatus);
  }, [selectedStatus]);

  useEffect(() => {
    setComment(!selectedRow?.comment ? "" : selectedRow?.comment);
  }, [selectedRow?.comment]);

  // Find the index of the selected status
  const currentStep = statusData.findIndex(
    (status: any) => status.name === localStatus
  );
  const reachedStatuses = statusData.slice(0, currentStep + 1);

  // Handle status change
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalStatus(event.target.value);
  };

  // Handle dialog close
  const handleClose = () => {
    setIsDialogOpen(false);
  };

  // Confirm status change
  const handleUpdate = () => {
    const status = statusData.find(
      (item: any) => item.name === localStatus || item.value === localStatus
    );
    if (title.includes("Requirement")) {
      updateRequirementStatus(selectedRow?.requirementId, status.id)
        .then((result: any) => {
          if (result && result.success) {
            setIsSuccessPopup(true);
            onFinish();
          }
        })
        .catch((error: any) => {
          setIsSuccessPopup(false);
        });
    }
    if (title.includes("Applicant")) {
      const payload = { ...selectedRow, status: status?.id, comment: comment };
      upsertApplications(payload)
        .then((result: any) => {
          if (result.success) {
            setIsSuccessPopup(true);
            onFinish();
          }
        })
        .catch((error: any) => {
          setIsSuccessPopup(false);
        });
    }
    onStatusChange(localStatus); // Notify parent of the new status
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
                    {statusData.map((item: any) => (
                      <FormControlLabel
                        key={item.id}
                        value={item.name}
                        control={<Radio size="small" />}
                        label={item.name}
                        checked={item.name === localStatus}
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
                  {reachedStatuses.map((status: any, index: number) => (
                    <Step key={status.id}>
                      <StepLabel
                        sx={{
                          "& .MuiStepLabel-label": {
                            color: index <= currentStep ? "#1D4ED8" : "#6B7280", // Tailwind `blue-700` or `gray-500`
                            fontSize: 12,
                          },
                        }}
                      >
                        {status.name}
                      </StepLabel>
                    </Step>
                  ))}
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
