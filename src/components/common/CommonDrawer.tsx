import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer } from "../features/drawerSlice";
import Drawer from "@mui/material/Drawer"; // Material-UI Drawer
import { RootState } from "../redux/store";

const CommonDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.drawer.isOpen);

  const handleClose = () => {
    dispatch(closeDrawer());
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={handleClose}>
      <div style={{ width: "calc(100vw - 250px)" }}>
        <div className="p-4 border-b">
          <h2 className="text-heading">Add new team member</h2>
        </div>

        <div className="p-4 w-[50%] mx-auto">
          <p className="text-center text-title my-4">Invite memeber</p>
        </div>
      </div>
    </Drawer>
  );
};

export default CommonDrawer;
