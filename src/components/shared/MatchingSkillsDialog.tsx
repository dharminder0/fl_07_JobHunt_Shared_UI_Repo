import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { CircularProgressWithLabel } from "./CircularProgressWithLabel";
import {
  CancelOutlined,
  CheckCircleOutlineOutlined,
} from "@mui/icons-material";

export default function MatchingSkillsDialog({
  title = "",
  isMatchOpen = false,
  setIsMatchOpen = (value: boolean) => {},
  aiScore = 0,
}: any) {
  const handleClose = () => {
    setIsMatchOpen(false);
  };

  return (
    <div>
      <Dialog
        open={isMatchOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title" className="!text-heading">
          {title}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="min-w-[400px] max-w-[600px]">
              <CircularProgressWithLabel value={aiScore} />

              <h5 className="text-title my-2 font-bold">SKill Analysis</h5>

              <div className="flex items-center text-title mb-1">
                <CheckCircleOutlineOutlined
                  className="text-green-500"
                  fontSize="small"
                />
                <p className="text-base ms-1">
                  Java, React, Python, REST APIs.
                </p>
              </div>

              <div className="flex items-center text-title mb-1">
                <CancelOutlined className="text-red-500" fontSize="small" />
                <p className="text-base ms-1">AWS, Docker, Kubernetes.</p>
              </div>

              <h5 className="text-title my-2 font-bold">Experience</h5>
              <div className="flex items-center text-title mb-1">
                <CancelOutlined className="text-orange-500" fontSize="small" />
                <p className="text-base ms-1">
                  Job requires 5+ years; candidate has 4 years (slight gap).
                </p>
              </div>

              <h5 className="text-title my-2 font-bold">Education</h5>

              <div className="flex items-center text-title mb-1">
                <CheckCircleOutlineOutlined
                  className="text-green-500"
                  fontSize="small"
                />
                <p className="text-base ms-1">
                  Job requires a Bachelor's in CS; candidate has a Bachelor's in
                  IT (closely aligned).
                </p>
              </div>

              <h5 className="text-title my-2 font-bold">Summary</h5>

              <div className="flex items-center text-title mb-1">
                <CheckCircleOutlineOutlined
                  className="text-green-500"
                  fontSize="small"
                />
                <p className="text-base ms-1">
                  Strong in programming languages and APIs.
                </p>
              </div>

              <div className="flex items-center text-title mb-1">
                <CancelOutlined className="text-orange-500" fontSize="small" />
                <p className="text-base ms-1">
                  Missing cloud-related skills like AWS and containerization
                  experience.
                </p>
              </div>
            </div>
          </DialogContentText>
          <DialogActions className="!mt-4">
            <Button onClick={handleClose} variant="outlined" autoFocus>
              Close
            </Button>
            {/* <Button onClick={handleClose} variant="contained" autoFocus>
              Update
            </Button> */}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
