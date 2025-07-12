import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer } from "../features/drawerSlice";
import Drawer from "@mui/material/Drawer"; // Material-UI Drawer
import { RootState } from "../redux/store";
import AddNewMemberForm from "./AddNewMemberForm";
import BenchPreview, {
  BenchPreviewHandles,
} from "../pages/vendor/bench/BenchPreview";
import OrganizationProfileUpdate from "../pages/settings/OrganizationProfileUpdate";
import { Button } from "@mui/material";
import { DownloadOutlined, PictureAsPdfOutlined } from "@mui/icons-material";
import VndBench from "../pages/vendor/bench/VndBench";
import CreateClientForm from "../pages/company/clients/CreateClientForm";
import RequirementForm from "../pages/company/requirements/RequirementForm";
import AddAIBench from "../pages/vendor/bench/AddAIBench";
import MatchingPositions from "../pages/vendor/bench/MatchingPositions";
import MatchingCandidates from "../pages/vendor/requirements/MatchingCandidates";
import RequirementUpdate from "../pages/company/requirements/RequirementUpdate";

interface CommonDrawerProps {
  name: string; // Unique name for the drawer
  children?: React.ReactNode; // Drawer content
}

const CommonDrawer: React.FC<CommonDrawerProps> = ({ name, children }) => {
  const benchRef = useRef<BenchPreviewHandles>(null);

  const dispatch = useDispatch();
  const { isOpen, currentDrawer, drawerData } = useSelector(
    (state: RootState) => state.drawer
  );

  const handleClose = () => {
    dispatch(closeDrawer());
  };

  const handlePDF = () => {
    benchRef.current?.downloadPDF();
  };

  const handleDOCX = () => {
    benchRef.current?.handleDownloadDocx();
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen && currentDrawer === name}
      onClose={handleClose}
      className="relative"
    >
      <div className="h-full w-[calc(100vw-250px)] relative">
        {/* <div className="-left-2 bg-red-700 absolute">
          <Tooltip title="Close">
            <IconButton size="small" onClick={() => dispatch(closeDrawer())}>
              <CloseOutlined fontSize="small" color="action" />
            </IconButton>
          </Tooltip>
        </div> */}

        {(currentDrawer === "UpdateDetails" ||
          currentDrawer === "InviteNewMember") && (
          <AddNewMemberForm
            isEditable={currentDrawer === "UpdateDetails" ? true : false}
            data={drawerData}
          />
        )}
        {currentDrawer === "benchPreview" && (
          <>
            <div className="flex content-header border-b flex justify-between items-center">
              <div className="px-8 py-2 flex">
                <svg
                  className="absolute cursor-pointer left-[8px] top-[11px]"
                  onClick={handleClose}
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 20L4 4.00003M20 4L4.00002 20"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <h2 className="text-heading">Bench Preview</h2>
              </div>
              <div>
                <Button
                  startIcon={<PictureAsPdfOutlined fontSize="inherit" />}
                  onClick={handlePDF}
                >
                  Download Pdf
                </Button>
                <Button
                  startIcon={<DownloadOutlined fontSize="inherit" />}
                  onClick={handleDOCX}
                >
                  Download Doc
                </Button>
              </div>
            </div>
            <div className="p-4 w-full mx-auto h-[calc(100vh-38px)] overflow-auto">
              <BenchPreview benchData={drawerData} ref={benchRef} />
            </div>
          </>
        )}
        {currentDrawer === "benchList" && <VndBench />}
        {currentDrawer === "OrgProfileUpdate" && <OrganizationProfileUpdate />}
        {currentDrawer === "AddClient" && <CreateClientForm />}
        {currentDrawer === "CmpPostRequirement" && <RequirementForm />}
        {currentDrawer === "CmpUpdateRequirement" && (
          <RequirementUpdate requirementData={drawerData} />
        )}
        {currentDrawer === "AddAIBench" && <AddAIBench />}
        {currentDrawer === "MatchingPositions" && (
          <MatchingPositions benchDrawerData={drawerData} />
        )}
        {currentDrawer === "MatchingCandidates" && (
          <MatchingCandidates drawerData={drawerData} />
        )}
      </div>
    </Drawer>
  );
};

export default CommonDrawer;
