import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";

export default function SuccessDialog({
  isOpenModal = false,
  setIsOpenModal = (value: boolean) => {},
}: any) {
  const handleClose = () => {
    setIsOpenModal(false);
  };

  setTimeout(() => {
    handleClose();
  }, 3000);

  return (
    <div>
      <Dialog
        open={isOpenModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="min-w-[400px] max-w-[600px]">
              <div className="text-title mb-1 text-center">
                <CheckCircleOutlineOutlined
                  className="text-green-500"
                  fontSize="large"
                />
                <p className="text-title font-bold mt-4">
                  Application has been submitted successfully
                </p>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
