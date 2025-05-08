import React, { useEffect, useState } from "react";
import { Typography, Box, Button, Avatar } from "@mui/material";
import JobStatistics from "../../sharedComponents/JobStatistics";
import { useNavigate } from "react-router-dom";
import {
  getVndDashboardReqCounts,
  getVndTopClients,
} from "../../../components/sharedService/apiService";
import {
  RequirementsStatus,
  RoleType,
} from "../../../components/sharedService/enums";
import { AddOutlined } from "@mui/icons-material";
import Loader from "../../../components/sharedComponents/Loader";

interface VendorDashboard {}

const VendorDashboard: React.FC<VendorDashboard> = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [requirementCounts, setRequirementCounts] = useState<any>({});
  const [topClients, setTopClients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCardClick = (page: string, status: any) => {
    navigate(`/vendor/${page}`, {
      state: { status: status === true ? 0 : status, isHot: status === true }, // Passing state data
    });
  };

  const loadVendorDashboardData = async () => {
    setIsLoading(true); // show loader

    try {
      const [counts, topClients] = await Promise.all([
        getVndDashboardReqCounts(
          userData?.userId,
          userData?.orgCode,
          RoleType.Vendor
        ),
        getVndTopClients({
          vendorCode: userData?.orgCode,
          pageNumber: 1,
          pageSize: 10,
        }),
      ]);

      if (Object.keys(counts).length >= 0) {
        setRequirementCounts(counts);
      }
      if (topClients.count >= 0) {
        setTopClients(topClients.list);
      }
    } catch (error) {
      console.error("Error loading vendor dashboard:", error);
    } finally {
      setIsLoading(false); // hide loader after both complete
    }
  };

  useEffect(() => {
    loadVendorDashboardData();
  }, []);

  return (
    <>
      {!isLoading ? (
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
                onClick={() => handleCardClick("requirements", true)}
              >
                <Typography variant="h5" className="!text-indigo-800">
                  {requirementCounts?.hotRequirements}
                </Typography>
                <p className="text-base">Hot Requirements</p>
              </div>

              <div
                className="bg-primary-light p-3 rounded-md flex items-center flex-col shadow cursor-pointer hover:bg-primary-hover"
                onClick={() =>
                  handleCardClick("candidate", "Interview Round I")
                }
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
              <Box className="gap-6 sm:w-[99%] lg:w-[33%] md:w-[49%] mb-4">
                {/* Applicants Summary Card */}
                <Box className="bg-white border px-4 rounded-md h-full">
                  <div className="flex justify-between">
                    <p className="pt-4 text-title">Top Partners</p>
                    {topClients?.length > 0 && (
                      <p className="pt-4 text-title">Positions</p>
                    )}
                  </div>
                  {/* Progress Bars */}
                  <Box className="mt-4">
                    {topClients?.length > 0 ? (
                      topClients.map((item: any, index: number) => (
                        <Box key={index} className="mb-3">
                          <Box className="flex justify-between mb-1">
                            <div className="flex items-center">
                              <Avatar
                                src={item.clientLogo}
                                alt={item.clientName}
                                sizes="large"
                                sx={{ width: 25, height: 25 }}
                              />
                              <p className="text-base ms-2">
                                {item.clientName}
                              </p>
                            </div>
                            <p className="text-title ms-2">
                              {item.totalPositions}
                            </p>
                          </Box>
                        </Box>
                      ))
                    ) : (
                      <div className="pb-5 text-center">
                        <p className="text-base mb-5">No data available</p>
                      </div>
                    )}
                  </Box>
                </Box>
              </Box>
            </div>
            {/* <div className="flex space-x-3">
          <Box className="gap-6 sm:w-[99%] lg:w-[33%] md:w-[49%] mb-4">
            
            <Box className="bg-white border px-4 rounded-md">
              <div className="flex justify-between">
                <p className="pt-4 text-title">Trending Technologies</p>
                <p className="pt-4 text-title">Positions</p>
              </div>
              
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
        </div> */}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default VendorDashboard;
