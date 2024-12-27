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

export default function StatusDialog({
  title = "",
  isDialogOpen = false,
  setIsDialogOpen = (value: boolean) => {},
  statusData = [],
  selectedStatus = "",
  isVendor = false,
}: any) {
  const currentStep = statusData.indexOf(selectedStatus);
  const reachedStatuses = statusData.slice(0, currentStep + 1);
  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
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
                    row
                    name="Status"
                    // value={formData.postType}
                    // onChange={handleChange}
                    className="!flex !flex-col"
                  >
                    {statusData.length > 0 &&
                      statusData.map((item: any) => (
                        <FormControlLabel
                          value={item}
                          key={item}
                          control={<Radio size="small" />}
                          label={item}
                          checked={item === selectedStatus}
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
                <Stepper
                  activeStep={currentStep}
                  orientation="vertical"
                  sx={{
                    "& .MuiStepConnector-line": {
                      borderColor: "#D1D5DB", // Tailwind `gray-300`
                      minHeight: "14px",
                    },
                    "& .MuiStepConnector-root": {
                      marginLeft: "6px",
                    },
                    "& .MuiStepLabel-root": {
                      padding: "3px 0",
                    },
                    "& .MuiStepIcon-root": {
                      height: 14,
                      width: 14,
                    },
                  }}
                >
                  {reachedStatuses.map((status: any, index: any) => (
                    <Step key={status}>
                      <StepLabel
                        sx={{
                          "& .MuiStepLabel-label": {
                            color: index <= currentStep ? "#1D4ED8" : "#6B7280", // Tailwind `blue-700` or `gray-500`
                            fontSize: 12,
                          },
                        }}
                      >
                        {status}
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
                  // value={formData.description}
                  // onChange={handleChange}
                  fullWidth
                  multiline
                  rows={6}
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
              <Button onClick={handleClose} variant="contained" autoFocus>
                Update
              </Button>
            )}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
