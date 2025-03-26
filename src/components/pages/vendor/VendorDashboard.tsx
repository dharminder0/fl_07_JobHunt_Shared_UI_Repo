import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import JobStatistics from "../../sharedComponents/JobStatistics";
import { useNavigate } from "react-router-dom";
import { getVndDashboardReqCounts } from "../../../components/sharedService/apiService";
import { RequirementsStatus } from "../../../components/sharedService/enums";

interface VendorDashboard {}

const applicantItems = [
  {
    logo: "https://www.teleperformance.com/css/assets/favicon.ico",
    label: "Teleperformance",
    value: 21,
    color: "bg-purple-500",
  },
  {
    logo: "https://d1rz4ui464s6g7.cloudfront.net/wp-content/uploads/2024/05/20122313/kpit-favicon.png",
    label: "KPIT Technologiess",
    value: 17,
    color: "bg-green-500",
  },
  {
    logo: "https://www.mphasis.com/content/dam/mphasis-com/common/icons/favicon.ico",
    label: "Mphasis",
    value: 18,
    color: "bg-blue-500",
  },
  {
    logo: "https://www.fisglobal.com/-/media/fisglobal/images/Main/logos/FISfavicons/favicon-192x192.png",
    label: "Fidelity Information Services",
    value: 16,
    color: "bg-yellow-500",
  },
  {
    logo: "https://careers.coforge.com/coforge/favicon.ico",
    label: "Coforge",
    value: 21,
    color: "bg-red-500",
  },
];

const hotTech = [
  {
    logo: "https://reactnative.dev/img/header_logo.svg",
    label: "React Native",
    value: 35,
    color: "bg-purple-500",
  },
  {
    logo: "https://angular.dev/assets/icons/favicon-48x48.png",
    label: "Angular",
    value: 27,
    color: "bg-green-500",
  },
  {
    logo: "https://www.gstatic.com/devrel-devsite/prod/v3239347c48d1e3c46204782fd038ba187a6753dfa7d7a0d08a574587ae2085f5/android/images/favicon.svg",
    label: "Android Developer",
    value: 23,
    color: "bg-blue-500",
  },
  {
    logo: "https://vuejs.org/logo.svg",
    label: "Vue Developer",
    value: 34,
    color: "bg-yellow-500",
  },
  { logo: "", label: "QA Automation", value: 36, color: "bg-red-500" },
];

const VendorDashboard: React.FC<VendorDashboard> = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [requirementCounts, setRequirementCounts] = useState<any>({});

  const handleCardClick = (page: string, status: any) => {
    navigate(`/vendor/${page}`, {
      state: { status: status }, // Passing state data
    });
  };

  useEffect(() => {
    getReqDetailCounts();
  }, []);

  const getReqDetailCounts = () => {
    getVndDashboardReqCounts(userData?.userId, userData?.orgCode).then(
      (result: any) => {
        if (Object.keys(result).length >= 0) {
          setRequirementCounts(result);
        }
      }
    );
  };

  return (
    <div className="flex">
      <div className="flex-1 p-4">
        {/* Overview Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div
            className="bg-primary-light p-3 rounded-md flex flex-col items-center shadow cursor-pointer hover:bg-primary-hover"
            onClick={() =>
              handleCardClick("requirements", RequirementsStatus.Open)
            }
          >
            <Typography variant="h5" className="!text-indigo-950">
              {requirementCounts?.openPositions}
            </Typography>
            <p className="text-base">Open Positions</p>
          </div>

          <div
            className="bg-primary-light p-3 rounded-md flex items-center flex-col shadow cursor-pointer hover:bg-primary-hover"
            onClick={() =>
              handleCardClick("requirements", RequirementsStatus.Open)
            }
          >
            <Typography variant="h5" className="!text-indigo-800">
              {requirementCounts?.hotRequirements}
            </Typography>
            <p className="text-base">Hot Requirements</p>
          </div>

          <div
            className="bg-primary-light p-3 rounded-md flex items-center flex-col shadow cursor-pointer hover:bg-primary-hover"
            onClick={() => handleCardClick("candidate", "Interview Round I")}
          >
            <Typography variant="h5" className="!text-indigo-600">
              {requirementCounts?.interviewScheduled}
            </Typography>
            <p className="text-base">Interview Scheduled</p>
          </div>

          <div
            className="bg-primary-light p-3 rounded-md flex items-center flex-col shadow cursor-pointer hover:bg-primary-hover"
            onClick={() => handleCardClick("candidate", "")}
          >
            <Typography variant="h5" className="!text-indigo-400">
              {requirementCounts?.totalApplicants}
            </Typography>
            <p className="text-base">Total job applied</p>
          </div>
        </div>
        {/* Job Statistics */}
        <div className="flex justify-between mb-4">
          <JobStatistics pieTitle="Requirements" />
        </div>
        <div className="flex space-x-3">
          <Box className="gap-6 sm:w-[99%] lg:w-[33%] md:w-[49%] mb-4">
            {/* Applicants Summary Card */}
            <Box className="bg-white border px-4 rounded-md">
              <div className="flex justify-between">
                <p className="pt-4 text-title">Top Clients</p>
                <p className="pt-4 text-title">Positions</p>
              </div>
              {/* Progress Bars */}
              <Box className="mt-4">
                {applicantItems.map((item, index) => (
                  <Box key={index} className="mb-3">
                    <Box className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <img
                          src={
                            !item.logo
                              ? "/assets/images/Companylogo1.png"
                              : item.logo
                          }
                          className="rounded-full"
                          style={{ width: 25, height: 25 }}
                        />
                        <p className="text-base ms-2">{item.label}</p>
                      </div>
                      <p className="text-title ms-2">{item.value}</p>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box className="gap-6 sm:w-[99%] lg:w-[33%] md:w-[49%] mb-4">
            {/* Applicants Summary Card */}
            <Box className="bg-white border px-4 rounded-md">
              <div className="flex justify-between">
                <p className="pt-4 text-title">Trending Technologies</p>
                <p className="pt-4 text-title">Positions</p>
              </div>
              {/* Progress Bars */}
              <Box className="mt-4">
                {hotTech.map((item, index) => (
                  <Box key={index} className="mb-3">
                    <Box className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <img
                          src={
                            !item.logo
                              ? "/assets/images/Companylogo1.png"
                              : item.logo
                          }
                          className="rounded-full"
                          style={{ width: 25, height: 25 }}
                        />
                        <p className="text-base ms-2">{item.label}</p>
                      </div>
                      <p className="text-title ms-2">{item.value}</p>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
