import { useRef, useState } from "react";
import {
  Stepper,
  Step,
  Button,
  TextField,
  StepLabel,
  Box,
} from "@mui/material";
import "react-quill/dist/quill.snow.css";
import {
  generateRequirement,
  UpsertBenchDetail,
  upsetAvatar,
} from "../../../../components/sharedService/apiService";
import BenchPreview, { BenchPreviewHandles } from "./BenchPreview";
import {
  closeBackdrop,
  closeDrawer,
  openBackdrop,
} from "../../../../components/features/drawerSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../components/redux/store";
import configData from "../../../sharedService/config";
import SuccessDialog from "../../../../components/sharedComponents/SuccessDialog";
import { DownloadOutlined, PictureAsPdfOutlined } from "@mui/icons-material";
import UploadLogo from "../../../../components/sharedComponents/UploadLogo";

interface AddAIBenchProps {
  handleGetBenchDetail?: () => void;
}

const AddAIBench: React.FC<AddAIBenchProps> = ({ handleGetBenchDetail }) => {
  const benchRef = useRef<BenchPreviewHandles>(null);

  const handlePDF = () => {
    benchRef.current?.downloadPDF();
  };

  const handleDOCX = () => {
    benchRef.current?.handleDownloadDocx();
  };

  const fetchChildData = () => {
    if (benchRef.current) {
      const dataFromChild = benchRef.current.getBenchData();
      setBenchData(dataFromChild);
      handleSubmit();
    }
  };

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const dispatch: AppDispatch = useDispatch();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [cvText, setCvText] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isSuccessPopup, setIsSuccessPopup] = useState<boolean>(false);
  const [benchData, setBenchData] = useState<any>({});
  const [benchId, setBenchId] = useState<any>(0);
  const [Image, setImage] = useState<any>({});

  const steps = ["Paste CV", "Preview", "Photo Upload"];

  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCvText("");
    setCvFile(null);
  };

  const handleSubmit = () => {
    const payload = {
      id: benchId,
      firstName: benchData.profile?.name ?? "",
      lastName: "",
      title: benchData.profile?.title ?? "",
      email: benchData.contact_details?.email ?? "",
      cv: benchData,
      availability: 1,
      orgCode: userData.orgCode,
      userId: userData.userId,
    };

    dispatch(openBackdrop());
    UpsertBenchDetail(payload)
      .then((result: any) => {
        if (result.success) {
          setBenchId(result.content);
          setTimeout(() => {
            dispatch(closeBackdrop());
            handleNext();
          }, 1000);
        } else {
          setTimeout(() => {
            dispatch(closeBackdrop());
          }, 1000);
        }
      })
      .catch((error: any) => {
        setTimeout(() => {
          dispatch(closeBackdrop());
        }, 1000);
      });
  };

  const handlePreview = () => {
    const payload = {
      promptCode: configData.BenchPromtCode,
      loginUserId: userData?.userId,
      promptJson: cvText,
    };
    dispatch(openBackdrop());
    generateRequirement(payload)
      .then((result: any) => {
        if (result && !!result) {
          setBenchData(result);
          handleNext();
        }
        setTimeout(() => {
          dispatch(closeBackdrop());
        }, 1000);
      })
      .catch((error: any) => {
        setTimeout(() => {
          dispatch(closeBackdrop());
        }, 1000);
      });
  };

  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };

  const handleUploadPhoto = () => {
    if (Object.keys(Image).length > 0) {
      const payload = {
        benchId: benchId,
        logoURL: Image,
      };
      dispatch(openBackdrop());
      upsetAvatar(payload).then((result: any) => {
        if (result) {
          setIsSuccessPopup(true);
          setTimeout(() => {
            dispatch(closeBackdrop());
            handleCloseDrawer();
          }, 1000);
        }
      });
    } else {
      setIsSuccessPopup(true);
      setTimeout(() => {
        setIsSuccessPopup(false);
        handleCloseDrawer();
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col my-auto">
      <div className="w-[calc(100vw-250px)] h-full">
        <div className="flex content-header justify-between items-center border-b">
          <div className="px-8 py-2 flex">
            <svg
              className="absolute cursor-pointer left-[8px] top-[11px]"
              onClick={handleCloseDrawer}
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
            <h2 className="text-heading">Add Bench</h2>
          </div>
          <div>
            {benchData && Object.keys(benchData)?.length > 0 && (
              <>
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
              </>
            )}
          </div>
        </div>

        <div className="p-4 w-full mx-auto h-[calc(100vh-90px)] overflow-auto">
          <Box className="w-full h-full">
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepLabel
                      sx={{
                        "& .MuiStepLabel-label": { fontSize: "14px" },
                        "& .MuiStepIcon-root": {
                          height: "18px",
                          width: "18px",
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            <div className="mt-4">
              {activeStep === 0 && (
                <div className="flex flex-col space-y-4">
                  <TextField
                    multiline
                    rows={16}
                    minRows={10}
                    variant="outlined"
                    label="CV Data"
                    value={cvText}
                    onChange={(e) => setCvText(e.target.value)}
                    className="w-full"
                  />
                </div>
              )}

              {activeStep === 1 && (
                <BenchPreview
                  benchData={benchData}
                  ref={benchRef}
                  setBenchData={setBenchData}
                />
              )}

              {activeStep === 2 && (
                <div className="flex h-[calc(100vh-150px)] items-center justify-center flex-col">
                  <h3 className="mb-3">Upload Profile Photo</h3>
                  <UploadLogo
                    title="Upload Photo"
                    fileSize="128 x 128"
                    iconType="image"
                    onUpload={(file: any) => setImage(file)}
                    file={Image}
                  />
                </div>
              )}
            </div>
          </Box>
        </div>
        <div
          className={`flex space-x-2 border-t px-4 py-2 ${activeStep === 0 ? "justify-end" : "justify-between"
            }`}
        >
          {activeStep !== 0 && (
            <Button
              variant="outlined"
              onClick={handleBack}
              className="text-blue-500 border-blue-500 hover:bg-blue-50"
            >
              Back
            </Button>
          )}

          {activeStep === 2 && (
            <Button
              variant="contained"
              onClick={handleUploadPhoto}
              // onClick={fetchChildData}
              className="bg-green-500 hover:bg-green-600"
              loading={isLoader}
            >
              Upload
            </Button>
          )}
          {activeStep === 1 && (
            <Button
              variant="contained"
              // onClick={handleSubmit}
              onClick={fetchChildData}
              className="bg-green-500 hover:bg-green-600"
              loading={isLoader}
            >
              Submit CV
            </Button>
          )}
          {activeStep === 0 && (
            <Button
              variant="contained"
              onClick={handlePreview}
              disabled={!cvText}
              loading={isLoader}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Preview
            </Button>
          )}
        </div>
      </div>
      {isSuccessPopup && (
        <SuccessDialog
          title="AI Bench added successfully"
          isOpenModal={isSuccessPopup}
          setIsOpenModal={setIsSuccessPopup}
        />
      )}
    </div>
  );
};

export default AddAIBench;
