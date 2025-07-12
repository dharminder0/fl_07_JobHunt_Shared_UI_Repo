import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  closeBackdrop,
  openBackdrop,
  setBackdrop,
} from "../features/drawerSlice";

export default function BackDropLoader() {
  const dispatch: AppDispatch = useDispatch();
  const isBackdropOpen = useSelector(
    (state: RootState) => state.drawer.isBackdropOpen
  );

  const handleClose = () => {
    dispatch(closeBackdrop());
  };
  const handleOpen = () => {
    dispatch(openBackdrop());
  };

  const toggleBackdrop = () => {
    dispatch(setBackdrop(!isBackdropOpen));
  };

  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isBackdropOpen}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
