import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer } from "../features/drawerSlice";
import Drawer from "@mui/material/Drawer"; // Material-UI Drawer
import { RootState } from "../redux/store";
import AddNewMemberForm from "./AddNewMemberForm";
import { Button } from "@mui/material";
import BenchPreview from "../pages/vendor/bench/BenchPreview";
import OrganizationProfileUpdate from "../pages/settings/OrganizationProfileUpdate";

interface CommonDrawerProps {
  name: string; // Unique name for the drawer
  children?: React.ReactNode; // Drawer content
}

const CommonDrawer: React.FC<CommonDrawerProps> = ({ name, children }) => {
  const dispatch = useDispatch();
  const { isOpen, currentDrawer } = useSelector(
    (state: RootState) => state.drawer
  );

  const handleClose = () => {
    dispatch(closeDrawer());
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen && currentDrawer === name}
      onClose={handleClose}
    >
      <div className="h-full w-[calc(100vw-250px)]">
        {(currentDrawer === "UpdateDetails" ||
          currentDrawer === "InviteNewMember") && (
          <AddNewMemberForm
            isEditable={currentDrawer === "UpdateDetails" ? true : false}
          />
        )}
        {currentDrawer === "benchPreview" && <BenchPreview />}
        {currentDrawer === "OrgProfileUpdate" && <OrganizationProfileUpdate />}
      </div>
    </Drawer>
  );
};

export default CommonDrawer;
