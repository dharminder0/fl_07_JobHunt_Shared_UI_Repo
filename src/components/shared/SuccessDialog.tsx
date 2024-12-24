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

  return (
    <div>
      <Dialog
        open={isOpenModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title" className="!text-heading">
            {title}
          </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="min-w-[400px] max-w-[600px]">
              <div className="flex items-center text-title mb-1">
                <CheckCircleOutlineOutlined
                  className="text-green-500"
                  fontSize="large"
                />
                <p className="text-base ms-1">Success</p>
              </div>
            </div>
          </DialogContentText>
          <DialogActions className="!mt-4">
            <Button onClick={handleClose} variant="outlined" autoFocus>
              Close
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
